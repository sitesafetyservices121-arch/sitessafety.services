
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
import { submitElectronicFileOrder } from "@/lib/actions";
import { useState, useTransition, useEffect } from "react";
import { Info, Loader2, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const pricePerFile = 1850.00;

const electronicFileFormSchema = z.object({
  name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  companyLogo: z.any().refine(files => files?.length > 0, "Company logo is required."),
  fileIndex: z.any().refine(files => files?.length > 0, "File index is required."),
});

type ElectronicFileFormValues = z.infer<typeof electronicFileFormSchema>;

export function ElectronicFileForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showThankYou, setShowThankYou] = useState(false);

  const form = useForm<ElectronicFileFormValues>({
    resolver: zodResolver(electronicFileFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      company: "",
      email: "",
      phone: "",
    },
  });

  const watchCompanyLogo = form.watch("companyLogo");
  const watchFileIndex = form.watch("fileIndex");

  function onSubmit(data: ElectronicFileFormValues) {
    startTransition(async () => {
        // In a real app, you would handle file uploads to a storage service.
        // For this simulation, we'll just use the file names.
        const submissionData = {
            ...data,
            total: pricePerFile,
            companyLogo: data.companyLogo[0]?.name,
            fileIndex: data.fileIndex[0]?.name,
        };
        const result = await submitElectronicFileOrder(submissionData);
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
        <div className="text-center p-8 bg-primary/10 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">Thank You For Your Order!</h3>
            <p className="text-muted-foreground">Your payment was successful. You will receive a password and a redirect link via email shortly. An agent will also contact you to confirm the details.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body">
        
        <div>
            <Label className="text-lg font-bold">1. Your Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl><Input placeholder="John" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="surname" render={({ field }) => ( <FormItem> <FormLabel>Surname</FormLabel> <FormControl><Input placeholder="Doe" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="company" render={({ field }) => ( <FormItem> <FormLabel>Company Name</FormLabel> <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl><Input placeholder="you@company.com" {...field} type="email" /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Contact Number</FormLabel> <FormControl><Input placeholder="082 123 4567" {...field} type="tel"/></FormControl> <FormMessage /> </FormItem> )}/>
            </div>
        </div>

        <div>
            <Label className="text-lg font-bold">2. Upload Documents</Label>
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
            R{pricePerFile.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
