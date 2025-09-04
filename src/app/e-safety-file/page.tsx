
import { ConsultationForm } from "@/components/consultation-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, Users, Server, CheckCircle, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'E-Safety File Solutions',
  description: 'Digitize your compliance with our streamlined, audit-ready E-Safety File solutions. Request a consultation today.',
};

const plans = [
    {
        name: "Small to Medium",
        price: "R55,000",
        period: "/once-off",
        description: "Ideal for growing businesses needing robust, compliant safety documentation.",
        features: [
            "3 Months Hosting & Setup Included",
            "Unlimited Auditor & Contractor Logins",
            "1TB Secure Online Storage",
            "Full Compliance with OHS Act",
        ],
        icon: <Users className="h-8 w-8 text-primary"/>,
        cta: "Choose SMB Plan"
    },
    {
        name: "Large Enterprise",
        price: "R119,000",
        period: "/once-off",
        description: "Advanced features for large-scale operations with proactive AI-driven compliance.",
        features: [
            "Auto-Assistant AI Auditor",
            "Proactive Non-Compliance Alerts",
            "2TB Secure Online Storage",
            "Incident & Accident Reporting Flow",
        ],
        icon: <Bot className="h-8 w-8 text-primary"/>,
        cta: "Choose Large Enterprise"
    },
    {
        name: "Custom Enterprise",
        price: "Custom",
        period: "Pricing",
        description: "A bespoke solution tailored to your organization's unique and complex safety needs.",
        features: [
            "Fully Customized Platform",
            "Dedicated Account Manager",
            "Bespoke Integrations (HR, etc.)",
            "Tailored Support & Training",
        ],
        icon: <Server className="h-8 w-8 text-primary"/>,
        cta: "Request Custom Plan"
    }
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
                        Your Complete OHS-Compliant E-Safety File
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        Legally compliant, site-ready, digital safety files accessible anywhere. Choose a plan and get audit-ready in hours, not weeks.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" variant="cta">
                            <Link href="#inquiry-form">Book a Free Consultation</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[400px] w-full">
                    <Image src="https://placehold.co/800x600.png" fill sizes="100vw" style={{objectFit: 'contain'}} alt="e-safety file on a laptop" data-ai-hint="saas dashboard laptop" />
                </div>
            </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">A Plan for Every Business Size</h2>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    From agile small businesses to large-scale enterprises, we have a secure, compliant, and powerful E-Safety File solution for you.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {plans.map(plan => (
                    <Card key={plan.name} className="flex flex-col border bg-card shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <CardHeader className="text-center items-center pb-4">
                          <div className="p-4 bg-primary/10 rounded-full mb-4">
                            {plan.icon}
                          </div>
                          <CardTitle className="text-foreground font-bold text-3xl">{plan.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-6 text-center">
                          <div className="flex items-baseline justify-center gap-1">
                            <p className="text-5xl font-extrabold text-foreground">{plan.price}</p>
                            <p className="text-lg font-normal text-muted-foreground">{plan.period}</p>
                          </div>
                          <p className="text-muted-foreground h-12">{plan.description}</p>
                          <ul className="space-y-3 text-left pt-4">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full" size="lg" variant={plan.name === 'Large Enterprise' ? 'cta' : 'default'}>
                                <Link href="#inquiry-form">
                                    {plan.cta} <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="inquiry-form" className="py-24 bg-card border-y">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="shadow-xl border p-2">
            <CardHeader>
                <CardTitle className="text-center text-3xl text-foreground font-bold">Book Your Free Consultation</CardTitle>
                <CardDescription className="text-center text-base">Fill out the form below and our team will contact you to discuss your specific needs and get you started.</CardDescription>
            </CardHeader>
            <CardContent>
                <ConsultationForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
