import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Inter, Lexend_Deca } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: "RAK-Site Safety",
    template: "%s | RAK-Site Safety",
  },
  description: "Engineering a Safer Tomorrow. Precision safety solutions for complex industries.",
};

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const lexendDeca = Lexend_Deca({ subsets: ['latin'], weight: ['300','600'], variable: '--font-headline' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", inter.variable, lexendDeca.variable)}>
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
