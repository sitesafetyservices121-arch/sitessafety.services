
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Bot, Library, Send, Warehouse, ClipboardCheck, AlertTriangle } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'AI-Powered Safety Management System',
  description: 'A powerful, intuitive platform to streamline protocols, ensure compliance, and build a proactive safety culture with advanced AI tools.',
};

const systemFeatures = [
    { icon: <Library className="h-6 w-6 text-accent" />, title: "600+ Document Library", description: "Access a massive library of pre-built, compliant Word documents." },
    { icon: <Send className="h-6 w-6 text-accent" />, title: "Report Management", description: "Instantly send professional reports directly from the platform." },
    { icon: <Warehouse className="h-6 w-6 text-accent" />, title: "Storeroom Tracking", description: "Manage inventory and track safety equipment with ease." },
    { icon: <ClipboardCheck className="h-6 w-6 text-accent" />, title: "Inspection Reporting", description: "Log, track, and manage site inspections in real-time." },
    { icon: <AlertTriangle className="h-6 w-6 text-accent" />, title: "Damage & Plant Reporting", description: "Immediately log damage to equipment and plant for quick action." },
    { icon: <Bot className="h-6 w-6 text-accent" />, title: "Specialized AI Consultant", description: "Get expert advice and analysis from your built-in AI safety specialist." },
];

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
                <Image src="https://iili.io/JADb27u.png" alt="AI-driven safety management system dashboard" fill sizes="100vw" style={{objectFit: 'cover'}} data-ai-hint="data dashboard interface" />
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
                        <Link href="/contact">
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
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">5 Powerful AI Management Tools</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to manage safety effectively, powered by AI.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {systemFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4 p-4">
                        <div className="flex-shrink-0 mt-1">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg text-foreground font-bold">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
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
                        <Link href="/contact">Book a Free Demo</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </section>
    </div>
  );
}
