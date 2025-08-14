import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  const [currentDate, setCurrentDate] = React.useState('');
  React.useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }));
  },[]);

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline tracking-tight">Privacy Policy</h1>
          {currentDate && <p className="mt-4 text-lg text-muted-foreground font-body">Last updated: {currentDate}</p>}
        </div>

        <div className="prose prose-lg max-w-none font-body text-muted-foreground prose-h2:font-headline prose-h2:text-primary-dark prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

          <h2>1. Information We Collect</h2>
          <p>We may collect several types of information from and about users of our Website, including:</p>
          <ul>
            <li><strong>Personal Data:</strong> While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. This may include, but is not limited to: Email address, First name and last name, Phone number, and Company name.</li>
            <li><strong>Usage Data:</strong> Usage Data is collected automatically when using the Service. This may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
          </ul>

          <h2>2. Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
              <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
              <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication regarding updates or informative communications related to the functionalities, products or contracted services.</li>
              <li>To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
              <li>To manage Your requests: To attend and manage Your requests to Us.</li>
          </ul>
          
          <h2>3. Disclosure of Your Personal Data</h2>
          <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h2>4. Security of Your Personal Data</h2>
          <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
          
          <h2>5. Links to Other Websites</h2>
          <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>

          <h2>6. Changes to this Privacy Policy</h2>
          <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, You can contact us through the inquiry and booking forms provided on our website, or by emailing us directly at <a href="mailto:support@raksafety.co.za">support@raksafety.co.za</a>.</p>
        </div>
      </div>
    </div>
  );
}