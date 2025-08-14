/**
 * @fileOverview Schemas and types for the AI compliance checker.
 */

import { z } from 'genkit';

export const ComplianceRequestSchema = z.object({
  scenario: z.string().describe('A description of a work scenario or project.'),
});
export type ComplianceRequest = z.infer<typeof ComplianceRequestSchema>;

const RecommendedServiceSchema = z.object({
    serviceName: z.enum(["Rent a Safety Officer", "E-Safety File", "Safety Management System"]),
    reason: z.string().describe("A detailed explanation of why this specific service is recommended for the user's scenario."),
});

export const ComplianceResponseSchema = z.object({
  risks: z.array(z.string()).describe("A list of potential safety and compliance risks identified in the scenario."),
  recommendations: z.array(RecommendedServiceSchema).describe("A list of recommended services to mitigate the identified risks."),
});
export type ComplianceResponse = z.infer<typeof ComplianceResponseSchema>;
