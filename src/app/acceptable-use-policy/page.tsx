
import type { Metadata } from 'next';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Acceptable Use Policy',
};

export default function AcceptableUsePolicyPage() {
  const effectiveDate = "27 September 2025";
  
  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Acceptable Use Policy (AUP)</h1>
          <p className="mt-4 text-lg text-muted-foreground">Effective Date: {effectiveDate}</p>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none text-muted-foreground prose-h2:font-bold prose-h2:text-foreground prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
              
              <p><strong>Applies To:</strong> All users of the RAK-Site Safety Services online safety management system</p>
              
              <h2>1. Purpose</h2>
              <p>This Acceptable Use Policy outlines the rules and standards for anyone accessing and using the RAK-Site Safety Services online safety management system, which is powered by artificial intelligence and operated under the direction of Ruan Koen, Director.</p>
              <p>By accessing or using the system, you agree to use it responsibly, lawfully, and in accordance with this policy.</p>

              <h2>2. Prohibited Activities</h2>
              <p>Users are strictly prohibited from using the system to:</p>
              <ul>
                <li>Generate or upload harmful, illegal, or deceptive content, including false safety documentation or fraudulent safety data</li>
                <li>Access or attempt to access the system using another user’s credentials</li>
                <li>Share login credentials with any unauthorized person</li>
                <li>Disrupt, interfere with, or compromise the security or performance of the system</li>
                <li>Manipulate AI-generated reports for unlawful or unethical purposes</li>
                <li>Reverse engineer, copy, or tamper with the AI components or platform infrastructure</li>
              </ul>

              <h2>3. User Security Responsibilities</h2>
              <p>All users must:</p>
              <ul>
                <li>Keep their login credentials confidential and secure</li>
                <li>Use strong, unique passwords</li>
                <li>Log out after each session</li>
                <li>Immediately report any suspicious activity or suspected breach to the company</li>
              </ul>

              <h2>4. Consequences of Violations</h2>
              <p>Any user found in violation of this policy will be:</p>
              <ul>
                <li>Immediately suspended from the system</li>
                <li>Permanently barred from future access</li>
                <li>Not eligible for any refund of service fees</li>
              </ul>
              <p>RAK-Site Safety Services reserves the right to take legal action for any misuse that results in damage, legal liability, or unauthorized disclosure.</p>

              <h2>5. Jurisdiction and Compliance</h2>
              <p>This platform is operated in compliance with the laws of the Republic of South Africa, including POPIA and applicable digital regulations. By using the system, you agree to comply with all relevant South African laws.</p>
              
              <h2>6. Acknowledgment</h2>
              <p>By accessing the RAK-Site Safety Services platform, you confirm that you:</p>
              <ul>
                <li>Understand and accept this Acceptable Use Policy</li>
                <li>Will use the system in good faith and only for its intended safety-related purposes</li>
                <li>Acknowledge that violations may lead to suspension or termination without refund</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
