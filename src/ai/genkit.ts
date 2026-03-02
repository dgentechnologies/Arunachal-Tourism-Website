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
let lastRequestAt = 0;
let quotaCooldownUntil = 0;
let requestInFlight = false;

const isQuotaError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const err = error as { status?: number; code?: number; message?: string };
  const message = err.message ?? '';
  return err.status === 429 ||
    err.code === 429 ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('429') ||
    message.toLowerCase().includes('quota');
};

const createQuotaError = (message: string) => {
  const error = new Error(message) as Error & { status?: number; code?: number };
  error.status = 429;
  error.code = 429;
  return error;
};

const toWaitSeconds = (waitMs: number) => Math.max(1, Math.ceil(waitMs / 1000));

export const acquireAiRequestSlot = () => {
  const now = Date.now();
  if (requestInFlight) {
    const waitSeconds = toWaitSeconds(requestCooldownMs);
    throw createQuotaError(`An AI request is already in progress. Please wait ${waitSeconds} seconds and try again.`);
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
  lastRequestAt = now;
  return () => {
    requestInFlight = false;
  };
};

export const handleAiRequestError = (error: unknown) => {
  if (isQuotaError(error)) {
    quotaCooldownUntil = Date.now() + quotaCooldownMs;
  }
};
