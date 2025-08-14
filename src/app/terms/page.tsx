import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">Terms and Conditions</h1>
        <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-foreground">
        <p>Please read these terms and conditions carefully before using Our Service.</p>

        <h2>1. Interpretation and Definitions</h2>
        <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

        <h2>2. Acknowledgment</h2>
        <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
        <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>

        <h2>3. Service Provision</h2>
        <p>Our services, including "Rent a Safety Officer," "E Safety File," and "Safety Management System," are provided as described on their respective pages. Specific terms, deliverables, and pricing for engaged services will be outlined in a separate Service Agreement.</p>
        
        <h2>4. Payments</h2>
        <p>Fees for services are due as specified in the service description or Service Agreement. We utilize Payfast as our third-party payment processor. By making a payment, you agree to Payfast's terms and conditions.</p>

        <h2>5. Limitation of Liability</h2>
        <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service.</p>

        <h2>6. Governing Law</h2>
        <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
        
        <h2>7. Changes to These Terms and Conditions</h2>
        <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
        
        <h2>8. Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, You can contact us through the forms provided on our website.</p>
      </div>
    </div>
  );
}
