"use client";

import { SmsSignupForm } from "@/components/sms-signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// export const metadata: Metadata = { // Metadata must be defined in a server component
//   title: 'Sign Up for Safety Management System',
//   description: 'Create your account to access the AI-Powered Safety Management System.',
// };

export default function SmsSignupPage() {

  return (
    <div className="bg-background text-foreground">
      <section className="py-24">
        <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-foreground">Get Started with Your AI Safety System</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Follow these simple steps to gain access to the future of worksite safety management.</p>
            </div>
          
            <Card className="mb-12 border bg-card p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-base">
                    <p>1. <span className="font-semibold text-foreground">Create an Account:</span> You'll need to sign up or log in to continue. This will register your initial administrator account.</p>
                    <p>2. <span className="font-semibold text-foreground">Confirmation & Payment:</span> An agent will contact you within the hour to confirm your details, process the payment, and help set up any additional users you require.</p>
                    <p>3. <span className="font-semibold text-foreground">Gain Access:</span> Once payment is confirmed, you will receive full access to the AI Safety Management System within 15 minutes.</p>
                     <div className="pt-4">
                        <Button asChild variant="outline">
                            <Link href="https://www.sitesafety.services" target="_blank" rel="noopener noreferrer">
                                Visit www.sitesafety.services <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

          <Card className="shadow-xl border bg-card p-2">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl text-foreground font-bold">Step 1: Create Your Admin Account</CardTitle>
                <CardDescription className="text-base">
                    Join the future of workplace safety. Sign up or log in below and an agent will contact you to finalize your account setup.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SmsSignupForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
