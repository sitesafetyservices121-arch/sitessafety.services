
"use client";

import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

// export const metadata: Metadata = {
//   title: 'Website & Cookie Policy',
// };

export default function WebsiteCookiePolicyPage() {
  const [effectiveDate, setEffectiveDate] = useState("27 September 2025");

  useEffect(() => {
    // This is just an example. If the date is static, it doesn't need a state.
    // If it were dynamic, this would be the correct approach to avoid hydration errors.
  }, []);

  return (
    <div className="bg-background text-foreground">
      <div className="container max-w-4xl mx-auto py-24 md:py-32 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline tracking-tight">Website & Cookie Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground font-body">Effective Date: {effectiveDate}</p>
          <p className="mt-1 text-base text-muted-foreground font-body">Applies To: All visitors to www.sitesafety.services</p>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none font-body text-muted-foreground prose-h2:font-headline prose-h2:text-primary-dark prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-secondary prose-h2:pb-3 prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
              
              <h2>1. Introduction</h2>
              <p>This Website & Cookie Policy explains how RAK-Site Safety Services ("we", "us", or "our") collects, uses, and stores information through cookies and similar technologies when you visit our website or use our AI-powered safety platforms.</p>
              <p>We are committed to complying with the Protection of Personal Information Act (POPIA) and ensuring transparent data practices.</p>

              <h2>2. What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help the site recognize your browser and remember information like your preferences or login state.</p>

              <h2>3. Types of Cookies We Use</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Essential Cookies</strong></td>
                            <td>Required for core functionality such as page navigation and secure login.</td>
                        </tr>
                        <tr>
                            <td><strong>Performance Cookies</strong></td>
                            <td>Help us analyze website traffic and improve functionality (e.g., Google Analytics).</td>
                        </tr>
                        <tr>
                            <td><strong>Functionality Cookies</strong></td>
                            <td>Remember your preferences (e.g., saved login or region selection).</td>
                        </tr>
                        <tr>
                            <td><strong>Security Cookies</strong></td>
                            <td>Enhance platform security and detect suspicious activity.</td>
                        </tr>
                        <tr>
                            <td><strong>AI Session Cookies</strong></td>
                            <td>Support real-time interaction with our AI-powered safety management system.</td>
                        </tr>
                    </tbody>
                </table>

              <h2>4. Third-Party Services</h2>
              <p>We may use trusted third-party services that also set cookies, including:</p>
              <ul>
                <li>Google Analytics (to track website traffic and usage patterns)</li>
                <li>Live chat widgets or support tools (to provide customer support)</li>
                <li>Cloud hosting/CDN platforms (to optimize page loading and uptime)</li>
              </ul>
              <p>Each third party is required to handle your data according to their own privacy terms and POPIA-compliant agreements.</p>

              <h2>5. How We Use Cookie Data</h2>
              <p>We use cookies to:</p>
              <ul>
                <li>Ensure our website and platforms function correctly</li>
                <li>Secure user sessions and prevent unauthorized access</li>
                <li>Understand user behavior and improve user experience</li>
                <li>Remember login status and platform preferences</li>
                <li>Monitor system performance and prevent abuse</li>
              </ul>

              <h2>6. Consent & Opt-Out Options</h2>
              <h3>6.1 Cookie Consent</h3>
              <p>When you first visit our site, you will see a cookie banner. By continuing to use the site, you agree to our use of cookies as described in this policy.</p>
              <p>You may withdraw your consent at any time by adjusting your cookie settings.</p>
              <h3>6.2 Managing Cookies</h3>
              <p>You can manage or block cookies by modifying your browser settings. However, blocking certain cookies may affect the functionality of our website or safety system platform.</p>
              <p>Helpful links for managing cookies:</p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>

              <h2>7. Data Privacy and Security</h2>
              <p>Any information collected via cookies is processed in accordance with our <Link href="/privacy">Privacy Policy</Link> and POPIA. We do not sell or share your personal information with third parties for advertising purposes.</p>

              <h2>8. Contact Us</h2>
              <p>If you have questions or concerns about this Website & Cookie Policy, please contact us:</p>
              <ul>
                <li>📧 Email: <a href="mailto:info@sitesafety.services">info@sitesafety.services</a></li>
                <li>📍 Address: Three Rivers East, Vereeniging, South Africa</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
