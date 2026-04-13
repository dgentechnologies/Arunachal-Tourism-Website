'use server';
/**
 * @fileOverview A general-purpose AI travel assistant for Arunachal Pradesh.
 *
 * - chatWithJourneyAI  - Function that responds to user travel questions.
 * - JourneyAIChatInput - Input type.
 * - JourneyAIChatOutput - Return type.
 * - AICard - Structured action card type for rich UI rendering.
 */

import { ai, tryAcquireAiRequestSlot, handleAiRequestError } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AICardSchema = z.object({
  title: z.string().describe('Short card title, 3–6 words'),
  description: z.string().describe('One sentence describing the destination or action, max 15 words'),
  href: z.string().describe('Internal site path, e.g. /hotels'),
  category: z
    .enum(['transport', 'permit', 'accommodation', 'culture', 'adventure', 'nature', 'itinerary', 'safety', 'events', 'heritage'])
    .describe('Topic category used for visual styling'),
  badge: z.string().optional().describe('Short label shown as a badge, e.g. "ILP Required"'),
});

export type AICard = z.infer<typeof AICardSchema>;

const JourneyAIChatInputSchema = z.object({
  userMessage: z.string().describe("The user's question or message about Arunachal Pradesh travel."),
  chatHistory: z
    .array(ChatMessageSchema)
    .optional()
    .describe('Previous conversation messages for context.'),
});

export type JourneyAIChatInput = z.infer<typeof JourneyAIChatInputSchema>;

const JourneyAIChatOutputSchema = z.object({
  reply: z.string().describe("The assistant's conversational reply."),
  cards: z
    .array(AICardSchema)
    .max(4)
    .optional()
    .describe('1–4 action cards linking to relevant website sections. Include only when contextually useful.'),
});

export type JourneyAIChatOutput = z.infer<typeof JourneyAIChatOutputSchema>;

export async function chatWithJourneyAI(
  input: JourneyAIChatInput
): Promise<JourneyAIChatOutput> {
  const release = tryAcquireAiRequestSlot();
  try {
    return await journeyAIFlow(input);
  } catch (error) {
    handleAiRequestError(error);
    throw error;
  } finally {
    release();
  }
}

const journeyAIFlow = ai.defineFlow(
  {
    name: 'journeyAIFlow',
    inputSchema: JourneyAIChatInputSchema,
    outputSchema: JourneyAIChatOutputSchema,
  },
  async (input) => {
    const historyText = (input.chatHistory ?? [])
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const systemPrompt = `You are Journey AI, a knowledgeable and friendly travel assistant specializing in Arunachal Pradesh, India. You help travelers plan trips, understand permit requirements (ILP and PAP), discover destinations, learn about local tribes and culture, find the best seasons to visit, understand wildlife and adventure activities, and navigate logistics like getting there and staying safe.

Key facts you must know:
- Inner Line Permit (ILP) is required for all Indian nationals visiting Arunachal Pradesh. It can be obtained online at arunachalilp.com or from designated offices.
- Protected Area Permit (PAP) is required for foreign nationals, obtained from Ministry of Home Affairs.
- Major districts to visit: Tawang, Ziro, Pasighat, Dirang, Bomdila, Along, Tezu, Mechuka, Mayudia.
- Arunachal Pradesh has 26 major tribes including Adi, Apatani, Nyishi, Monpa, Garo, and more.
- Best time to visit: October to April for most regions. Monsoon (June–September) brings landslides but is lush green.
- The state has rich Buddhist heritage (Tawang Monastery — largest in India), Donyi-Polo animism, and Hindu temples.
- Wildlife sanctuaries include Namdapha (largest biosphere in Eastern Himalayas), Pakke Tiger Reserve, Eagle Nest Wildlife Sanctuary.
- Popular adventure: trekking, river rafting (Siang, Subansiri), angling, paragliding.
- Currency: Indian Rupee (INR). Limited ATMs outside major towns — carry cash.
- Emergency contact: Tourist Helpline 1800-345-3821.

Guidelines:
- Keep answers concise and actionable. Use bullet points for lists.
- If asked about permits, always mention both ILP (Indian nationals) and PAP (foreign nationals).
- Do not make up specific hotel prices, exact bus/flight schedules, or other real-time data — advise users to verify current details.
- Be warm, encouraging, and enthusiastic about Arunachal Pradesh's unique beauty.
- Answer only travel and tourism related questions. For unrelated topics, politely redirect.

CARDS — Action cards to guide users to the right page of the website:
When your answer relates to one of these topics, include 1–4 relevant cards.
Use ONLY these exact href values:

| href                    | category       | Suggested title                  |
|-------------------------|----------------|----------------------------------|
| /plan/getting-here      | transport      | Getting to Arunachal Pradesh     |
| /essentials             | permit         | ILP — Indian Nationals Permit    |
| /essentials/foreign     | permit         | PAP — Foreign Nationals Permit   |
| /hotels                 | accommodation  | Hotels & Stays                   |
| /transport              | transport      | Book Vehicles & Transport        |
| /itinerary              | itinerary      | AI Trip Itinerary Planner        |
| /safety                 | safety         | Safety & Emergency Info          |
| /wildlife               | nature         | Wildlife & Biodiversity          |
| /adventures             | adventure      | Adventure Activities             |
| /adventures/trekking    | adventure      | Trekking Routes                  |
| /adventures/rafting     | adventure      | River Rafting                    |
| /adventures/angling     | adventure      | Angling Spots                    |
| /adventures/paragliding | adventure      | Paragliding Sites                |
| /tribes                 | culture        | Tribes & Culture                 |
| /events                 | events         | Festivals & Events               |
| /heritage               | heritage       | Heritage Sites                   |
| /guides                 | itinerary      | Travel Guides & Map              |

WHEN to include cards: user asks about getting there, permits, booking, activities, safety, culture, wildlife, planning a trip.
WHEN to skip cards: very short follow-up messages ("thanks", "ok", "tell me more"), purely conversational replies, or when cards would not add value.`;

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: historyText
        ? `${systemPrompt}\n\nConversation so far:\n${historyText}\n\nUser: ${input.userMessage}\nAssistant:`
        : `${systemPrompt}\n\nUser: ${input.userMessage}\nAssistant:`,
      output: { schema: JourneyAIChatOutputSchema },
      config: { temperature: 0.7 },
    });

    const out = response.output;
    if (out) return out;

    // Fallback if structured output fails
    return {
      reply: response.text ?? 'Sorry, I could not generate a response. Please try again.',
      cards: [],
    };
  }
);
