
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
import VantaBackground from "@/components/vanta-background";


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
        url: 'https://iili.io/JADbWWp.png', // Main dashboard/system image
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
    images: ['https://iili.io/JADbWWp.png'],
  },
  icons: {
    icon: "https://iili.io/KnOi1Og.png",
    shortcut: "https://iili.io/KnOi1Og.png",
    apple: "https://iili.io/KnOi1Og.png",
  }
};

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-body' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
            <VantaBackground />
            <div className="relative flex min-h-dvh flex-col bg-transparent">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
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
      </body>
    </html>
  );
}
