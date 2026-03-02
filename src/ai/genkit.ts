import {randomUUID} from 'crypto';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const geminiApiKey =
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_GENAI_API_KEY ??
  process.env.GOOGLE_API_KEY;

// Ensure we have a valid initialization even if key is provided via environment in other ways
const googleAiPlugin = geminiApiKey ? googleAI({apiKey: geminiApiKey}) : googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  // Updated to the latest 2.0 model as requested. 
  // Note: 2.0 Flash is the current next-gen standard for speed and efficiency.
  model: 'googleai/gemini-2.0-flash',
});

const DEFAULT_COOLDOWN_MS = 60_000;
const parseCooldownMs = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const requestCooldownMs = parseCooldownMs(process.env.AI_REQUEST_COOLDOWN_MS, DEFAULT_COOLDOWN_MS);
const quotaCooldownMs = parseCooldownMs(process.env.AI_QUOTA_COOLDOWN_MS, requestCooldownMs);
const maxRequestDurationMs = parseCooldownMs(process.env.AI_REQUEST_TIMEOUT_MS, DEFAULT_COOLDOWN_MS);
let lastRequestAt = 0;
let quotaCooldownUntil = 0;
let requestInFlight = false;
let activeRequestToken: string | null = null;
let requestInFlightSince: number | null = null;

// Genkit errors can surface as status/code 429, RESOURCE_EXHAUSTED, or quota text in message strings.
const isQuotaOrRateLimitError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const err = error as { status?: number; code?: number; message?: string };
  const message = err.message ?? '';
  const normalizedMessage = message.toLowerCase();
  return err.status === 429 ||
    err.code === 429 ||
    normalizedMessage.includes('resource_exhausted') ||
    normalizedMessage.includes('429') ||
    normalizedMessage.includes('quota') ||
    normalizedMessage.includes('rate limit');
};

const createQuotaError = (message: string) => {
  const error = new Error(message) as Error & { status?: number; code?: number };
  error.status = 429;
  error.code = 429;
  return error;
};

const toWaitSeconds = (waitMs: number) => Math.max(1, Math.ceil(waitMs / 1000));
const forceResetRequestState = () => {
  requestInFlight = false;
  activeRequestToken = null;
  requestInFlightSince = null;
};
const resetRequestState = (requestToken: string) => {
  if (activeRequestToken === requestToken) {
    forceResetRequestState();
  }
};

export const tryAcquireAiRequestSlot = () => {
  const now = Date.now();
  if (requestInFlight && requestInFlightSince && now - requestInFlightSince > maxRequestDurationMs) {
    console.warn('AI request lock expired; resetting in-flight state.');
    forceResetRequestState();
  }
  if (requestInFlight) {
    throw createQuotaError('An AI request is already in progress. Please wait for it to finish before trying again.');
  }
  if (now < quotaCooldownUntil) {
    const waitSeconds = toWaitSeconds(quotaCooldownUntil - now);
    throw createQuotaError(`AI requests are temporarily paused due to quota limits. Please wait ${waitSeconds} seconds and try again.`);
  }
  if (now - lastRequestAt < requestCooldownMs) {
    const waitSeconds = toWaitSeconds(lastRequestAt + requestCooldownMs - now);
    throw createQuotaError(`AI requests are rate-limited on the free tier. Please wait ${waitSeconds} seconds before trying again.`);
  }
  requestInFlight = true;
  requestInFlightSince = now;
  const requestToken = randomUUID();
  activeRequestToken = requestToken;
  lastRequestAt = now;
  const timeoutId = setTimeout(() => {
    resetRequestState(requestToken);
  }, maxRequestDurationMs);
  return () => {
    clearTimeout(timeoutId);
    resetRequestState(requestToken);
  };
};

export const handleAiRequestError = (error: unknown) => {
  if (isQuotaOrRateLimitError(error)) {
    quotaCooldownUntil = Date.now() + quotaCooldownMs;
    console.warn('AI request cooldown triggered due to quota limits.');
  }
};
