import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function TermsPage() {
  // This is a temporary fix to avoid hydration errors since the date is generated on the server and client.
  // In a real app, this should be handled properly, e.g. passing the date as a prop from a server component.
  const [currentDate, setCurrentDate] = React.useState('');
  React.useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }));
  },[]);

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-headline tracking-tight">Terms and Conditions</h1>
          {currentDate && <p className="mt-4 text-lg text-muted-foreground font-body">Last updated: {currentDate}</p>}
        </div>

        <div className="prose dark:prose-invert max-w-none font-body text-foreground/80 prose-h2:font-headline prose-h2:text-primary prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-accent/50 prose-h2:pb-3 prose-headings:font-headline prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground">
          <p>Please read these terms and conditions carefully before using Our Service.</p>

          <h2>1. Interpretation and Definitions</h2>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

          <h2>2. Acknowledgment</h2>
          <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>

          <h2>3. Service Provision</h2>
          <p>Our services, including <strong>"Rent a Safety Officer," "E Safety File,"</strong> and <strong>"Safety Management System,"</strong> are provided as described on their respective pages on our website. Specific terms, deliverables, and pricing for any engaged services will be formally outlined in a separate Service Level Agreement (SLA) which must be signed by both parties before the commencement of work.</p>
          
          <h2>4. Payments and Fees</h2>
          <p>Fees for services are due as specified in the service description or the governing Service Level Agreement. We utilize secure, industry-standard third-party payment processors. By making a payment, you acknowledge and agree to the terms and conditions of our payment partners. All prices are listed in South African Rand (ZAR) unless otherwise stated.</p>

          <h2>5. Limitation of Liability</h2>
          <p>While RAK-Site Safety endeavors to provide the highest quality of service and expertise, our liability is limited. Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You for the specific Service in question.</p>
          <p>RAK-Site Safety is not liable for indirect, incidental, or consequential damages resulting from the use of our services.</p>

          <h2>6. Governing Law</h2>
          <p>The laws of the Republic of South Africa, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
          
          <h2>7. Changes to These Terms and Conditions</h2>
          <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion. Continued use of our Service after any such changes shall constitute your consent to such changes.</p>
          
          <h2>8. Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, You can contact us through the inquiry and booking forms provided on our website, or by emailing us directly at <a href="mailto:support@raksafety.co.za">support@raksafety.co.za</a>.</p>
        </div>
      </div>
    </div>
  );
}
