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
  // Updated to gemini-2.5-flash per user request
  model: 'googleai/gemini-2.5-flash',
});
