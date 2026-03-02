import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const geminiApiKey =
  process.env.GEMINI_API_KEY ??
  process.env.GOOGLE_GENAI_API_KEY ??
  process.env.GOOGLE_API_KEY;

const googleAiPlugin = geminiApiKey ? googleAI({apiKey: geminiApiKey}) : googleAI();

export const ai = genkit({
  plugins: [googleAiPlugin],
  model: 'googleai/gemini-2.5-flash',
});
