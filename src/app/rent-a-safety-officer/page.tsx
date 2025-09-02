
import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Shield, Briefcase, Calendar, CheckCircle } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Rent a Certified Safety Officer',
  description: 'Ensure project compliance with our flexible safety officer rental service. Get qualified, on-demand professionals on-site when you need them.',
};

const serviceFeatures = [
    { 
        icon: <Shield className="h-7 w-7 text-primary" />,
        title: "Certified Professionals",
        description: "Fully certified and SACPCMP registered officers ready to deploy." 
    },
    { 
        icon: <Calendar className="h-7 w-7 text-primary" />,
        title: "Flexible Rental Periods",
        description: "Hire for a day, a week, a month, or for the entire project duration."
    },
    { 
        icon: <Briefcase className="h-7 w-7 text-primary" />,
        title: "Multi-Industry Coverage",
        description: "Expertise in construction, manufacturing, energy, and more."
    },
    { 
        icon: <Zap className="h-7 w-7 text-primary" />,
        title: "Comprehensive On-Site Duties",
        description: "Audits, incident reporting, safety meetings, and toolbox talks."
    }
];

const processSteps = [
    {
        step: 1,
        title: "Submit Your Request",
        description: "Fill out the booking form with your project details and requirements. It's quick, easy, and obligation-free."
    },
    {
        step: 2,
        title: "Receive Your Quote",
        description: "Our team will review your request and send you a detailed quote and service agreement within 24 hours."
    },
    {
        step: 3,
        title: "Officer Deployed",
        description: "Once confirmed, we'll deploy a certified safety officer to your site, ready to work from day one."
    }
];

export default function RentASafetyOfficerPage() {
  return (
    <div className="bg-background text-foreground">
       {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            On-Demand Safety Expertise
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ensure your project meets all safety regulations with our flexible and reliable safety officer rental service. Get qualified professionals on-site when you need them.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="cta">
                <Link href="#booking-form">Book Your Safety Officer</Link>
            </Button>
          </div>
        </div>
      </section>
      
       {/* Features Section */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Flexible, Reliable, Certified</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    We provide everything you need to ensure your site is compliant and your team is safe, without the hassle of long-term hiring.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {serviceFeatures.map((feature) => (
                    <div key={feature.title} className="text-center p-4">
                        <div className="flex justify-center items-center mb-4 bg-primary/10 text-primary w-16 h-16 rounded-full mx-auto">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-card border-y">
        <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Simple 3-Step Process</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    Get a qualified safety officer on your site in no time.
                </p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-4 hidden md:block"></div>
                {processSteps.map((step) => (
                    <div key={step.step} className="relative text-center p-4">
                        <div className="flex justify-center items-center mb-4 bg-background border-2 border-primary text-primary w-16 h-16 rounded-full mx-auto z-10 relative">
                            <span className="text-2xl font-bold">{step.step}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Content & Form Section */}
      <section id="booking-form" className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                  Ready to Secure Your Site?
              </h2>
              <p className="text-lg text-muted-foreground">
                Complete the booking form with your project requirements. Our team will promptly review your submission and provide a no-obligation quote within one business day. Let us handle the complexities of safety compliance so you can focus on your project.
              </p>
              <div className="relative h-96 w-full rounded-2xl overflow-hidden border shadow-lg">
                  <Image src="https://placehold.co/800x600.png" alt="Safety officer on a construction site" fill style={{objectFit: 'cover'}} data-ai-hint="safety officer construction" />
              </div>
            </div>

            {/* Booking Form */}
            <div className="sticky top-24">
                <Card className="shadow-xl border bg-card p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-foreground font-bold">Book Your Safety Officer</CardTitle>
                    <CardDescription className="text-center text-base">Complete the form for a fast, no-obligation quote.</CardDescription>
                </CardHeader>
                <CardContent>
                    <BookingForm />
                </CardContent>
                </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
