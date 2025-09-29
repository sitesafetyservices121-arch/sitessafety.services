import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from 'next/font/google';
import Script from "next/script";
import imageData from "@/app/lib/placeholder-images.json";
import { ClientLayout } from "@/components/client-layout";
import { VantaBackground } from "@/components/vanta-background";

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700', '900'], 
  variable: '--font-body',
  display: 'swap',
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAK-Site Safety Services",
  "url": "https://www.sitesafety.services",
  "logo": imageData.meta.favicon.url,
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
    icon: imageData.meta.favicon.url,
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
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable)}>
        <VantaBackground />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
