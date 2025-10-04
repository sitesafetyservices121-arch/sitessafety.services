/* eslint-disable react/no-unescaped-entities */
"use client";

import { ElectronicFileForm } from "@/components/electronic-file-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, FileText, Cloud, Download, Upload, Construction, KeyRound, FolderDown, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIconCard } from "@/components/ui/check-icon-card";
import imageData from "@/app/lib/placeholder-images.json";

const benefits = [
    { title: "100% OHS Act Compliant", description: "All documents meet legal requirements." },
    { title: "Print-Ready ZIP Folder", description: "Get everything you need in one downloadable folder." },
    { title: "Secure & Accessible", description: "Access your files anywhere, anytime." },
    { title: "Fast Turnaround", description: "Choose the delivery speed that fits your needs." },
]

const howItWorksSteps = [
    {
        icon: <Upload className="h-8 w-8 text-primary" />,
        title: "1. Upload Your Index",
        description: "In the order form below, upload the required safety file index from your client (e.g., Sasol, Mittal)."
    },
    {
        icon: <Construction className="h-8 w-8 text-primary" />,
        title: "2. We Build Your File",
        description: "Our experts compile your complete, compliant, and print-ready safety file based on the index provided."
    },
    {
        icon: <KeyRound className="h-8 w-8 text-primary" />,
        title: "3. Receive Your Access",
        description: "Once complete, you'll receive an email with your secure login password for our file portal."
    },
    {
        icon: <FolderDown className="h-8 w-8 text-primary" />,
        title: "4. Download & Print",
        description: "Log in to ecopyfile.services, our dedicated portal, download your folder, and print your site-ready safety file."
    }
]

export default function PrintReadySafetyFilesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-card border-b">
        
        <div className="container relative z-10 mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
                        Electronically Delivered Safety Files
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        The Modern Solution for Effortless Site Compliance. Forget the hassle of building safety files from scratch. With RAK-Site Safety Services, simply upload your client’s required safety file index whether for Mittal, Sasol, Omnia, Cape Gate, Coca-Cola, Gold One, or any other major client. Select your preferred delivery speed, and in minutes you’ll receive a complete, legally compliant, print-ready safety file neatly packaged in a single ZIP folder. Fast, simple, and audit-proof.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg">
                            <Link href="#order-form">Get Your Safety File</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full">
                    <Image src={imageData.ui.print_ready_folder.url} fill style={{objectFit: 'contain'}} alt="A secure digital folder being downloaded to a computer screen" data-ai-hint={imageData.ui.print_ready_folder.hint} priority sizes="(max-width: 1024px) 100vw, 50vw"/>
                </div>
            </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">How It Works</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">A simple, four-step process to get your compliant safety file, fast.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map(step => (
                    <Card key={step.title} className="text-center p-6 border bg-card shadow-sm">
                        <CardHeader className="items-center p-0 mb-4">
                            <div className="bg-primary/10 p-4 rounded-full">
                                {step.icon}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-16">
                <Card className="max-w-2xl mx-auto bg-card border p-8 inline-block">
                    <CardHeader className="p-0">
                    <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-4">
                        <Eye className="h-8 w-8 text-primary"/>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">See the File Portal</CardTitle>
                    <CardDescription className="text-base text-muted-foreground mt-2">
                        Explore the ecopyfile.services portal where you'll access your files.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-6">
                    <Button asChild size="lg">
                        <Link href="https://ecopyfile.services" target="_blank" rel="noopener noreferrer">
                            Live Preview <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card border-y">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Fast, Digital, and Compliant</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Our streamlined process eliminates paperwork and delays, getting you site-ready faster than ever.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit) => (
                    <CheckIconCard key={benefit.title} title={benefit.title} description={benefit.description} />
                ))}
            </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="order-form" className="py-24">
        <div className="container max-w-3xl mx-auto px-4">
            <Card className="shadow-xl border bg-card p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Start Your Order</CardTitle>
                    <CardDescription className="text-center text-base">Provide your details and upload your documents to begin.</CardDescription>
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
