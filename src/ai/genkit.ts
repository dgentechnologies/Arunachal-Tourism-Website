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
  // Using gemini-1.5-flash as it is the most stable and reliable production model.
  // gemini-2.5 does not exist yet and 1.5 is the current industry standard for Flash models.
  model: 'googleai/gemini-1.5-flash',
});
