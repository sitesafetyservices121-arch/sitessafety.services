
"use client";

import { useForm, Controller } from "react-hook-form";
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
import { CalendarIcon, Loader2, Info, CheckCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { submitBooking } from "@/lib/actions";
import { useState, useTransition, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addDays, differenceInCalendarDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";

const serviceOptions = {
    "Normal Site Representation": {
        price: 2300,
        per: "day",
        description: "Standard on-site safety officer duties, including paperwork and compliance management."
    },
    "Specialised Risk Assessment": {
        price: 8500.00,
        per: "total",
        minDays: 3,
        description: "In-depth risk assessment for sites, factories, or workshops. Minimum 3 days."
    },
    "Compliance Audits": {
        price: 12900.00,
        per: "total",
        minDays: 7,
        description: "Preparation, presentation, and representation during 1, 2, or 3-year compliance audits. Minimum 7 days."
    },
    "Incident/Accident Investigation": {
        price: 15500.00,
        per: "total",
        description: "Full investigation of incidents/accidents, including legal witness testimony."
    },
    "ISO Prep and Readiness": {
        price: 13500.00,
        per: "total",
        description: "Comprehensive preparation and readiness services for ISO certification."
    }
};

const emergencyFee = 1800;

type ServiceOptionKey = keyof typeof serviceOptions;

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().min(2, "Company name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  siteAddress: z.string().min(10, "Please provide a full site address."),
  service: z.enum(Object.keys(serviceOptions) as [ServiceOptionKey, ...ServiceOptionKey[]], {
    required_error: "You must select a service.",
  }),
  dates: z.object({
      from: z.date({ required_error: "A start date is required."}),
      to: z.date({ required_error: "An end date is required."}),
  }),
  isEmergency: z.boolean().default(false),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [total, setTotal] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      siteAddress: "",
      isEmergency: false,
    },
  });

  const watchService = form.watch("service");
  const watchDates = form.watch("dates");
  const watchIsEmergency = form.watch("isEmergency");

  useEffect(() => {
    let newTotal = 0;
    if (watchService && watchDates?.from && watchDates?.to) {
        const option = serviceOptions[watchService];
        if (option.per === 'day') {
            const days = differenceInCalendarDays(watchDates.to, watchDates.from) + 1;
            newTotal = days * option.price;
        } else {
            newTotal = option.price;
        }
    }
    if (watchIsEmergency) {
        newTotal += emergencyFee;
    }
    setTotal(newTotal);
  }, [watchService, watchDates, watchIsEmergency]);

  useEffect(() => {
    if (watchService) {
      const option = serviceOptions[watchService];
      const currentDates = form.getValues('dates');
      if (option.minDays && currentDates?.from) {
        let minDate = addDays(new Date(), 2);
        let fromDate = currentDates.from;

        if (watchIsEmergency) {
          minDate = new Date();
        } else {
          if (fromDate < minDate) {
            fromDate = minDate;
            form.setValue('dates.from', fromDate);
          }
        }
        
        const newToDate = addDays(fromDate, option.minDays - 1);
        if (!currentDates.to || currentDates.to < newToDate) {
          form.setValue('dates.to', newToDate);
        }
      }
    }
  }, [watchService, form, watchDates?.from, watchIsEmergency]);


  function onSubmit(data: BookingFormValues) {
    startTransition(async () => {
        const submissionData = {...data, total};
        const result = await submitBooking(submissionData);
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

  if (showThankYou) {
    return (
        <div className="text-center p-8 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-success mb-2">Thank you for your booking request!</h3>
            <p className="text-muted-foreground">A representative will contact you shortly to confirm your booking.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body">
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-bold">1. Select a Service</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {Object.entries(serviceOptions).map(([key, value]) => (
                    <FormItem key={key}>
                       <Label className="flex flex-col gap-2 cursor-pointer rounded-lg border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors h-full">
                          <div className="flex items-center gap-4">
                            <FormControl>
                                <RadioGroupItem value={key} />
                            </FormControl>
                            <span className="font-bold text-base text-foreground">
                                {key}
                            </span>
                          </div>
                          <p className="font-normal text-sm text-muted-foreground pl-8">{value.description}</p>
                          <p className="font-bold text-base text-primary pl-8 mt-auto">
                            R{value.price.toLocaleString('en-ZA')} {value.per === 'day' ? '/ day' : ''}
                          </p>
                       </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-bold">2. Select Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 text-base",
                        !field.value?.from && "text-muted-foreground"
                      )}
                      disabled={!watchService}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} to{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick your dates</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={(date) => {
                      if (watchIsEmergency) {
                        return date < new Date(new Date().setDate(new Date().getDate() - 1));
                      }
                      return date < addDays(new Date(), 2);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isEmergency"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4 space-y-0 rounded-lg border p-4 bg-amber-500/10 border-amber-500/20">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-0.5 leading-none">
                <FormLabel className="font-bold text-amber-900 dark:text-amber-300">
                  Emergency Booking?
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Select this for bookings required within the next 3 days. A once-off fee of R{emergencyFee.toLocaleString('en-ZA')} will apply.
                </p>
              </div>
            </FormItem>
          )}
        />

        <div>
            <Label className="text-lg font-bold">3. Your Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input placeholder="John Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="company" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@company.com" {...field} type="email" /></FormControl> <FormMessage /> </FormItem> )}/>
              <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl><Input placeholder="082 123 4567" {...field} type="tel"/></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
             <div className="mt-6">
                <FormField control={form.control} name="siteAddress" render={({ field }) => ( <FormItem> <FormLabel>Full Site Address</FormLabel> <FormControl><Textarea placeholder="e.g., 123 Construction Ave, Industrial Park, Johannesburg" className="resize-none" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
             </div>
        </div>

        <Alert variant="default" className="bg-primary/10 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-bold text-primary">Estimated Total</AlertTitle>
          <AlertDescription className="text-2xl font-extrabold text-foreground">
            R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </AlertDescription>
        </Alert>

        <div className="flex justify-end space-x-4">
            <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isPending || total === 0}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Processing..." : "Accept & Request Booking"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
