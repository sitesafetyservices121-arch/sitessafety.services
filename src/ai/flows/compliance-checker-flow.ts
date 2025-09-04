
'use server';
/**
 * @fileOverview An AI flow to check for safety compliance in a work scenario.
 *
 * - checkCompliance - Analyzes a scenario and suggests safety services.
 */

import {ai} from '@/ai/genkit';
import { ComplianceRequest, ComplianceRequestSchema, ComplianceResponse, ComplianceResponseSchema } from '@/ai/schemas';

export async function checkCompliance(input: ComplianceRequest): Promise<ComplianceResponse> {
  return complianceCheckerFlow(input);
}

const complianceCheckerPrompt = ai.definePrompt({
  name: 'complianceCheckerPrompt',
  input: {schema: ComplianceRequestSchema},
  output: {schema: ComplianceResponseSchema},
  prompt: `You are an expert occupational health and safety consultant for a company called RAK-Site Safety Services. Your task is to analyze a potential client's work scenario and provide a helpful, expert analysis.

The user will provide a description of their project or work environment. Based on this scenario:

1.  **Identify Risks:** Carefully analyze the scenario and identify a list of potential safety, health, and compliance risks. These should be specific and relevant to the described situation.

2.  **Recommend Services:** Based on the identified risks, recommend one or more of RAK-Site Safety Services's three core services. For each recommendation, provide a clear and compelling reason explaining how that service will address the specific risks you've identified in the user's scenario.

RAK-Site Safety Services offers the following services:
- **Rent a Safety Officer:** Best for on-site compliance management, immediate risk mitigation, and ensuring day-to-day operational safety on active projects. Recommend this for scenarios involving active construction, manufacturing, or complex on-site operations.
- **E-Safety File:** Ideal for clients who need to organize their safety documentation, ensure they are audit-ready, and digitize their compliance records. Recommend this for clients mentioning paperwork issues, upcoming audits, or a need for better document management.
- **Safety Management System:** A comprehensive solution for companies looking to build a long-term safety culture. This involves creating bespoke policies, procedures, and systems. Recommend this for scenarios where the client needs to overhaul their entire safety approach, build a safety culture from the ground up, or requires a scalable, long-term solution.

Your analysis must be returned in the specified JSON format.

Scenario: {{{scenario}}}
`,
});

const complianceCheckerFlow = ai.defineFlow(
  {
    name: 'complianceCheckerFlow',
    inputSchema: ComplianceRequestSchema,
    outputSchema: ComplianceResponseSchema,
  },
  async (input) => {
    const {output} = await complianceCheckerPrompt(input);
    return output!;
  }
);
