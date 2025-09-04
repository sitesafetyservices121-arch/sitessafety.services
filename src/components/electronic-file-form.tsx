
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const serviceOptions = {
    "Standard": 2200.00,
    "Express": 2800.00
};

type ServiceOptionKey = keyof typeof serviceOptions;

const electronicFileFormSchema = z.object({
  name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.enum(Object.keys(serviceOptions) as [ServiceOptionKey, ...ServiceOptionKey[]], {
    required_error: "You must select a service option.",
  }),
  companyLogo: z.any().refine(files => files?.length > 0, "Company logo is required."),
  fileIndex: z.any().refine(files => files?.length > 0, "File index is required."),
});

type ElectronicFileFormValues = z.infer<typeof electronicFileFormSchema>;

export function ElectronicFileForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [total, setTotal] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const form = useForm<ElectronicFileFormValues>({
    resolver: zodResolver(electronicFileFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      company: "",
      phone: "",
      service: "Standard",
    },
  });

  const watchService = form.watch("service");
  const watchCompanyLogo = form.watch("companyLogo");
  const watchFileIndex = form.watch("fileIndex");

  useEffect(() => {
    setTotal(serviceOptions[watchService]);
  }, [watchService]);

  function onSubmit(data: ElectronicFileFormValues) {
    startTransition(async () => {
        // In a real app, you would handle file uploads to a storage service.
        // For this simulation, we'll just use the file names.
        const submissionData = {
            ...data,
            total,
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
            <p className="text-muted-foreground">Your payment was successful and your files have been received. We will process your order and be in touch shortly.</p>
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
              <FormLabel className="text-lg font-bold">1. Choose Service Speed</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                       <Label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-lg border p-4 h-full has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                          <div className="flex items-center gap-4">
                             <FormControl><RadioGroupItem value="Standard" /></FormControl>
                             <div className="text-center">
                                 <p className="font-bold text-base text-foreground">Standard (24 Hours)</p>
                                 <p className="font-bold text-lg text-primary">R2200.00</p>
                            </div>
                          </div>
                       </Label>
                  </FormItem>
                  <FormItem>
                       <Label className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-lg border p-4 h-full has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <FormControl><RadioGroupItem value="Express" /></FormControl>
                                 <div className="text-center">
                                     <p className="font-bold text-base text-foreground">Express (&lt;12 Hours)</p>
                                     <p className="font-bold text-lg text-primary">R2800.00</p>
                                </div>
                           </div>
                       </Label>
                  </FormItem>
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
            <Button type="submit" className="w-full md:w-auto" size="lg" disabled={isPending || total === 0}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Processing..." : "Process Payment & Upload"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
