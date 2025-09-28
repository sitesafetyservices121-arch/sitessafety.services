// src/components/booking-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useTransition } from "react";
import { addDays, differenceInCalendarDays, isBefore, startOfToday, format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { submitBooking } from "@/lib/actions";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/auth-context";

import { CalendarIcon, Loader2, Info, CheckCircle, User } from "lucide-react";
import type { DateRange } from "react-day-picker";

// Explicit type with optional minDays
type ServiceOption = {
  price: number;
  per: "day" | "total";
  description: string;
  minDays?: number;
};

// Service definitions
const serviceOptions: Record<string, ServiceOption> = {
  "Normal Site Representation": {
    price: 2300,
    per: "day",
    description:
      "Standard on-site safety officer duties, including paperwork and compliance management.",
  },
  "Specialised Risk Assessment": {
    price: 8500.0,
    per: "total",
    minDays: 3,
    description:
      "In-depth risk assessment for sites, factories, or workshops. Minimum 3 days.",
  },
  "Compliance Audits": {
    price: 12900.0,
    per: "total",
    minDays: 7,
    description:
      "Preparation, presentation, and representation during 1, 2, or 3-year compliance audits. Minimum 7 days.",
  },
  "Incident/Accident Investigation": {
    price: 15500.0,
    per: "total",
    description:
      "Full investigation of incidents/accidents, including legal witness testimony.",
  },
  "ISO Prep and Readiness": {
    price: 13500.0,
    per: "total",
    description:
      "Comprehensive preparation and readiness services for ISO certification.",
  },
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
    from: z.date({ required_error: "A start date is required." }),
    to: z.date({ required_error: "An end date is required." }),
  }),
  isEmergency: z.boolean().default(false),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [total, setTotal] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: { isEmergency: false },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        company: "",
        phone: "",
        siteAddress: "",
        isEmergency: false,
      });
    }
  }, [user, form]);

  const watchService = form.watch("service");
  const watchDates = form.watch("dates");
  const watchIsEmergency = form.watch("isEmergency");

  useEffect(() => {
    let newTotal = 0;
    if (watchService && watchDates?.from && watchDates?.to) {
      const option = serviceOptions[watchService];
      if (option.per === "day") {
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

  const handleServiceChange = (service: ServiceOptionKey) => {
    form.setValue("service", service);
    const option = serviceOptions[service];
    const isEmergency = form.getValues("isEmergency");

    const today = startOfToday();
    const minStandardDate = addDays(today, 3);

    let fromDate = form.getValues("dates.from") as Date | undefined;
    if (!isEmergency && (!fromDate || isBefore(fromDate, minStandardDate))) {
      fromDate = minStandardDate;
    } else if (isEmergency && (!fromDate || isBefore(fromDate, today))) {
      fromDate = today;
    }

    let toDate = form.getValues("dates.to") as Date | undefined;
    if (option.minDays && option.minDays > 0) {
      const minToDate = addDays(fromDate!, option.minDays - 1);
      if (!toDate || isBefore(toDate, minToDate)) {
        toDate = minToDate;
      }
    } else if (!toDate) {
      toDate = fromDate!;
    }

    form.setValue("dates", { from: fromDate!, to: toDate! }, { shouldValidate: true });
  };

  const handleEmergencyToggle = (isEmergency: boolean) => {
    form.setValue("isEmergency", isEmergency);
    const service = form.getValues("service");
    if (!service) return;

    let { from, to } = (form.getValues("dates") || {}) as DateRange;
    const today = startOfToday();
    const minStandardDate = addDays(today, 3);

    if (!isEmergency && (!from || isBefore(from, minStandardDate))) {
      from = minStandardDate;
    } else if (isEmergency && (!from || isBefore(from, today))) {
      from = today;
    }

    if (from && to && isBefore(to, from)) {
      to = from;
    }

    form.setValue("dates", { from: from!, to: to! }, { shouldValidate: true });
  };

  async function onSubmit(data: BookingFormValues) {
    startTransition(async () => {
      const submissionData = { ...data, total };
      const result: { success: boolean; message?: string } = await submitBooking(submissionData);
      if (result.success) {
        setShowThankYou(true);
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  if (loading) return <div className="text-center p-8">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg border">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Please Log In</h3>
        <p className="text-muted-foreground mb-6">
          You need to be logged in to make a booking.
        </p>
        <Button asChild>
          <Link href={`/login?redirect=${pathname}#booking-form`}>Log In or Sign Up</Link>
        </Button>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="text-center p-8 bg-success/10 rounded-lg border border-success/20">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-success mb-2">
          Thank you for your booking request!
        </h3>
        <p className="text-muted-foreground">
          A representative will contact you shortly to confirm your booking.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body" id="booking-form">
        {/* ... same JSX rendering as before (no changes needed) ... */}
      </form>
    </Form>
  );
}
