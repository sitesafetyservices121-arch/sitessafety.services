
import { ElectronicFileForm } from "@/components/electronic-file-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, FileText, Cloud, Download } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Electronically Delivered Safety Files',
  description: 'Receive your complete, print-ready safety file electronically within 24 hours. Fast, efficient, and compliant.',
};

const benefits = [
    { icon: <ShieldCheck className="h-7 w-7 text-primary" />, title: "100% OHS Act Compliant", description: "All documents meet legal requirements." },
    { icon: <Download className="h-7 w-7 text-primary" />, title: "Print-Ready ZIP Folder", description: "Get everything you need in one downloadable folder." },
    { icon: <Cloud className="h-7 w-7 text-primary" />, title: "Secure & Accessible", description: "Access your files anywhere, anytime." },
    { icon: <Zap className="h-7 w-7 text-primary" />, title: "Fast Turnaround", description: "Standard (24hr) and Express (12hr) options available." },
]

export default function ElectronicallyDeliveredSafetyFilesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                        Electronically Delivered Safety Files
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        The modern solution for site compliance. Simply upload your required safety file index—from clients like Mittal, Sasol, Omnia, Cape Gate, Coca-Cola, or Gold One—and within 12 to 24 hours, log on to download your complete, print-ready, and legally compliant safety file in a single ZIP folder.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="cta">
                            <Link href="#order-form">Get Your Safety File</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full">
                    <Image src="https://placehold.co/800x600.png" fill sizes="100vw" style={{objectFit: 'contain'}} alt="Digital folder on a screen" data-ai-hint="digital file download" />
                </div>
            </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Fast, Digital, and Compliant</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Our streamlined process eliminates paperwork and delays, getting you site-ready faster than ever.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit) => (
                    <div key={benefit.title} className="text-center p-4">
                        <div className="flex justify-center items-center mb-4 bg-primary/10 text-primary w-16 h-16 rounded-full mx-auto">
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="order-form" className="py-24 bg-card border-y">
        <div className="container max-w-3xl mx-auto px-4">
            <Card className="shadow-xl border p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Start Your Order</CardTitle>
                    <CardDescription className="text-center text-base">Choose your delivery speed, provide your details, and upload your documents to begin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ElectronicFileForm />
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
