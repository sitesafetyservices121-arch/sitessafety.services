
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'POPIA Policy',
};

export default function PopiaPage() {
  const currentDate = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline tracking-tight">Privacy Policy - RAK-Site Safety Services</h1>
          <p className="mt-4 text-lg text-muted-foreground font-body">Effective Date: {currentDate}</p>
          <p className="mt-1 text-lg text-muted-foreground font-body">Last Updated: {currentDate}</p>
        </div>

        <div className="prose prose-lg max-w-none font-body text-muted-foreground prose-h2:font-headline prose-h2:text-primary-dark prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
          
          <h2>1. Introduction</h2>
          <p>RAK-Site Safety Services ("we," "us," or "our") is committed to protecting your privacy and personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable data protection laws.</p>
          <p><strong>Company Details:</strong></p>
          <ul>
            <li><strong>Business Name:</strong> RAK-Site Safety Services</li>
            <li><strong>Location:</strong> Three Rivers East, Vereeniging, South Africa</li>
            <li><strong>Services:</strong> Rent-a-Safety Officer services, AI-driven online safety management systems, custom e-safety file submission and auditing websites, and custom safety file creation</li>
          </ul>

          <h2>2. Information Officer</h2>
          <p>Our designated Information Officer responsible for POPIA compliance is:</p>
          <ul>
              <li><strong>Name:</strong> [Insert Name]</li>
              <li><strong>Position:</strong> [Insert Position]</li>
              <li><strong>Contact:</strong> [Insert Email] | [Insert Phone Number]</li>
              <li><strong>Address:</strong> Three Rivers East, Vereeniging, South Africa</li>
          </ul>

          <h2>3. Personal Information We Collect</h2>
          <p>We collect personal information necessary to provide our safety services across South Africa:</p>
          <h3>3.1 Client Information</h3>
          <ul>
            <li>Business registration details and contact information</li>
            <li>Authorized representative details (names, positions, contact details)</li>
            <li>Billing and payment information</li>
            <li>Project specifications and location data</li>
          </ul>
          <h3>3.2 Safety Officer Information</h3>
          <ul>
            <li>Personal identification details</li>
            <li>Professional qualifications and certifications</li>
            <li>Employment history and references</li>
            <li>Safety training records and competency assessments</li>
            <li>Location and availability data for deployment</li>
          </ul>
          <h3>3.3 System Users</h3>
          <ul>
            <li>Login credentials and user profiles</li>
            <li>Activity logs and system usage data</li>
            <li>Safety file submissions and audit trail information</li>
            <li>Communication records within our platforms</li>
          </ul>
          <h3>3.4 Website Visitors</h3>
          <ul>
            <li>IP addresses and device information</li>
            <li>Browser type and usage patterns</li>
            <li>Cookies and similar tracking technologies (with consent)</li>
          </ul>

          <h2>4. How We Collect Information</h2>
          <p>We collect personal information through:</p>
          <ul>
            <li>Direct submission via our website forms and registration processes</li>
            <li>Client communications and service agreements</li>
            <li>Our AI-driven safety management system</li>
            <li>Custom e-safety file submission platforms</li>
            <li>Safety file uploads and document submissions</li>
            <li>Email, phone, and in-person communications</li>
          </ul>

          <h2>5. Purpose of Processing</h2>
          <p>We process personal information for the following lawful purposes:</p>
          <h3>5.1 Service Delivery</h3>
          <ul>
            <li>Providing rent-a-safety officer services across South Africa</li>
            <li>Operating our AI-driven online safety management system</li>
            <li>Building and maintaining custom e-safety platforms</li>
            <li>Creating and managing safety files and e-safety files</li>
          </ul>
          <h3>5.2 Business Operations</h3>
          <ul>
            <li>Client relationship management</li>
            <li>Billing and payment processing</li>
            <li>Quality assurance and service improvement</li>
            <li>Legal and regulatory compliance</li>
          </ul>
          <h3>5.3 System Administration</h3>
          <ul>
            <li>User authentication and access control</li>
            <li>System security and fraud prevention</li>
            <li>Technical support and troubleshooting</li>
            <li>Data backup and recovery</li>
          </ul>

          <h2>6. Legal Basis for Processing</h2>
          <p>Our processing activities are based on:</p>
          <ul>
            <li><strong>Contractual necessity</strong> for service delivery and client obligations</li>
            <li><strong>Legitimate interests</strong> for business operations and system security</li>
            <li><strong>Legal compliance</strong> with workplace safety regulations</li>
            <li><strong>Consent</strong> where specifically obtained (e.g., marketing communications)</li>
          </ul>

          <h2>7. Information Sharing and Disclosure</h2>
          <p><strong>We do not sell, rent, or share your personal information with third parties</strong> except in the following limited circumstances:</p>
          <h3>7.1 Service Providers</h3>
          <ul>
            <li>Authorized safety officers for service delivery</li>
            <li>Technical service providers for system maintenance (under strict confidentiality agreements)</li>
            <li>Payment processors for billing purposes</li>
          </ul>
          <h3>7.2 Legal Requirements</h3>
          <ul>
            <li>Compliance with court orders or legal processes</li>
            <li>Regulatory reporting requirements</li>
            <li>Protection of our legal rights and property</li>
          </ul>
          <h3>7.3 Business Transfers</h3>
          <ul>
            <li>In the event of merger, acquisition, or business sale (with appropriate safeguards)</li>
          </ul>

          <h2>8. Data Security</h2>
          <p>We implement comprehensive security measures including:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Access controls and user authentication</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Secure data backup and recovery procedures</li>
            <li>Staff training on data protection principles</li>
          </ul>

          <h2>9. Data Retention</h2>
          <p>We retain personal information only as long as necessary for:</p>
          <ul>
            <li>Fulfilling the purposes for which it was collected</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Resolving disputes and enforcing agreements</li>
          </ul>
          <p><strong>Retention Periods:</strong></p>
          <ul>
            <li>Client data: Duration of service agreement plus 7 years</li>
            <li>Safety officer records: Duration of engagement plus 5 years</li>
            <li>System logs: 3 years unless required for legal proceedings</li>
            <li>Financial records: 5 years as required by law</li>
          </ul>

          <h2>10. Your Rights Under POPIA</h2>
          <p>You have the right to:</p>
          <h3>10.1 Access</h3>
          <ul>
            <li>Request confirmation of whether we hold your personal information</li>
            <li>Obtain a copy of your personal information and processing details</li>
          </ul>
          <h3>10.2 Correction</h3>
          <ul>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Update your profile and contact details</li>
          </ul>
          <h3>10.3 Deletion</h3>
          <ul>
            <li>Request deletion of your personal information (subject to legal requirements)</li>
            <li>Account deactivation and data removal</li>
          </ul>
          <h3>10.4 Processing Restrictions</h3>
          <ul>
            <li>Object to or restrict certain processing activities</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <h3>10.5 Data Portability</h3>
          <ul>
            <li>Request your data in a commonly used format</li>
            <li>Transfer data to another service provider where technically feasible</li>
          </ul>

          <h2>11. Age Restrictions</h2>
          <p><strong>Our services are not available to individuals under 18 years of age.</strong> We do not knowingly collect personal information from minors. If we become aware that we have collected information from someone under 18, we will delete it immediately.</p>

          <h2>12. Cross-Border Data Transfers</h2>
          <p>When transferring personal information outside South Africa, we ensure:</p>
          <ul>
            <li>Adequate protection through approved mechanisms</li>
            <li>Contractual safeguards with international service providers</li>
            <li>Compliance with POPIA's transborder flow provisions</li>
          </ul>

          <h2>13. Cookies and Tracking</h2>
          <p>Our website uses cookies and similar technologies to:</p>
          <ul>
            <li>Ensure proper website functionality</li>
            <li>Analyze usage patterns and improve user experience</li>
            <li>Remember your preferences and login status</li>
          </ul>
          <p>You can control cookie settings through your browser preferences.</p>

          <h2>14. Contact and Complaints</h2>
          <h3>14.1 Privacy Inquiries</h3>
          <p>For questions about this policy or your privacy rights, contact our Information Officer:</p>
          <ul>
            <li><strong>Email:</strong> [Insert Email]</li>
            <li><strong>Phone:</strong> [Insert Phone Number]</li>
            <li><strong>Address:</strong> RAK-Site Safety Services, Three Rivers East, Vereeniging, South Africa</li>
          </ul>
          <h3>14.2 Complaints Process</h3>
          <p>If you have concerns about our handling of your personal information:</p>
          <ol>
            <li>Contact our Information Officer directly</li>
            <li>We will acknowledge your complaint within 5 business days</li>
            <li>Investigation and response within 30 days</li>
            <li>If unsatisfied, you may lodge a complaint with the Information Regulator</li>
          </ol>
          <h3>14.3 Information Regulator</h3>
          <ul>
            <li><strong>Information Regulator South Africa</strong></li>
            <li><strong>Website:</strong> www.justice.gov.za/inforeg</li>
            <li><strong>Email:</strong> inforeg@justice.gov.za</li>
            <li><strong>Phone:</strong> +27 12 406 4818</li>
          </ul>

          <h2>15. Policy Updates</h2>
          <p>We may update this privacy policy to reflect:</p>
          <ul>
            <li>Changes in our services or business practices</li>
            <li>Legal or regulatory requirements</li>
            <li>Best practice developments</li>
          </ul>
          <p>We will notify you of material changes through:</p>
          <ul>
            <li>Email notifications to registered users</li>
            <li>Website announcements</li>
            <li>System notifications within our platforms</li>
          </ul>

          <h2>16. Governing Law</h2>
          <p>This privacy policy is governed by South African law, including POPIA and other applicable privacy regulations.</p>
          
          <hr />

          <p><strong>Acknowledgment:</strong> By using our services, you acknowledge that you have read, understood, and agree to this privacy policy.</p>
          <p><strong>RAK-Site Safety Services</strong><br/>Three Rivers East, Vereeniging, South Africa<br/>{currentDate}</p>

        </div>
      </div>
    </div>
  );
}
