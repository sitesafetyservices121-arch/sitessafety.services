
import { SmsSignupForm } from "@/components/sms-signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Bot, FileText, ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIconCard } from "@/components/ui/check-icon-card";

export const metadata: Metadata = {
  title: 'Instant Legal Document Generator',
  description: 'Instantly generate HIRAs and all other required site documents, ready for immediate use. Your on-demand compliance solution.',
};

const features = [
    { title: "Instant Generation", description: "Create legally compliant documents in seconds." },
    { title: "HIRA & Method Statements", description: "Generate complex documents with ease." },
    { title: "Always Compliant", description: "Our templates are always up-to-date with the latest regulations." },
    { title: "AI-Powered", description: "Leverage our intelligent system for accurate documentation." },
]

export default function LegalDocumentGeneratorPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                        Instant Site Document Generator
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        On-demand legal compliance. Instantly generate Hazard Identification and Risk Assessments (HIRAs), method statements, and all other required site documents, ready for immediate use.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="cta">
                            <Link href="#inquiry-form">Get Access Now</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full">
                    <Image src="https://iili.io/JAbgStp.png" fill sizes="100vw" style={{objectFit: 'contain'}} alt="AI document generation interface" data-ai-hint="ai document generator" />
                </div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Your On-Demand Compliance Tool</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Stop wasting time on paperwork. Our system functions as an instant document generator for all your site needs.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                    <CheckIconCard key={feature.title} title={feature.title} description={feature.description} />
                ))}
            </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-24 bg-card border-y">
        <div className="container max-w-3xl mx-auto px-4">
            <Card className="shadow-xl border p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Get Access to the Document Generator</CardTitle>
                    <CardDescription className="text-center text-base">Fill out the form below to create your account and get started with the Safety Management System.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SmsSignupForm />
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
