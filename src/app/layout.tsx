
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google';
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { LoadingProvider } from "@/components/loading-provider";
import { TopLoader } from "@/components/top-loader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import imageData from "@/app/lib/placeholder-images.json";


export const metadata: Metadata = {
  metadataBase: new URL('https://www.sitesafety.services'),
  title: {
    default: "RAK-Site Safety Services | Modern Safety Solutions",
    template: "%s | RAK-Site Safety Services",
  },
  description: "RAK-Site Safety Services delivers next-generation safety solutions for complex industries, ensuring compliance, efficiency, and a secure work environment.",
  keywords: ["safety services", "occupational health and safety", "site safety", "safety officer", "e-safety file", "safety management system", "construction safety", "South Africa"],
  openGraph: {
    title: "RAK-Site Safety Services | Modern Safety Solutions",
    description: "Expert safety solutions for construction, mining, and industrial sectors across South Africa. We blend human expertise with AI to ensure you are always compliant.",
    url: 'https://www.sitesafety.services',
    siteName: 'RAK-Site Safety Services',
    images: [
      {
        url: imageData.og_image_dashboard.url,
        width: 1200,
        height: 630,
        alt: 'AI-Powered Safety Management System Dashboard',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAK-Site Safety Services - Next-Gen Safety & Compliance',
    description: 'RAK-Site Safety Services delivers next-generation safety solutions for complex industries, ensuring compliance, efficiency, and a secure work environment.',
    images: [imageData.og_image_dashboard.url],
  },
  icons: {
    icon: imageData.favicon.url,
    shortcut: imageData.favicon.url,
    apple: imageData.favicon.url,
  }
};

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
  "logo": imageData.favicon.url,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
            strategy="beforeInteractive"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LoadingProvider>
              <div className="relative flex min-h-dvh flex-col bg-transparent">
                <TopLoader />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </LoadingProvider>
          </AuthProvider>
          <Script id="tawk-to-script" strategy="lazyOnload">
            {`
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68b587e2d45e5d19250fab68/1j42hljkf';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `}
          </Script>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
