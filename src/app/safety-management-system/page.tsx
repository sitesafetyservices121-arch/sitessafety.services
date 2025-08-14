import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, DownloadCloud } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'All-in-One Safety Management System',
  description: 'A powerful, intuitive platform to streamline protocols, ensure compliance, and build a proactive safety culture.',
};

const systemFeatures = [
    { title: "Centralized Dashboard", description: "Get a real-time overview of your safety performance." },
    { title: "Incident Tracking", description: "Log, track, and manage incidents from discovery to resolution." },
    { title: "Risk Assessments", description: "Easily conduct and store risk assessments for all your projects." },
    { title: "Compliance Management", description: "Stay up-to-date with the latest safety regulations and standards." },
    { title: "Training Records", description: "Manage employee certifications and training schedules effortlessly." },
    { title: "Mobile Access", description: "Access safety data and report incidents from anywhere on-site." },
];

export default function SafetyManagementSystemPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-white border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold font-headline tracking-tight text-primary-dark">
            Your All-in-One Safety Platform
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            A powerful, intuitive platform to streamline your safety protocols, ensure compliance, and build a proactive safety culture from the ground up.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="lg:col-span-3 relative h-[500px] w-full rounded-lg overflow-hidden border shadow-lg">
                <Image src="https://placehold.co/800x600.png" alt="SMS Dashboard on a laptop" layout="fill" objectFit="cover" data-ai-hint="saas dashboard laptop" />
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="border bg-white shadow-lg">
                  <CardHeader className="items-center text-center">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <TrendingUp className="h-10 w-10 text-primary"/>
                      </div>
                      <CardTitle className="text-primary-dark font-headline text-3xl pt-2">Simple, Powerful Pricing</CardTitle>
                      <CardDescription className="font-body text-base">One plan, everything you need.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <p className="text-5xl font-bold text-primary-dark font-headline">R2400</p>
                    <p className="text-lg text-muted-foreground font-body -mt-2">per month</p>
                    <p className="text-muted-foreground font-body pt-4">Includes up to 12 users. Need more? Add users for just <span className="font-bold text-primary-dark">R350/month</span> each.</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" size="lg" variant="cta">
                        <Link href="#">
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
      <section className="py-24 bg-white border-y">
        <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-primary-dark font-headline">Core Platform Features</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-body">Everything you need to manage safety effectively.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {systemFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-background">
                        <div className="flex-shrink-0 mt-1">
                          <Zap className="h-6 w-6 text-accent"/>
                        </div>
                        <div>
                          <h3 className="text-lg text-primary-dark font-headline font-semibold">{feature.title}</h3>
                          <p className="text-muted-foreground font-body">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground border-none text-center p-10 md:p-16 rounded-lg">
                <CardHeader>
                    <div className="mx-auto w-fit p-4 bg-white/10 rounded-full shadow-sm mb-6">
                    <DownloadCloud className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-white font-headline text-3xl md:text-4xl">Ready to Transform Your Safety Management?</CardTitle>
                    <CardDescription className="max-w-xl mx-auto font-body text-primary-foreground/80 text-lg">Schedule a free, no-obligation demo to see our platform in action and learn how it can be tailored to your business.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                        <Link href="/e-safety-file">Book a Free Demo</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </section>
    </div>
  );
}
