'use server';
/**
 * @fileOverview This file implements a Genkit flow for reviewing user-submitted tour plans for completeness and adherence to regulations.
 *
 * - permitPlanCompletenessCheck - A function that reviews a tour plan.
 * - PermitPlanInput - The input type for the permitPlanCompletenessCheck function.
 * - PermitPlanOutput - The return type for the permitPlanCompletenessCheck function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PermitPlanInputSchema = z.object({
  applicantName: z.string().describe('The full name of the applicant.'),
  contactEmail: z.string().email().describe('The applicant\'s email address.'),
  contactPhone: z.string().describe('The applicant\'s phone number.'),
  travelStartDate: z.string().describe('The start date of the travel in YYYY-MM-DD format.'),
  travelEndDate: z.string().describe('The end date of the travel in YYYY-MM-DD format.'),
  destinations: z.array(z.string()).describe('A list of planned destinations within Arunachal Pradesh.'),
  activities: z.array(z.string()).optional().describe('Optional: A list of planned activities.'),
  accommodationDetails: z.string().optional().describe('Optional: Details about planned accommodation (e.g., hotel names, booking references).'),
  transportationDetails: z.string().optional().describe('Optional: Details about planned transportation within Arunachal Pradesh (e.g., car rental, bike rental).'),
  emergencyContactName: z.string().describe('The full name of an emergency contact.'),
  emergencyContactPhone: z.string().describe('The phone number of the emergency contact.'),
  idProofType: z.enum(['Passport', 'Aadhar Card', 'Voter ID', 'Driving License', 'Other']).describe('The type of identification provided.'),
  idProofNumber: z.string().describe('The identification document number.'),
  acknowledgesRegulations: z.boolean().describe('Whether the applicant acknowledges and agrees to abide by all local regulations and guidelines.'),
  tourPurpose: z.string().optional().describe('Optional: The purpose of the tour (e.g., trekking, cultural visit, research).'),
  groupSize: z.number().int().min(1).optional().describe('Optional: The total number of people in the tour group.'),
});
export type PermitPlanInput = z.infer<typeof PermitPlanInputSchema>;

const PermitPlanOutputSchema = z.object({
  isComplete: z.boolean().describe('True if all required information for the permit application is present, otherwise false.'),
  adheresToGeneralGuidelines: z.boolean().describe('True if the tour plan generally adheres to common tourism guidelines and regulations for the region, otherwise false.'),
  missingInformation: z.array(z.string()).describe('A list of specific pieces of information that are missing from the tour plan and need to be provided.'),
  potentialComplianceIssues: z.array(z.string()).describe('A list of potential issues in the tour plan that might violate local regulations or guidelines.'),
  suggestionsForImprovement: z.array(z.string()).describe('Suggestions to improve the tour plan or make it more compliant, even if no explicit issues were found.'),
});
export type PermitPlanOutput = z.infer<typeof PermitPlanOutputSchema>;

const permitPlanCheckPrompt = ai.definePrompt({
  name: 'permitPlanCheckPrompt',
  input: { schema: PermitPlanInputSchema },
  output: { schema: PermitPlanOutputSchema },
  prompt: `You are an expert permit reviewer for the Arunachal Pradesh tourism department. Your task is to meticulously review a user's submitted tour plan for completeness and adherence to general tourism regulations and guidelines in Arunachal Pradesh.

Evaluate the following tour plan details:

Applicant Name: {{{applicantName}}}
Contact Email: {{{contactEmail}}}
Contact Phone: {{{contactPhone}}}
Travel Start Date: {{{travelStartDate}}}
Travel End Date: {{{travelEndDate}}}
Destinations: {{#each destinations}}- {{{this}}}
{{/each}}
{{#if activities}}Activities: {{#each activities}}- {{{this}}}
{{/each}}{{/if}}
{{#if accommodationDetails}}Accommodation Details: {{{accommodationDetails}}}{{/if}}
{{#if transportationDetails}}Transportation Details: {{{transportationDetails}}}{{/if}}
Emergency Contact Name: {{{emergencyContactName}}}
Emergency Contact Phone: {{{emergencyContactPhone}}}
ID Proof Type: {{{idProofType}}}
ID Proof Number: {{{idProofNumber}}}
Acknowledges Regulations: {{{acknowledgesRegulations}}}
{{#if tourPurpose}}Tour Purpose: {{{tourPurpose}}}{{/if}}
{{#if groupSize}}Group Size: {{{groupSize}}}{{/if}}

Based on the provided information, determine:
1.  Is all required information complete for a standard tour permit application?
2.  Does the plan generally adhere to common tourism guidelines and regulations for Arunachal Pradesh (e.g., reasonable travel duration, appropriate destinations, safety considerations)?
3.  List any specific information that is missing.
4.  Identify any potential compliance issues or aspects that might violate regulations.
5.  Provide any constructive suggestions for improving the tour plan.

Ensure your response is structured exactly as described by the output schema, with boolean values for completeness and adherence, and arrays of strings for missing information, compliance issues, and suggestions.`,
});

const permitPlanCompletenessCheckFlow = ai.defineFlow(
  {
    name: 'permitPlanCompletenessCheckFlow',
    inputSchema: PermitPlanInputSchema,
    outputSchema: PermitPlanOutputSchema,
  },
  async (input) => {
    const { output } = await permitPlanCheckPrompt(input);
    return output!;
  }
);

export async function permitPlanCompletenessCheck(input: PermitPlanInput): Promise<PermitPlanOutput> {
  return permitPlanCompletenessCheckFlow(input);
}
