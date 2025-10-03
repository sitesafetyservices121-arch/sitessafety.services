
"use client";

import { PayNowForm } from "@/components/pay-now-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useUser } from "@/firebase";
import { TopLoader } from "@/components/top-loader";

export default function PayNowPage() {
  const { user, loading } = useUser();

  if(loading) {
    return <TopLoader />;
  }

  return (
    <div className="bg-background text-foreground">
      <section className="py-24 md:py-32">
        <div className="container max-w-2xl mx-auto px-4">
            <Card className="shadow-xl border bg-card p-2">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <CreditCard className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl text-foreground font-bold">Make a Payment</CardTitle>
                    <CardDescription className="text-center text-base">
                        Please enter the details below to complete your payment for an existing invoice or quote.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PayNowForm />
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
