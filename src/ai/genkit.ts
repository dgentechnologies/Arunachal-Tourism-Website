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
  // Using gemini-1.5-flash which is the stable production-ready model for Genkit 1.x
  model: 'googleai/gemini-1.5-flash',
});
