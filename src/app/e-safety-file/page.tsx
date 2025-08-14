import { InquiryForm } from "@/components/inquiry-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Building, Briefcase, Star } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'E Safety File',
};

const smbFeatures = [
    "Up to 50 employees",
    "Core compliance documents",
    "Digital access and storage",
    "Annual review"
];

const largeFeatures = [
    "Unlimited employees",
    "All core and advanced documents",
    "Custom integrations",
    "Dedicated account manager",
    "Quarterly reviews & updates"
];

export default function ESafetyFilePage() {
  return (
    <div className="container max-w-7xl mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline tracking-tighter">E-Safety File Solutions</h1>
            <p className="text-lg text-muted-foreground font-body">
              Go digital with our comprehensive E-Safety File solutions. We create, manage, and maintain legally compliant safety files, so you can focus on your business. Say goodbye to paperwork and ensure you're always audit-ready.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="flex flex-col border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Briefcase className="h-7 w-7 text-primary"/>
                  </div>
                  <div>
                    <CardTitle className="text-foreground font-headline">SMB Plan</CardTitle>
                    <CardDescription className="font-body">For Small to Medium Businesses</CardDescription>
                  </div>
                </div>
                 
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold text-foreground font-headline">R119K<span className="text-base font-body font-normal text-muted-foreground">/one-time</span></p>
                <ul className="space-y-3">
                    {smbFeatures.map(f => <li key={f} className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" /> <span className="text-muted-foreground font-body">{f}</span></li>)}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-2 border-primary shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold font-body rounded-bl-lg">
                    <Star className="h-4 w-4 inline-block mr-1" />
                    Most Popular
                </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Building className="h-7 w-7 text-primary"/>
                  </div>
                  <div>
                    <CardTitle className="text-foreground font-headline">Enterprise Plan</CardTitle>
                    <CardDescription className="font-body">For Large & Enterprise Companies</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-4xl font-bold text-foreground font-headline">R250K<span className="text-base font-body font-normal text-muted-foreground">/one-time</span></p>
                <ul className="space-y-3">
                    {largeFeatures.map(f => <li key={f} className="flex items-start"><CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" /> <span className="text-muted-foreground font-body">{f}</span></li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
            <Card className="shadow-lg sticky top-24 border bg-card">
            <CardHeader>
                <CardTitle className="text-center text-2xl text-foreground font-headline">Request a Consultation</CardTitle>
                <CardDescription className="text-center font-body">Fill out the form below and our team will contact you to discuss your needs.</CardDescription>
            </CardHeader>
            <CardContent>
                <InquiryForm />
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
