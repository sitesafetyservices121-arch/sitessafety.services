import { InquiryForm } from "@/components/inquiry-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Building, Briefcase, Star, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'E-Safety File',
};

const smbFeatures = [
    "Up to 50 employees",
    "Core compliance documents",
    "Digital access & storage",
    "Annual review & updates"
];

const largeFeatures = [
    "Unlimited employees",
    "All core and advanced documents",
    "Custom system integrations",
    "Dedicated account manager",
    "Quarterly reviews & proactive updates"
];

export default function ESafetyFilePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
            Digitize Your Compliance
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Streamline your safety management with our comprehensive, audit-ready E-Safety File solutions. Ditch the paperwork, embrace efficiency.
          </p>
        </div>
      </section>

      {/* Pricing & Form Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-start">
            
            {/* Pricing Tiers */}
            <div className="lg:col-span-3 space-y-8">
              <Card className="flex flex-col border-none bg-card shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Briefcase className="h-7 w-7 text-accent"/>
                    </div>
                    <div>
                      <CardTitle className="text-primary font-headline text-2xl">SMB Plan</CardTitle>
                      <CardDescription className="font-body text-base">Ideal for Small to Medium Businesses</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-5xl font-bold text-primary font-headline">R119K<span className="text-lg font-body font-normal text-muted-foreground">/one-time</span></p>
                  <ul className="space-y-3 font-body text-muted-foreground">
                      {smbFeatures.map(f => <li key={f} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent flex-shrink-0" /> <span>{f}</span></li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="flex flex-col border-2 border-accent shadow-2xl relative overflow-hidden bg-card">
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold font-body rounded-full flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Most Popular
                  </div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Building className="h-7 w-7 text-accent"/>
                    </div>
                    <div>
                      <CardTitle className="text-primary font-headline text-2xl">Enterprise Plan</CardTitle>
                      <CardDescription className="font-body text-base">For Large & Enterprise Companies</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <p className="text-5xl font-bold text-primary font-headline">R250K<span className="text-base font-body font-normal text-muted-foreground">/one-time</span></p>
                  <ul className="space-y-3 font-body text-muted-foreground">
                      {largeFeatures.map(f => <li key={f} className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-accent flex-shrink-0" /> <span>{f}</span></li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
                <Card className="shadow-2xl sticky top-24 border bg-card p-2">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-primary font-headline">Request a Consultation</CardTitle>
                    <CardDescription className="text-center font-body text-base">Fill out the form below and our team will contact you to discuss your specific needs.</CardDescription>
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
