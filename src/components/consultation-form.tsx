
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { submitConsultation } from "@/lib/actions";
import { useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const consultationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  companyName: z.string().min(2, "Company name is required."),
  domainName: z.string().min(3, "Please enter a valid domain name.").optional().or(z.literal('')),
  desiredLogins: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: "Please enter a valid number." }),
  plan: z.enum(["Small to Medium", "Large Enterprise", "Custom Enterprise"], {
    required_error: "You must select a plan.",
  }),
  consultationDate: z.date({ required_error: "A consultation date is required."}),
  consultationTime: z.string({ required_error: "A consultation time is required."}),
  contactMethod: z.string({ required_error: "Please select a contact method."}),
});

type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

export function ConsultationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showThankYou, setShowThankYou] = useState(false);

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        companyName: "",
        domainName: "",
        desiredLogins: "1",
    },
  });

  function onSubmit(data: ConsultationFormValues) {
    startTransition(async () => {
        const result = await submitConsultation(data);
        if (result.success) {
            setShowThankYou(true);
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

  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${period}`;
  });

  if (showThankYou) {
    return (
        <div className="text-center p-8 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your consultation request has been received. A representative will contact you at your selected time.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body">
        
        {/* Plan Selection */}
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-bold">1. Select Your Plan</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Small to Medium", "Large Enterprise", "Custom Enterprise"].map(plan => (
                    <FormItem key={plan}>
                       <Label className="flex items-center justify-center gap-4 cursor-pointer rounded-lg border p-4 h-full has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                          <FormControl><RadioGroupItem value={plan} /></FormControl>
                          <span className="font-medium text-center">{plan}</span>
                       </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Company Details */}
        <div>
            <Label className="text-lg font-bold">2. Company Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField control={form.control} name="companyName" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="domainName" render={({ field }) => ( <FormItem> <FormLabel>Desired Domain (Optional)</FormLabel> <FormControl><Input placeholder="yourcompany.sitesafety.services" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="desiredLogins" render={({ field }) => ( <FormItem> <FormLabel>Number of Logins</FormLabel> <FormControl><Input type="number" min="1" placeholder="e.g., 5" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
        </div>

        {/* Contact Details */}
        <div>
            <Label className="text-lg font-bold">3. Your Contact Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@company.com" {...field} type="email" /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input placeholder="082 123 4567" {...field} type="tel"/></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
        </div>

        {/* Consultation Scheduling */}
        <div>
            <Label className="text-lg font-bold">4. Schedule Consultation</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="consultationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full justify-start text-left font-normal h-12 text-base", !field.value && "text-muted-foreground")}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="consultationTime"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="h-12 text-base">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="contactMethod"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                        <FormLabel>Preferred Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="h-12 text-base">
                                <SelectValue placeholder="Select a contact method" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Phone Call">Phone Call</SelectItem>
                                <SelectItem value="Zoom Meeting">Zoom Meeting</SelectItem>
                                <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                                <SelectItem value="Google Meet">Google Meet</SelectItem>
                                <SelectItem value="Skype">Skype</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
            </div>
        </div>

        <div className="flex justify-end pt-4">
            <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : "Book My Consultation"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
