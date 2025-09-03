
import { SmsSignupForm } from "@/components/sms-signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Sign Up for Safety Management System',
  description: 'Create your account to access the AI-Powered Safety Management System.',
};

export default function SmsSignupPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-24">
        <div className="container max-w-xl mx-auto px-4">
          <Card className="shadow-xl border bg-card p-2">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl text-foreground font-bold">Create Your Account</CardTitle>
                <CardDescription className="text-base">
                    Join the future of workplace safety. Fill out the form to get started.
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
