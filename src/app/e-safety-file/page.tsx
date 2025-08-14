import { InquiryForm } from "@/components/inquiry-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Building, Briefcase } from "lucide-react";
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
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">E Safety File Service</h1>
          <p className="text-lg text-muted-foreground">
            Go digital with our comprehensive E Safety File solutions. We create, manage, and maintain legally compliant safety files, so you can focus on your business. Say goodbye to paperwork and ensure you're always audit-ready.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-accent"/>
                  <CardTitle className="text-primary">Small to Medium Business</CardTitle>
                </div>
                <p className="text-3xl font-bold text-primary pt-2">R119K</p>
                <CardDescription>One-time fee</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                    {smbFeatures.map(f => <li key={f} className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" /> <span className="text-muted-foreground">{f}</span></li>)}
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col border-2 border-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="h-8 w-8 text-accent"/>
                  <CardTitle className="text-primary">Large & Enterprise</CardTitle>
                </div>
                <p className="text-3xl font-bold text-primary pt-2">R250K</p>
                <CardDescription>One-time fee</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                    {largeFeatures.map(f => <li key={f} className="flex items-start"><CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" /> <span className="text-muted-foreground">{f}</span></li>)}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-2">
            <Card className="shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="text-center text-2xl text-primary">Request a Quote or Consultation</CardTitle>
                <CardDescription className="text-center">Fill out the form below and we'll contact you.</CardDescription>
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
