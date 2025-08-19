
import { InquiryForm } from "@/components/inquiry-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Building, Briefcase, CheckCircle, FileText, Cloud, ShieldCheck, FolderArchive } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'E-Safety File Solutions',
  description: 'Digitize your compliance with our streamlined, audit-ready E-Safety File solutions. Request a consultation today.',
};

const benefits = [
    { icon: <ShieldCheck className="h-7 w-7 text-primary" />, title: "100% OHS Act Compliant", description: "All documents meet legal requirements." },
    { icon: <FileText className="h-7 w-7 text-primary" />, title: "Site-Ready Templates", description: "Get started instantly with included templates." },
    { icon: <Cloud className="h-7 w-7 text-primary" />, title: "Secure Cloud Storage", description: "Access your files anywhere, anytime." },
    { icon: <Zap className="h-7 w-7 text-primary" />, title: "Instant Delivery", description: "Receive and update your file digitally." },
]

const includedDocs = [
    "OHS Appointments & Organograms",
    "Risk Assessments & Method Statements",
    "Company Policies & Procedures",
    "Emergency Plans & Registers",
    "Daily / Weekly Inspection Checklists",
    "Toolbox Talks & Training Records"
]

export default function ESafetyFilePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                        Your Complete OHS-Compliant e-Safety File.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        Legally compliant, site-ready, digital safety files accessible anywhere. Ready in hours, not weeks.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="cta">
                            <Link href="#inquiry-form">Get Your e-Safety File Now</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full">
                    <Image src="https://placehold.co/800x600.png" layout="fill" objectFit="contain" alt="e-safety file on a laptop" data-ai-hint="saas dashboard laptop" />
                </div>
            </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">What is an e-Safety File?</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    An e-Safety File is a legally required document pack for site compliance, stored digitally for easy access and updates. It's the modern way to manage your safety obligations efficiently.
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

      {/* Whats Inside Section */}
      <section className="py-24 bg-card border-y">
        <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <FolderArchive className="h-10 w-10"/>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">A Complete Compliance System in One File</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    We provide a comprehensive set of documents to ensure you are fully prepared for any audit or inspection.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {includedDocs.map(doc => (
                    <div key={doc} className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                        <p className="text-lg text-muted-foreground">{doc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing & Form Section */}
      <section id="inquiry-form" className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Choose Your Plan</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Select the package that best fits your business needs. For custom requirements, please get in touch.
                </p>
            </div>
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-start">
            
            {/* Pricing Tiers */}
            <div className="lg:col-span-3 space-y-8">
              <Card className="flex flex-col border bg-card shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Briefcase className="h-7 w-7 text-primary"/>
                    </div>
                    <div>
                      <CardTitle className="text-foreground font-bold text-2xl">SMB Plan</CardTitle>
                      <CardDescription className="text-base">Ideal for Small to Medium Businesses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-5xl font-extrabold text-foreground">R119K<span className="text-lg font-normal text-muted-foreground">/one-time</span></p>
                  <p className="text-muted-foreground">Core compliance documents for teams up to 50 employees, with annual reviews and updates.</p>
                </CardContent>
              </Card>

              <Card className="flex flex-col border-2 border-accent shadow-2xl shadow-accent/20 bg-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Building className="h-7 w-7 text-primary"/>
                    </div>
                    <div>
                      <CardTitle className="text-foreground font-bold text-2xl">Enterprise Plan</CardTitle>
                      <CardDescription className="text-base">For Large & Enterprise Companies</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-5xl font-extrabold text-foreground">R250K<span className="text-base font-normal text-muted-foreground">/one-time</span></p>
                  <p className="text-muted-foreground">All core and advanced documents for unlimited employees, with a dedicated manager and quarterly reviews.</p>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
                <Card className="shadow-xl sticky top-24 border bg-card p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Request a Consultation</CardTitle>
                    <CardDescription className="text-center text-base">Fill out the form below and our team will contact you to discuss your specific needs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <InquiryForm />
                </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
