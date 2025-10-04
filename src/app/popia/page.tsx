
/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'POPIA Policy',
};

export default function PopiaPage() {
  const effectiveDate = "27 September 2025";

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">Effective Date: {effectiveDate}</p>
          <p className="mt-1 text-lg text-muted-foreground">Last Updated: {effectiveDate}</p>
        </div>
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none text-muted-foreground prose-h2:font-bold prose-h2:text-foreground prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
              
              <h2>1. Introduction</h2>
              <p>RAK-Site Safety Services ("we", "us", or "our") is committed to safeguarding your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable privacy laws in South Africa.</p>
              <p>This policy explains what data we collect, how we use it, your rights, and how we keep it secure.</p>
              <p><strong>Company Details:</strong></p>
              <ul>
                <li><strong>Business Name:</strong> RAK-Site Safety Services</li>
                <li><strong>Location:</strong> Three Rivers East, Vereeniging, South Africa</li>
                <li><strong>Services:</strong>
                  <ul>
                    <li>Rent-a-Safety Officer services</li>
                    <li>AI-powered safety management systems</li>
                    <li>Custom e-safety file creation and auditing platforms</li>
                  </ul>
                </li>
              </ul>

              <h2>2. Information Officer</h2>
              <p>Our appointed Information Officer oversees compliance with this policy and POPIA.</p>
              <ul>
                  <li><strong>Agnesha De Caires</strong></li>
                  <li>Head of client service</li>
                  <li>📧 <a href="mailto:info@sitesafety.services">info@sitesafety.services</a> | 📞 0716115429</li>
                  <li>📍 Three Rivers East, Vereeniging, South Africa</li>
              </ul>

              <h2>3. Personal Information We Collect</h2>
              <h3>3.1 Clients</h3>
              <ul>
                <li>Business registration and contact details</li>
                <li>Representative names, positions, and contact info</li>
                <li>Billing and payment information</li>
                <li>Project and site specifications</li>
              </ul>
              <h3>3.2 Safety Officers</h3>
              <ul>
                <li>ID and personal details</li>
                <li>Professional qualifications and certificates</li>
                <li>Work history and references</li>
                <li>Safety training records and availability</li>
              </ul>
              <h3>3.3 System Users</h3>
              <ul>
                <li>Login details and user profiles</li>
                <li>System usage logs and audit trails</li>
                <li>Safety file submissions</li>
                <li>Communication records within our platform</li>
              </ul>
              <h3>3.4 Website Visitors</h3>
              <ul>
                <li>IP address and device type</li>
                <li>Browser and usage data</li>
                <li>Cookies and similar tracking technologies (with consent)</li>
              </ul>

              <h2>4. How We Collect Information</h2>
              <p>We collect data through:</p>
              <ul>
                <li>Website forms and registrations</li>
                <li>Client communication and agreements</li>
                <li>Our AI-driven platforms and systems</li>
                <li>Document submissions and uploads</li>
                <li>Phone calls, emails, and in-person meetings</li>
              </ul>

              <h2>5. Purpose of Processing</h2>
              <h3>5.1 Service Delivery</h3>
              <ul>
                <li>Provide safety officer services</li>
                <li>Operate our safety management systems</li>
                <li>Create and manage safety files</li>
              </ul>
              <h3>5.2 Business Operations</h3>
              <ul>
                <li>Client relationship and project management</li>
                <li>Invoicing and payments</li>
                <li>Service improvement and quality control</li>
                <li>Legal and regulatory compliance</li>
              </ul>
              <h3>5.3 System Management</h3>
              <ul>
                <li>User authentication</li>
                <li>Fraud prevention and security monitoring</li>
                <li>Technical support</li>
                <li>Backup and disaster recovery</li>
              </ul>

              <h2>6. Legal Grounds for Processing</h2>
              <p>We rely on the following lawful bases:</p>
              <ul>
                <li><strong>Contractual necessity:</strong> To provide services and fulfil agreements</li>
                <li><strong>Legitimate interests:</strong> For business operations and security</li>
                <li><strong>Legal obligations:</strong> For compliance with safety and labour laws</li>
                <li><strong>Consent:</strong> Where explicitly obtained, such as for marketing</li>
              </ul>

              <h2>7. Information Sharing and Disclosure</h2>
              <p>We do not sell or trade your personal information. We may share data with:</p>
              <h3>7.1 Service Providers</h3>
              <ul>
                <li>Authorised safety officers</li>
                <li>System maintenance and IT partners (under confidentiality agreements)</li>
                <li>Payment processors</li>
              </ul>
              <h3>7.2 Legal Obligations</h3>
              <ul>
                <li>Government authorities, courts, or regulators</li>
                <li>As required to protect our rights or comply with legal obligations</li>
              </ul>
              <h3>7.3 Business Changes</h3>
              <ul>
                <li>In the case of a sale, merger, or restructuring (with proper safeguards)</li>
              </ul>

              <h2>8. Data Security</h2>
              <p>We apply robust security measures to protect your data, including:</p>
              <ul>
                <li>Encryption (in transit and at rest)</li>
                <li>User access controls</li>
                <li>Routine security audits</li>
                <li>Secure backups</li>
                <li>Staff training on data privacy</li>
              </ul>

              <h2>9. Data Retention</h2>
              <p>We only retain personal data as long as necessary for legal and operational reasons:</p>
              <table>
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Client information</td>
                    <td>Agreement term + 7 years</td>
                  </tr>
                  <tr>
                    <td>Safety officer records</td>
                    <td>Engagement period + 5 years</td>
                  </tr>
                  <tr>
                    <td>System logs</td>
                    <td>3 years (unless legally required longer)</td>
                  </tr>
                  <tr>
                    <td>Financial records</td>
                    <td>5 years (as per tax law)</td>
                  </tr>
                </tbody>
              </table>

              <h2>10. Your Rights Under POPIA</h2>
              <p>You have the right to:</p>
              <h3>10.1 Access</h3>
              <ul>
                <li>Confirm whether we hold your data</li>
                <li>Request a copy of your personal information</li>
              </ul>
              <h3>10.2 Correction</h3>
              <ul>
                <li>Update incorrect or incomplete information</li>
              </ul>
              <h3>10.3 Deletion</h3>
              <ul>
                <li>Request removal of your data (subject to legal retention obligations)</li>
              </ul>
              <h3>10.4 Objection and Restriction</h3>
              <ul>
                <li>Object to certain processing activities</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <h3>10.5 Data Portability</h3>
              <ul>
                <li>Request your data in a portable format</li>
                <li>Transfer it to another provider if feasible</li>
              </ul>

              <h2>11. Age Restrictions</h2>
              <p>Our services are intended for users 18 years or older. We do not knowingly collect information from minors. If we become aware of such data, it will be deleted promptly.</p>

              <h2>12. Cross-Border Transfers</h2>
              <p>When personal information is transferred outside South Africa, we ensure:</p>
              <ul>
                <li>Transfers are governed by POPIA-compliant contracts</li>
                <li>The recipient country offers adequate data protection</li>
              </ul>

              <h2>13. Cookies and Tracking</h2>
              <p>Our website uses cookies to:</p>
              <ul>
                <li>Ensure proper functionality</li>
                <li>Improve user experience</li>
                <li>Analyze traffic patterns</li>
              </ul>
              <p>You may manage cookie preferences via your browser settings.</p>

              <h2>14. Contact & Complaints</h2>
              <h3>14.1 Contact Us</h3>
              <p>For questions or concerns, contact our Information Officer:</p>
              <ul>
                  <li>📧 <a href="mailto:info@sitesafety.services">info@sitesafety.services</a></li>
                  <li>📞 0716115429</li>
                  <li>📍 Three Rivers East, Vereeniging, South Africa</li>
              </ul>
              <h3>14.2 Complaints</h3>
              <p>If you believe your data is being misused:</p>
              <ol>
                <li>Contact us directly—complaints are acknowledged within 5 business days</li>
                <li>We aim to resolve issues within 30 days</li>
                <li>If unresolved, you may contact the Information Regulator:</li>
              </ol>
              <ul>
                <li><strong>Information Regulator (South Africa)</strong></li>
                <li>🌐 <a href="https://www.justice.gov.za/inforeg" target="_blank" rel="noopener noreferrer">www.justice.gov.za/inforeg</a></li>
                <li>📧 inforeg@justice.gov.za</li>
                <li>📞 +27 12 406 4818</li>
              </ul>

              <h2>15. Policy Updates</h2>
              <p>We may update this policy to reflect changes in our services, law, or best practices. Material updates will be communicated through:</p>
              <ul>
                <li>Email notices</li>
                <li>Website banners</li>
                <li>In-platform announcements</li>
              </ul>

              <h2>16. Governing Law</h2>
              <p>This policy is governed by the laws of South Africa, including POPIA and other applicable data protection regulations.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
