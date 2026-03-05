'use server';
/**
 * @fileOverview An AI chat assistant that helps users customize and upgrade pre-made itinerary plans for Arunachal Pradesh.
 *
 * - chatAboutItinerary - A function that responds to user messages about a selected itinerary plan.
 * - ItineraryChatInput - The input type for the chatAboutItinerary function.
 * - ItineraryChatOutput - The return type for the chatAboutItinerary function.
 */

import {ai, tryAcquireAiRequestSlot, handleAiRequestError} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const ItineraryChatInputSchema = z.object({
  planTitle: z.string().describe('The title of the selected pre-made itinerary plan.'),
  planSummary: z.string().describe('A brief summary of the selected plan including duration and highlights.'),
  userMessage: z.string().describe("The user's message or question about the itinerary."),
  chatHistory: z
    .array(ChatMessageSchema)
    .optional()
    .describe('Previous chat messages for context.'),
});

export type ItineraryChatInput = z.infer<typeof ItineraryChatInputSchema>;

const ItineraryChatOutputSchema = z.object({
  reply: z.string().describe("The assistant's reply to the user message."),
});

export type ItineraryChatOutput = z.infer<typeof ItineraryChatOutputSchema>;

export async function chatAboutItinerary(
  input: ItineraryChatInput
): Promise<ItineraryChatOutput> {
  const release = tryAcquireAiRequestSlot();
  try {
    return await itineraryChatFlow(input);
  } catch (error) {
    handleAiRequestError(error);
    throw error;
  } finally {
    release();
  }
}

const prompt = ai.definePrompt({
  name: 'itineraryChatPrompt',
  input: {schema: ItineraryChatInputSchema},
  output: {schema: ItineraryChatOutputSchema},
  prompt: `You are a friendly and knowledgeable travel assistant specializing in Arunachal Pradesh tourism. The user has selected the following pre-made itinerary:

**Selected Plan: {{{planTitle}}}**
{{{planSummary}}}

{{#if chatHistory.length}}
Previous conversation:
{{#each chatHistory}}
{{role}}: {{content}}
{{/each}}

{{/if}}
User's latest message: {{{userMessage}}}

Help the user with their question about this itinerary. You can:
- Explain what's included in the plan
- Suggest upgrades or additions (better hotels, extra activities, extended days)
- Recommend changes based on their preferences (budget, comfort level, interests)
- Provide tips on best times to visit, what to pack, permits needed
- Help customize the plan to fit their specific needs

Keep your response concise, friendly, and actionable. Use bullet points for lists when helpful.`,
});

const itineraryChatFlow = ai.defineFlow(
  {
    name: 'itineraryChatFlow',
    inputSchema: ItineraryChatInputSchema,
    outputSchema: ItineraryChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate a response.');
    }
    return output;
  }
);
