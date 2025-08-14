import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "RAK-Site Safety Services",
    template: "%s | RAK-Site Safety Services",
  },
  description: "Your Partner in Occupational Health and Safety.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <div className="fixed inset-0 -z-20 h-full w-full bg-background" />
         <div 
          className="fixed inset-0 -z-10 h-full w-full"
          style={{
            backgroundImage: "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

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
