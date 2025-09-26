
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
import { submitElectronicFileOrder, createPayfastPaymentIdentifier } from "@/lib/actions";
import { useState, useTransition, useEffect } from "react";
import { Info, Loader2, Upload, CheckCircle, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        payfast: any;
    }
}

const serviceTiers = {
    "Standard": { price: 1850.00, time: "Within 24 Hours" },
    "Express": { price: 2500.00, time: "Within 12 Hours" },
    "Urgent": { price: 3000.00, time: "Within 6 Hours" }
}

type ServiceTierKey = keyof typeof serviceTiers;

const electronicFileFormSchema = z.object({
  name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  companyLogo: z.any().refine(files => files?.length > 0, "Company logo is required."),
  fileIndex: z.any().refine(files => files?.length > 0, "File index is required."),
  serviceTier: z.enum(Object.keys(serviceTiers) as [ServiceTierKey, ...ServiceTierKey[]], {
    required_error: "You must select a service tier.",
  }),
});

type ElectronicFileFormValues = z.infer<typeof electronicFileFormSchema>;

export function ElectronicFileForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showThankYou, setShowThankYou] = useState(false);
  const [total, setTotal] = useState(0);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const form = useForm<ElectronicFileFormValues>({
    resolver: zodResolver(electronicFileFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      company: "",
      email: "",
      phone: "",
      serviceTier: "Standard",
    },
  });

  const watchCompanyLogo = form.watch("companyLogo");
  const watchFileIndex = form.watch("fileIndex");
  const watchServiceTier = form.watch("serviceTier");
  
  useEffect(() => {
    if (user) {
        const nameParts = user.displayName?.split(' ') || [];
        form.setValue('name', nameParts[0] || '');
        form.setValue('surname', nameParts.slice(1).join(' ') || '');
        form.setValue('email', user.email || '');
    }
  }, [user, form]);

  useEffect(() => {
    if (watchServiceTier) {
        setTotal(serviceTiers[watchServiceTier].price);
    }
  }, [watchServiceTier]);

  // Dynamically load Payfast engine.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payfast.co.za/onsite/engine.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  function onSubmit(data: ElectronicFileFormValues) {
    startTransition(async () => {
        const submissionData = {
            ...data,
            total: serviceTiers[data.serviceTier].price,
            companyLogo: data.companyLogo[0]?.name,
            fileIndex: data.fileIndex[0]?.name,
        };

        // First, submit the order details via Web3Forms (email notification)
        const orderResult = await submitElectronicFileOrder(submissionData);

        if (!orderResult.success) {
            toast({
                title: "Error",
                description: orderResult.message,
                variant: "destructive",
            });
            return;
        }

        // Then, initiate Payfast payment
        try {
            const payfastDetails = {
                amount: total,
                item_name: `Electronic Safety File - ${data.serviceTier}`,
                email_address: data.email,
                return_url: `${window.location.origin}/payment-success`,
                cancel_url: `${window.location.origin}/payment-cancelled`,
                notify_url: `${window.location.origin}/api/payfast-itn`,
            };

            const payfastResponse = await createPayfastPaymentIdentifier(payfastDetails);

            if (payfastResponse.success && payfastResponse.uuid) {
                if (window.payfast && window.payfast.onsite) {
                    window.payfast.onsite.process({
                        uuid: payfastResponse.uuid,
                        onComplete: (uuid: string) => {
                            // Payment completed, redirect to success page
                            window.location.href = payfastDetails.return_url;
                        },
                        onCancel: () => {
                            // Payment cancelled, redirect to cancel page
                            window.location.href = payfastDetails.cancel_url;
                        },
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Payfast script not loaded. Please try again.",
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Payment Error",
                    description: payfastResponse.message || "Failed to initiate payment with Payfast.",
                    variant: "destructive",
                });
            }
        } catch (payfastError: any) {
            console.error("Payfast initiation error:", payfastError);
            toast({
                title: "Payment Error",
                description: payfastError.message || "An unexpected error occurred during payment initiation.",
                variant: "destructive",
            });
        }
    });
  }
  
  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  if (!user) {
    return (
        <div className="text-center p-8 bg-secondary rounded-lg border">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Please Log In</h3>
            <p className="text-muted-foreground mb-6">You need to be logged in to place an order.</p>
            <Button asChild>
                <Link href={`/login?redirect=${pathname}#order-form`}>Log In or Sign Up</Link>
            </Button>
        </div>
    )
  }

  if (showThankYou) {
    return (
        <div className="text-center p-8 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-success mb-2">Thank You For Your Order!</h3>
            <p className="text-muted-foreground">Your payment was successful. You will receive a password and a redirect link via email shortly. An agent will also contact you to confirm the details.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body">
        
        <FormField
          control={form.control}
          name="serviceTier"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-bold">1. Select Delivery Speed</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {Object.entries(serviceTiers).map(([key, value]) => (
                    <FormItem key={key}>
                       <Label className="flex flex-col items-center justify-center text-center gap-2 cursor-pointer rounded-lg border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors h-full">
                            <FormControl>
                                <RadioGroupItem value={key} />
                            </FormControl>
                            <span className="font-bold text-base text-foreground">{key}</span>
                            <span className="font-normal text-sm text-muted-foreground">{value.time}</span>
                            <span className="font-bold text-base text-primary mt-2">
                                R{value.price.toLocaleString('en-ZA')}
                            </span>
                       </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
            <Label className="text-lg font-bold">2. Your Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl><Input placeholder="John" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="surname" render={({ field }) => ( <FormItem> <FormLabel>Surname</FormLabel> <FormControl><Input placeholder="Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="company" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@company.com" {...field} type="email" readOnly /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Contact Number</FormLabel> <FormControl><Input placeholder="082 123 4567" {...field} type="tel"/></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
        </div>

        <div>
            <Label className="text-lg font-bold">3. Upload Documents</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField control={form.control} name="companyLogo" render={({ field: { value, onChange, ...fieldProps } }) => ( 
                    <FormItem> 
                        <FormLabel>Company Logo</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input id="companyLogo" type="file" accept="image/*" className="h-12 pl-12" onChange={e => onChange(e.target.files)} {...fieldProps} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground pointer-events-none"><Upload className="h-5 w-5"/></div>
                            </div>
                        </FormControl>
                        <FormMessage />
                         {watchCompanyLogo?.[0] && <p className="text-sm text-muted-foreground">File: {watchCompanyLogo[0].name}</p>}
                    </FormItem> 
                )}/>
                <FormField control={form.control} name="fileIndex" render={({ field: { value, onChange, ...fieldProps } }) => ( 
                    <FormItem> 
                        <FormLabel>Safety File Index</FormLabel>
                        <FormControl>
                             <div className="relative">
                                <Input id="fileIndex" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" className="h-12 pl-12" onChange={e => onChange(e.target.files)} {...fieldProps} />
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground pointer-events-none"><Upload className="h-5 w-5"/></div>
                            </div>
                        </FormControl> 
                        <FormMessage />
                        {watchFileIndex?.[0] && <p className="text-sm text-muted-foreground">File: {watchFileIndex[0].name}</p>}
                    </FormItem> 
                )}/>
            </div>
        </div>

        <Alert variant="default" className="bg-primary/10 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-bold text-primary">Total Amount Due</AlertTitle>
          <AlertDescription className="text-2xl font-extrabold text-foreground">
            R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </AlertDescription>
        </Alert>

        <div className="flex justify-end space-x-4">
            <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Processing..." : "Accept & Pay"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
