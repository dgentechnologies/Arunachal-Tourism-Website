'use server';
/**
 * @fileOverview AI chat assistant for Arunachal Pradesh itinerary customization.
 * When the user requests a change, the AI returns both a conversational reply
 * AND a structured `itineraryPatch` so the left-panel detail updates live.
 *
 * - chatAboutItinerary   – main exported function
 * - ItineraryChatInput   – input schema type
 * - ItineraryChatOutput  – output schema type (includes optional itineraryPatch)
 */

import {ai, tryAcquireAiRequestSlot, handleAiRequestError} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

// Mirrors ItineraryDay from itinerary-data.ts
const ItineraryDaySchema = z.object({
  day: z.number(),
  title: z.string(),
  location: z.string(),
  description: z.string(),
  activities: z.array(z.string()),
  meals: z.string(),
  accommodation: z.string(),
});

/**
 * Partial patch the AI can return to mutate the displayed itinerary.
 * Every field is optional so the AI only touches what was requested.
 */
const ItineraryPatchSchema = z.object({
  title:       z.string().optional().describe('New title if the user renamed the trip.'),
  subtitle:    z.string().optional().describe('New subtitle / tagline.'),
  summary:     z.string().optional().describe('Updated summary paragraph.'),
  duration:    z.string().optional().describe('e.g. "10 Days / 9 Nights"'),
  durationDays:z.number().optional().describe('Integer number of days.'),
  bestTime:    z.string().optional().describe('e.g. "October – March"'),
  difficulty:  z.enum(['Easy', 'Moderate', 'Challenging']).optional(),
  highlights:  z.array(z.string()).optional().describe('Full replacement highlight list.'),
  tags:        z.array(z.string()).optional().describe('Full replacement tag list.'),
  days:        z.array(ItineraryDaySchema).optional().describe('Full replacement day array — always send ALL days when changing this.'),
});

export type ItineraryPatch = z.infer<typeof ItineraryPatchSchema>;

const ItineraryChatInputSchema = z.object({
  planTitle:   z.string().describe('Title of the selected itinerary plan.'),
  planSummary: z.string().describe('Brief summary of the plan including duration and highlights.'),
  planJson:    z.string().optional().describe('Full current itinerary as JSON string (for context when generating patches).'),
  userMessage: z.string().describe("The user's message."),
  chatHistory: z.array(ChatMessageSchema).optional().describe('Recent chat history for context.'),
});

export type ItineraryChatInput = z.infer<typeof ItineraryChatInputSchema>;

const ItineraryChatOutputSchema = z.object({
  reply: z.string().describe("Conversational reply shown in the chat panel."),
  itineraryPatch: ItineraryPatchSchema.optional().describe(
    'Structured patch to apply to the displayed itinerary. Only include if the user asked to change something. Omit entirely for questions / tips / info.'
  ),
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
  prompt: `You are a friendly and expert travel assistant specialising in Arunachal Pradesh tourism.

Current itinerary the user is viewing:
Title: {{{planTitle}}}
Summary: {{{planSummary}}}
{{#if planJson}}
Full plan JSON (for patching):
{{{planJson}}}
{{/if}}

{{#if chatHistory.length}}
Previous conversation:
{{#each chatHistory}}
{{role}}: {{content}}
{{/each}}

{{/if}}
User: {{{userMessage}}}

RULES:
1. Always produce a friendly, concise "reply" field.
2. If the user asks to CHANGE, UPDATE, EXTEND, SHORTEN, REPLACE, or CUSTOMISE any part of the itinerary, also populate "itineraryPatch" with ONLY the fields that changed. 
   - For day-level changes always send the COMPLETE updated "days" array (all days, not just changed ones).
   - Keep unchanged fields absent from the patch.
3. If the user is only asking a question or asking for tips/info/advice (no modification), omit "itineraryPatch" entirely.
4. For patch day entries, keep the same schema: day (number), title, location, description, activities (array), meals, accommodation.
5. Difficulty must be exactly "Easy", "Moderate", or "Challenging".`,
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
