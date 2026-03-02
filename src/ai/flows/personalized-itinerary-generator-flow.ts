'use server';
/**
 * @fileOverview An AI assistant that generates personalized trip itineraries and suggests 'best trips' for Arunachal Pradesh.
 *
 * - generatePersonalizedItinerary - A function that generates a personalized trip itinerary and best trip suggestions.
 * - PersonalizedItineraryGeneratorInput - The input type for the generatePersonalizedItinerary function.
 * - PersonalizedItineraryGeneratorOutput - The return type for the generatePersonalizedItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const PersonalizedItineraryGeneratorInputSchema = z.object({
  interests: z.string().describe('User interests, e.g., "adventure, culture, wildlife".'),
  durationDays: z
    .number()
    .int()
    .positive()
    .describe('Desired trip duration in days, e.g., 5.'),
  preferredActivities: z
    .array(z.string())
    .describe('A list of preferred activities, e.g., ["trekking", "sightseeing", "local cuisine"].'),
});
export type PersonalizedItineraryGeneratorInput = z.infer<
  typeof PersonalizedItineraryGeneratorInputSchema
>;

// Define the output schema
const PersonalizedItineraryGeneratorOutputSchema = z.object({
  itinerary: z
    .string()
    .describe('A detailed daily itinerary for the trip in Arunachal Pradesh.'),
  bestTripSuggestions: z
    .array(z.string())
    .describe('A list of suggested best trips or destinations with brief descriptions for Arunachal Pradesh.'),
});
export type PersonalizedItineraryGeneratorOutput = z.infer<
  typeof PersonalizedItineraryGeneratorOutputSchema
>;

// Exported wrapper function
export async function generatePersonalizedItinerary(
  input: PersonalizedItineraryGeneratorInput
): Promise<PersonalizedItineraryGeneratorOutput> {
  return personalizedItineraryGeneratorFlow(input);
}

// Define the prompt
const prompt = ai.definePrompt({
  name: 'personalizedItineraryGeneratorPrompt',
  input: {schema: PersonalizedItineraryGeneratorInputSchema},
  output: {schema: PersonalizedItineraryGeneratorOutputSchema},
  prompt: `You are an expert travel planner specializing in Arunachal Pradesh tourism. Your goal is to create an exciting and personalized trip itinerary and suggest 'best trips' based on the user's preferences.

Based on the following information:
User Interests: {{{interests}}}
Trip Duration: {{{durationDays}}} days
Preferred Activities: {{#each preferredActivities}}
- {{{this}}}
{{/each}}

Please generate:
1. A detailed day-by-day itinerary for a trip to Arunachal Pradesh, tailored to the user's interests and preferred activities for the specified duration.
2. A list of 3-5 'Best Trip' suggestions within Arunachal Pradesh, providing a brief description for each, that align with the user's interests.

Ensure the itinerary and suggestions highlight the unique natural beauty, culture, and adventure opportunities of Arunachal Pradesh.
`,
});

// Define the flow
const personalizedItineraryGeneratorFlow = ai.defineFlow(
  {
    name: 'personalizedItineraryGeneratorFlow',
    inputSchema: PersonalizedItineraryGeneratorInputSchema,
    outputSchema: PersonalizedItineraryGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate personalized itinerary.');
    }
    return output;
  }
);
