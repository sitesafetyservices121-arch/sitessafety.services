import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import Script from "next/script";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAK-Site Safety Services",
  "url": "https://www.sitesafety.services",
  "logo": "https://iili.io/KWCnTOb.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+27-71-611-5429",
    "contactType": "Customer Service",
    "email": "info@sitesafety.services",
    "areaServed": "ZA"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Three Rivers East",
    "addressLocality": "Vereeniging",
    "addressRegion": "Gauteng",
    "addressCountry": "ZA"
  },
  "sameAs": [
    "https://www.facebook.com/share/p/1W3cmvZK6o/",
    "https://www.linkedin.com/in/ruan-koen-93b774386"
  ]
};

export const metadata: Metadata = {
  title: "RAK-Site Safety Services",
  description: "Expert safety solutions for your business.",
  icons: {
    icon: "https://iili.io/KWCnTOb.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
        />
        <meta name="description" content="SafetyFile is a comprehensive platform for managing safety files and ensuring compliance."/>
        <script async src="//freeimage.host/sdk/pup.js" data-url="https://freeimage.host/upload"></script>
        <Script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
