import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, CreditCard, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Safety Management System',
};

const systemFeatures = [
    "Centralized dashboard",
    "Incident tracking and reporting",
    "Risk assessment tools",
    "Compliance management",
    "Employee training records",
    "Mobile access for on-site teams",
    "Customizable reporting"
];

export default function SafetyManagementSystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">Safety Management System</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A powerful, intuitive platform to streamline your safety protocols, ensure compliance, and build a proactive safety culture.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle className="text-primary">System Features</CardTitle>
                <CardDescription>Everything you need for comprehensive safety management.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 grid sm:grid-cols-2 gap-x-4 gap-y-3">
                    {systemFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        <div className="space-y-8">
            <Card className="bg-white dark:bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-accent"/>
                  <CardTitle className="text-primary">Pricing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-bold text-primary">R2400 / month</p>
                <p className="text-muted-foreground">Includes up to 12 users.</p>
                <p className="text-lg font-semibold text-primary pt-2">+ R350 / month</p>
                <p className="text-muted-foreground">For each additional user.</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card className="text-center hover:bg-accent/5 transition-colors">
                    <CardHeader>
                        <Calendar className="h-10 w-10 text-accent mx-auto mb-2" />
                        <CardTitle className="text-primary">Not Sure?</CardTitle>
                        <CardDescription>Let's discuss your specific needs.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full" variant="outline">
                            <Link href="/e-safety-file">Book a Free Consultation</Link>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="text-center hover:bg-accent/5 transition-colors">
                    <CardHeader>
                        <CreditCard className="h-10 w-10 text-accent mx-auto mb-2" />
                        <CardTitle className="text-primary">Ready to Start?</CardTitle>
                        <CardDescription>Proceed to our secure payment gateway.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        {/* This would link to a Payfast URL in a real application */}
                        <Button asChild className="w-full bg-accent hover:bg-accent/90">
                            <Link href="#">
                                Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
