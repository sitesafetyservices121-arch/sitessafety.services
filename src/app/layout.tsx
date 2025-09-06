

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google';
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "RAK-Site Safety Services | Modern Safety Solutions",
    template: "%s | RAK-Site Safety Services",
  },
  description: "RAK-Site Safety Services delivers next-generation safety solutions for complex industries, ensuring compliance, efficiency, and a secure work environment.",
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
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
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
