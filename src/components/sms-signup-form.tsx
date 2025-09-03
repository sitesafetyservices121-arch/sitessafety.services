
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
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const smsSignupFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  age: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Please enter a valid age." }),
  cellNumber: z.string().min(10, { message: "Please enter a valid cell number." }),
});

type SmsSignupFormValues = z.infer<typeof smsSignupFormSchema>;

export function SmsSignupForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

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

  function onSubmit(data: SmsSignupFormValues) {
    startTransition(async () => {
        const result = await submitSmsSignup(data);
        if (result.success) {
            toast({
                title: "Signup Successful!",
                description: result.message,
                className: 'bg-primary text-primary-foreground',
            });
            form.reset();
        } else {
            toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
            });
        }
    });
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
                <Input placeholder="you@company.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
