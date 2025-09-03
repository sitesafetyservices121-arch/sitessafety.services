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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitInquiry } from "@/lib/actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  businessSize: z.enum(["smb", "large"], {
    required_error: "You need to select a business size.",
  }),
  message: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export function InquiryForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: InquiryFormValues) {
    startTransition(async () => {
        const result = await submitInquiry(data);
        if (result.success) {
            toast({
                title: "Inquiry Sent!",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="082 123 4567" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="businessSize"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Your Plan</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  <FormItem>
                     <Label className="flex items-center gap-4 cursor-pointer rounded-lg border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary w-full transition-colors">
                        <FormControl>
                          <RadioGroupItem value="smb" />
                        </FormControl>
                        <span className="font-medium">
                          SMB Plan
                        </span>
                     </Label>
                  </FormItem>
                  <FormItem>
                     <Label className="flex items-center gap-4 cursor-pointer rounded-lg border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary w-full transition-colors">
                        <FormControl>
                          <RadioGroupItem value="large" />
                        </FormControl>
                         <span className="font-medium">
                            Enterprise Plan
                        </span>
                     </Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your project needs"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </form>
    </Form>
  );
}
