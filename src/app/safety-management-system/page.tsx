
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Bot, Library, Send, Warehouse, ClipboardCheck, AlertTriangle, Cpu, SlidersHorizontal, FileText, BarChart, HardHat, ShieldCheck, UserCog, Car, Box } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import imageData from "@/app/lib/placeholder-images.json";


// export const metadata: Metadata = { // This needs to be moved to a Server Component or removed from client component
//   title: 'AI-Powered Safety Management System',
//   description: 'A powerful, intuitive platform to streamline protocols, ensure compliance, and build a proactive safety culture with advanced AI tools.',
// };

const aiTools = [
    { icon: <Cpu className="h-6 w-6 text-primary" />, title: "HIRA Generator", description: "Automatically generate detailed Hazard Identification and Risk Assessments tailored to your operations, helping you stay proactive in identifying and mitigating workplace risks." },
    { icon: <FileText className="h-6 w-6 text-primary" />, title: "Safe Work Procedure Generator", description: "Quickly create site-specific, fully compliant Safe Work Procedures in minutes, ensuring your teams have clear, actionable guidance for safe operations." },
    { icon: <SlidersHorizontal className="h-6 w-6 text-primary" />, title: "Method Statement Generator", description: "Develop comprehensive, structured Method Statements with AI assistance, streamlining planning while meeting industry and regulatory standards." },
    { icon: <AlertTriangle className="h-6 w-6 text-primary" />, title: "Incident Reporting & Statements", description: "Simplify the entire incident reporting process by capturing critical details instantly and generating clear, professional initial statements for investigations." },
    { icon: <BarChart className="h-6 w-6 text-primary" />, title: "LTIR Tracker", description: "Monitor and track your Lost Time Injury Rate with automated precision, providing real-time insights that help improve safety performance and reduce risks." },
];

const managementTools = [
    { icon: <HardHat className="h-6 w-6 text-primary" />, title: "PPE Issue Tracker", description: "Manage and track the issuance of Personal Protective Equipment." },
    { icon: <UserCog className="h-6 w-6 text-primary" />, title: "Employee Training Tracker", description: "Keep records of all employee training and certifications. You also receive emails before expiry and can be set up the employee receives the emails as well upon his training expiring." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Site & Resource Tracker", description: "Monitor resources and personnel across multiple sites." },
    { icon: <Car className="h-6 w-6 text-primary" />, title: "Vehicle Inspection & Damage Reports", description: "Log and manage vehicle checks and report any damage instantly." },
    { icon: <Box className="h-6 w-6 text-primary" />, title: "Storeroom Management", description: "Efficiently track and manage your storeroom inventory." },
]


export default function SafetyManagementSystemPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b">
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
            Your AI-Powered Safety Command Center
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A safety platform built to dominate risk, not just manage it. RAK-Site Safety Services fuses advanced AI with precision-built management tools to automate compliance, enforce protocols, and embed a safety culture that doesn’t just meet the standard ,it sets it.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="lg:col-span-3 relative h-[500px] w-full rounded-2xl overflow-hidden border shadow-xl">
                <Image src={imageData.ui.safety_system_dashboard.url} alt="AI-driven safety management system dashboard" fill style={{objectFit: 'cover'}} data-ai-hint={imageData.ui.safety_system_dashboard.hint} priority sizes="(max-width: 1024px) 100vw, 60vw"/>
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="border bg-card shadow-lg">
                  <CardHeader className="items-center text-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Bot className="h-10 w-10 text-primary"/>
                      </div>
                      <CardTitle className="text-foreground font-bold text-3xl pt-2">Simple, Powerful Pricing</CardTitle>
                      <CardDescription className="text-base">One plan, everything you need.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <p className="text-5xl font-extrabold text-foreground">R2500</p>
                    <p className="text-lg text-muted-foreground -mt-2">per month</p>
                    <p className="text-muted-foreground pt-4">Includes 1 user login. Need more? Add users for just <span className="font-bold text-foreground">R350/month</span> each.</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" size="lg">
                        <Link href="https://raksms.services/signup">
                            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-card border-y">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Total Control. Zero Guesswork.</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    RAK-Site Safety Services gives you the best of both worlds: intelligent automation and complete control. Our AI engine works around the clock—monitoring compliance in real time, flagging risks instantly, generating reports, and ensuring your operation is always audit-ready.
                </p>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    But we don’t stop at automation. Our advanced management platform gives you full visibility across every site, team, and document—so you stay in control while scaling compliance with confidence.
                </p>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    And when you need expert support, you’ll have direct access to a dedicated AI compliance consultant plus an exclusive library of 600+ pre-built, audit-tested safety documents. Ready to deploy, customize, and implement immediately, they make compliance faster, easier, and bulletproof.
                </p>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    With RAK-Site Safety Services, compliance isn’t just simplified. It’s unstoppable.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-6"><Cpu className="h-7 w-7 text-primary" />5 Powerful AI Tools</h3>
                    <div className="space-y-6">
                        {aiTools.map((feature) => (
                            <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-black/10 dark:hover:bg-white/5 transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                {feature.icon}
                                </div>
                                <div>
                                <h4 className="text-lg text-foreground font-bold">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-6"><ClipboardCheck className="h-7 w-7 text-primary" />5 Essential Management Tools</h3>
                    <div className="space-y-6">
                        {managementTools.map((feature) => (
                           <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-black/10 dark:hover    :bg-white/5 transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                {feature.icon}
                                </div>
                                <div>
                                <h4 className="text-lg text-foreground font-bold">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground border-none text-center p-10 md:p-16 rounded-2xl shadow-lg">
                <CardHeader>
                    <div className="mx-auto w-fit p-4 bg-white/20 rounded-full shadow-sm mb-6">
                    <Bot className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-white font-extrabold text-3xl md:text-4xl">Ready to Revolutionize Your Safety Management?</CardTitle>
                    <CardDescription className="max-w-xl mx-auto text-primary-foreground/80 text-lg">Schedule a free, no-obligation demo to see our AI platform in action and learn how it can be tailored to your business.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                        <Link href="https://raksms.services/signup">Sign Up for a Demo</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </section>
    </div>
  );
}

    