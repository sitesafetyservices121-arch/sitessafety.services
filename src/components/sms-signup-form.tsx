
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
import { submitSmsSignup } from "@/lib/actions";
import { useTransition, useEffect, useState } from "react";
import { Loader2, User, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

const smsSignupFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }).optional(),
  age: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Please enter a valid age." }),
  cellNumber: z.string().min(10, { message: "Please enter a valid cell number." }),
}).refine(data => {
    // This logic is now handled inside the component based on provider.
    return true;
});

type SmsSignupFormValues = z.infer<typeof smsSignupFormSchema>;

export function SmsSignupForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showThankYou, setShowThankYou] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const isGoogleUser = user?.providerData.some(p => p.providerId === 'google.com');

  const form = useForm<SmsSignupFormValues>({
    resolver: zodResolver(smsSignupFormSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      company: "",
      email: "",
      password: "",
      age: "",
      cellNumber: "",
    },
  });

  useEffect(() => {
    if (user) {
        form.setValue('email', user.email || '');
        const nameParts = user.displayName?.split(' ') || [];
        form.setValue('firstName', nameParts[0] || '');
        form.setValue('surname', nameParts.slice(1).join(' ') || '');
    }
  }, [user, form]);

  function onSubmit(data: SmsSignupFormValues) {
    startTransition(async () => {
        const result = await submitSmsSignup(data);
        if (result.success) {
            setShowThankYou(true);
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
    });
  }
  
  if (loading) {
    return <div className="text-center p-8"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></div>
  }

  if (!user) {
    return (
        <div className="text-center p-8 bg-secondary rounded-lg border">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Please Log In</h3>
            <p className="text-muted-foreground mb-6">You need to create an account to sign up for the Safety Management System.</p>
            <Button asChild>
                <Link href={`/login?redirect=${pathname}`}>Log In or Sign Up</Link>
            </Button>
        </div>
    )
  }

  if (showThankYou) {
    return (
        <div className="text-center p-8 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-success mb-2">Signup Request Sent!</h3>
            <p className="text-muted-foreground">An agent will contact you shortly to finalize your account setup and payment. You will receive access within 15 minutes of confirmation.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="you@company.com" {...field} type="email" readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isGoogleUser && (
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input placeholder="********" {...field} type="password" required />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., 35" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="cellNumber"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Cell Number</FormLabel>
                    <FormControl>
                    <Input placeholder="082 123 4567" {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        
        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Processing..." : "Complete Signup"}
        </Button>
      </form>
    </Form>
  );
}
