
"use client";

import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'Terms and Conditions',
// };

export default function TermsPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState("27 September 2025");

  useEffect(() => {
    // This is just an example. In a real app, you might fetch this
    // or have it as a static value. For the purpose of fixing hydration,
    // we set it on the client. If it's static, it doesn't need a state.
    // If it were dynamic, this would be the correct approach.
  }, []);
  
  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline tracking-tight">Terms and Conditions</h1>
          <p className="mt-4 text-lg text-muted-foreground font-body">Last Updated: {lastUpdatedDate}</p>
        </div>

        <div className="prose prose-lg max-w-none font-body text-muted-foreground prose-h2:font-headline prose-h2:text-primary-dark prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
          <p>Please read these Terms and Conditions carefully before using our website or engaging our services.</p>

          <h2>1. Definitions</h2>
          <p>The following terms shall have the meanings described below, whether they appear in singular or plural form:</p>
          <ul>
            <li><strong>"Company", "We", "Us", or "Our"</strong> refers to RAK-Site Safety Services.</li>
            <li><strong>"You" or "User"</strong> refers to the individual or entity accessing or using our services.</li>
            <li><strong>"Service"</strong> refers to all services and features offered by RAK-Site Safety Services, including but not limited to “Rent a Safety Officer,” “E Safety File,” and “Safety Management System.”</li>
            <li><strong>"SLA"</strong> means a formal Service Level Agreement entered into between You and the Company, outlining specific deliverables, pricing, and terms.</li>
          </ul>

          <h2>2. Acceptance of Terms</h2>
          <p>By accessing or using our website or services, You agree to be bound by these Terms and Conditions. If You do not agree to these Terms, You may not use the Service.</p>
          <p>These Terms apply to all visitors, customers, and users. Additional agreements—such as individual SLAs—may apply for specific services and will take precedence in case of conflict.</p>

          <h2>3. Scope of Services</h2>
          <p>Our core services are provided as described on our website. These include, but are not limited to:</p>
          <ul>
            <li>Rent a Safety Officer</li>
            <li>E Safety File</li>
            <li>Safety Management System</li>
          </ul>
          <p>Details such as scope, timelines, pricing, and service deliverables will be defined in a separate SLA, which must be signed by both parties before work begins.</p>
          
          <h2>4. Payments and Fees</h2>
          <p>All fees and charges are payable as specified in your Service Level Agreement or on the relevant service page of our website. Unless stated otherwise, all prices are in South African Rand (ZAR).</p>
          <p>Payments are processed securely through trusted third-party providers. By making a payment, You agree to comply with the terms and conditions of our payment partners.</p>

          <h2>5. Limitation of Liability</h2>
          <p>We provide our services with diligence and professional care. However, our liability is strictly limited.</p>
          <p>To the maximum extent permitted by law, RAK-Site Safety Services and its affiliates shall not be liable for:</p>
            <ul>
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Any amount exceeding the total fees You paid to Us for the specific service that gave rise to the claim</li>
            </ul>

          <h2>6. Governing Law</h2>
          <p>These Terms are governed by the laws of the Republic of South Africa, without regard to its conflict of law provisions. You agree that any disputes will be subject to the exclusive jurisdiction of South African courts.</p>
          
          <h2>7. Changes to Terms</h2>
          <p>We may update these Terms and Conditions at our discretion. If changes are material, We will provide reasonable notice—typically at least 30 days—via email or through a notice on our website.</p>
          <p>Your continued use of the Service after such updates constitutes acceptance of the revised Terms.</p>
          
          <h2>8. Contact Information</h2>
          <p>For any questions, concerns, or formal inquiries regarding these Terms and Conditions, you can reach us at:</p>
          <p>📧 Email: <a href="mailto:info@sitesafety.services">info@sitesafety.services</a></p>
          <p>📄 Contact Form: Available on our website</p>
        </div>
      </div>
    </div>
  );
}
