
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { initiateAdHocPayment } from "@/lib/actions";
import { useState, useTransition, useEffect } from "react";
import { Loader2, Info, User } from "lucide-react";
import { useUser } from "@/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

declare global {
    interface Window {
        payfast: any;
    }
}

const payNowFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("A valid email is required."),
  amount: z.coerce.number().min(1, "Amount must be greater than 0."),
  invoiceReference: z.string().min(3, "An invoice or quote reference is required."),
});

type PayNowFormValues = z.infer<typeof payNowFormSchema>;

export function PayNowForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { user, loading } = useUser();
  const pathname = usePathname();

  const form = useForm<PayNowFormValues>({
    resolver: zodResolver(payNowFormSchema),
    defaultValues: {
      name: "",
      email: "",
      invoiceReference: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, form]);
  
  // Dynamically load Payfast engine.js
  useEffect(() => {
    const script = document.createElement('script');
    const payfastUrl = process.env.NEXT_PUBLIC_PAYFAST_ENV === 'live' 
        ? "https://www.payfast.co.za/onsite/engine.js"
        : "https://sandbox.payfast.co.za/onsite/engine.js";
    script.src = payfastUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function onSubmit(data: PayNowFormValues) {
    startTransition(async () => {
      try {
        const payfastDetails = {
          amount: data.amount,
          item_name: `Payment for Invoice/Quote: ${data.invoiceReference}`,
          email_address: data.email,
          name_first: data.name.split(' ')[0],
          name_last: data.name.split(' ').slice(1).join(' '),
          m_payment_id: data.invoiceReference,
        };

        const response = await initiateAdHocPayment(payfastDetails);

        if (response.success && response.uuid) {
          if (window.payfast && window.payfast.onsite) {
            window.payfast.onsite.process({
              uuid: response.uuid,
              onComplete: () => {
                window.location.href = response.return_url || '/payment/success';
              },
              onCancel: () => {
                window.location.href = response.cancel_url || '/payment/cancel';
              },
              onError: (errorData: any) => {
                toast({
                    title: "Payment Error",
                    description: errorData?.error_message || "An error occurred during payment.",
                    variant: "destructive",
                });
              }
            });
          } else {
            toast({
              title: "Error",
              description: "Payfast script not loaded. Please refresh and try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Payment Error",
            description: response.message || "Failed to initiate payment.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    });
  }
  
  if (loading) {
    return <div className="text-center p-8"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></div>;
  }
  
  if (!user) {
    return (
        <div className="text-center p-8 bg-secondary rounded-lg border">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Please Log In</h3>
            <p className="text-muted-foreground mb-6">You need to be logged in to make a payment.</p>
            <Button asChild>
                <Link href={`/login?redirect=${pathname}`}>Log In to Pay</Link>
            </Button>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} readOnly={!!user} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input placeholder="you@company.com" {...field} type="email" readOnly={!!user} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="invoiceReference"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Invoice / Reference Number</FormLabel>
                    <FormControl><Input placeholder="INV-12345" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Amount (ZAR)</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="100.00" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <Alert variant="default" className="bg-primary/10 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-bold text-primary">Secure Payment</AlertTitle>
          <AlertDescription>
            All payments are securely processed by Payfast.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
