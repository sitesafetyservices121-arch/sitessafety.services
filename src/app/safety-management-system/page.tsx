
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Bot, Library, Send, Warehouse, ClipboardCheck, AlertTriangle, Cpu, SlidersHorizontal, FileText, BarChart, HardHat, ShieldCheck, UserCog, Car, Box } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'AI-Powered Safety Management System',
  description: 'A powerful, intuitive platform to streamline protocols, ensure compliance, and build a proactive safety culture with advanced AI tools.',
};

const aiTools = [
    { icon: <Cpu className="h-6 w-6 text-accent" />, title: "HIRA Generator", description: "Automatically generate Hazard Identification and Risk Assessments." },
    { icon: <FileText className="h-6 w-6 text-accent" />, title: "Safe Work Procedure Generator", description: "Create site-specific, compliant safe work procedures in minutes." },
    { icon: <SlidersHorizontal className="h-6 w-6 text-accent" />, title: "Method Statement Generator", description: "Develop comprehensive method statements with AI assistance." },
    { icon: <AlertTriangle className="h-6 w-6 text-accent" />, title: "Incident Reporting & Statements", description: "Streamline incident reporting and generate initial statements." },
    { icon: <BarChart className="h-6 w-6 text-accent" />, title: "LTIR Tracker", description: "Monitor your Lost Time Injury Rate with automated tracking." },
];

const managementTools = [
    { icon: <HardHat className="h-6 w-6 text-primary" />, title: "PPE Issue Tracker", description: "Manage and track the issuance of Personal Protective Equipment." },
    { icon: <UserCog className="h-6 w-6 text-primary" />, title: "Employee Training Tracker", description: "Keep records of all employee training and certifications." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Site & Resource Tracker", description: "Monitor resources and personnel across multiple sites." },
    { icon: <Car className="h-6 w-6 text-primary" />, title: "Vehicle Inspection & Damage Reports", description: "Log and manage vehicle checks and report any damage instantly." },
    { icon: <Box className="h-6 w-6 text-primary" />, title: "Storeroom Management", description: "Efficiently track and manage your storeroom inventory." },
]


export default function SafetyManagementSystemPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Your AI-Powered Safety Command Center
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary platform that combines powerful management tools with specialized AI to streamline protocols, ensure compliance, and build a world-class safety culture.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="lg:col-span-3 relative h-[500px] w-full rounded-2xl overflow-hidden border shadow-xl">
                <Image src="https://iili.io/JADbWWp.png" alt="AI-driven safety management system dashboard" fill sizes="100vw" style={{objectFit: 'cover'}} data-ai-hint="data dashboard interface" />
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
                    <Button asChild className="w-full" size="lg" variant="cta">
                        <Link href="/safety-management-system/signup">
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
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">A Fully-Loaded, AI-Driven Safety Platform</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Our system integrates powerful AI tools for automated compliance with robust management features for total operational control. Plus, get access to a full specialised AI consultant and a 600+ document library.
                </p>
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-6"><Cpu className="h-7 w-7 text-accent" />5 Powerful AI Tools</h3>
                    <div className="space-y-6">
                        {aiTools.map((feature) => (
                            <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-background transition-colors">
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
                           <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-background transition-colors">
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
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-none text-center p-10 md:p-16 rounded-2xl shadow-lg">
                <CardHeader>
                    <div className="mx-auto w-fit p-4 bg-white/20 rounded-full shadow-sm mb-6">
                    <Bot className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-white font-extrabold text-3xl md:text-4xl">Ready to Revolutionize Your Safety Management?</CardTitle>
                    <CardDescription className="max-w-xl mx-auto text-primary-foreground/80 text-lg">Schedule a free, no-obligation demo to see our AI platform in action and learn how it can be tailored to your business.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                        <Link href="/safety-management-system/signup">Sign Up for a Demo</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </section>
    </div>
  );

    
