import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Lexend } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: "RAK-Site Safety | Precision Safety Solutions",
    template: "%s | RAK-Site Safety",
  },
  description: "Engineering a Safer Tomorrow. RAK-Site Safety delivers precision-engineered safety solutions for complex industries, ensuring compliance, efficiency, and fundamental security.",
};

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-headline' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable, lexend.variable)}>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
