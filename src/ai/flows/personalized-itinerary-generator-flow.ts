'use server';
/**
 * @fileOverview An AI assistant that generates personalized trip itineraries and suggests 'best trips' for Arunachal Pradesh.
 *
 * - generatePersonalizedItinerary - A function that generates a personalized trip itinerary and best trip suggestions.
 * - PersonalizedItineraryGeneratorInput - The input type for the generatePersonalizedItinerary function.
 * - PersonalizedItineraryGeneratorOutput - The return type for the generatePersonalizedItinerary function.
 */

import {ai, assertAiRequestAllowed, handleAiRequestError} from '@/ai/genkit';
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

// Define the day schema
const ItineraryDaySchema = z.object({
  dayNumber: z.number().int().positive().describe('The day number, e.g. 1, 2, 3.'),
  title: z.string().describe('A short, evocative title for the day, e.g. "Arrival in Itanagar & Cultural Immersion".'),
  location: z.string().describe('The primary location or place visited on this day.'),
  description: z.string().describe('A 2-3 sentence overview of the day.'),
  activities: z.array(z.string()).describe('A list of 3-5 specific activities for the day.'),
  meals: z.string().describe('Meal highlights or recommendations for the day, e.g. "Breakfast at hotel, Lunch at local dhabha, Dinner with Adi tribal feast".'),
  accommodation: z.string().describe('Accommodation suggestion for the night, e.g. "Hotel Donyi Polo Ashok, Itanagar".'),
});

// Define the output schema
const PersonalizedItineraryGeneratorOutputSchema = z.object({
  itineraryDays: z
    .array(ItineraryDaySchema)
    .describe('A structured day-by-day itinerary for the trip in Arunachal Pradesh.'),
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
  assertAiRequestAllowed();
  try {
    return await personalizedItineraryGeneratorFlow(input);
  } catch (error) {
    handleAiRequestError(error);
    throw error;
  }
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
1. A structured day-by-day itinerary as an array of day objects. For each of the {{{durationDays}}} days, provide:
   - dayNumber (integer, starting at 1)
   - title (a short evocative title for that day)
   - location (primary place visited)
   - description (2-3 sentence overview)
   - activities (array of 3-5 specific activities)
   - meals (meal highlights or recommendations)
   - accommodation (hotel/lodge suggestion for the night)
2. A list of 3-5 'Best Trip' suggestions within Arunachal Pradesh, each as a concise string with name and brief description, that align with the user's interests.

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
