import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, CreditCard, ArrowRight, Zap, TrendingUp } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Safety Management System',
};

const systemFeatures = [
    { title: "Centralized Dashboard", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Get a real-time overview of your safety performance." },
    { title: "Incident Tracking", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Log, track, and manage incidents from discovery to resolution." },
    { title: "Risk Assessments", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Easily conduct and store risk assessments for all your projects." },
    { title: "Compliance Management", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Stay up-to-date with the latest safety regulations and standards." },
    { title: "Training Records", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Manage employee certifications and training schedules effortlessly." },
    { title: "Mobile Access", icon: <Zap className="h-5 w-5 text-accent"/>, description: "Access safety data and report incidents from anywhere on-site." },
];

export default function SafetyManagementSystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline">Your All-in-One Safety Management System</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto font-body">
          A powerful, intuitive platform to streamline your safety protocols, ensure compliance, and build a proactive safety culture.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-[450px] w-full rounded-xl overflow-hidden">
            <Image src="https://placehold.co/600x400.png" alt="SMS Dashboard" layout="fill" objectFit="cover" data-ai-hint="dashboard analytics" />
        </div>
        <div className="space-y-8">
            <Card className="border-2 border-border bg-card">
              <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-primary"/>
                  </div>
                  <div>
                    <CardTitle className="text-foreground font-headline">Simple, Powerful Pricing</CardTitle>
                    <CardDescription className="font-body">One plan, everything you need.</CardDescription>
                  </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-4xl font-bold text-foreground font-headline">R2400 <span className="text-lg font-normal text-muted-foreground font-body">/ month</span></p>
                <p className="text-muted-foreground font-body">Includes up to 12 users. Need more? Add users for just <span className="font-bold text-foreground">R350/month</span> each.</p>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-body font-bold rounded-full text-base">
                    <Link href="#">
                        Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
      </div>
      
       <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemFeatures.map((feature) => (
                <Card key={feature.title} className="bg-card border-2 border-border p-2">
                    <CardHeader className="flex-row items-center gap-4">
                        {feature.icon}
                        <CardTitle className="text-lg text-foreground font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground font-body">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>

       <Card className="bg-secondary/30 border-primary border-2 text-center p-10">
            <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-foreground font-headline">Not Sure Where to Start?</CardTitle>
                <CardDescription className="max-w-xl mx-auto font-body">Every business is unique. Let our experts help you find the perfect safety solution for your needs. Schedule a free, no-obligation consultation today.</CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
                <Button asChild className="font-body font-bold rounded-full" variant="outline">
                    <Link href="/e-safety-file">Book a Free Consultation</Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
