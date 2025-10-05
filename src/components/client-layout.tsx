
"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/loading-provider";
import { TopLoader } from "@/components/top-loader";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Inter } from 'next/font/google';
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700', '900'], 
  variable: '--font-body',
  display: 'swap',
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LoadingProvider>
        <div className={cn("relative flex min-h-dvh flex-col bg-transparent font-body antialiased", inter.variable)}>
          <TopLoader />
          <Header />
          <main className="flex-1">{children}</main>
          {isClient && <Footer />}
        </div>
        <Toaster />
      </LoadingProvider>
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
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
