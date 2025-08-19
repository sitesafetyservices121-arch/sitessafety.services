
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { getComplianceAdvice } from "@/lib/actions";
import { AlertTriangle, Bot, Zap, FileDigit, HardHat, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import type { ComplianceRequest, ComplianceResponse } from "@/ai/schemas";

const FormSchema = z.object({
  scenario: z.string().min(20, {
    message: "Please describe your scenario in at least 20 characters.",
  }),
});

const serviceIcons: { [key: string]: React.ReactNode } = {
    "Rent a Safety Officer": <HardHat className="h-6 w-6 text-primary" />,
    "E-Safety File": <FileDigit className="h-6 w-6 text-primary" />,
    "Safety Management System": <Sparkles className="h-6 w-6 text-primary" />,
}

export function ComplianceAdvisor() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ComplianceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      scenario: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      const response = await getComplianceAdvice(data as ComplianceRequest);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.message || "An unknown error occurred.");
      }
    });
  }

  return (
    <Card className="max-w-4xl mx-auto border-0 shadow-none bg-transparent">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Bot className="h-8 w-8" />
        </div>
        <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">AI Safety Compliance Advisor</CardTitle>
        <CardDescription className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
          Describe your work environment or project, and our AI will instantly analyze it for potential safety risks and recommend the best solutions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Project Scenario</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'We're starting a 3-month construction project for a 5-story office building downtown. We have about 30 workers on site and need to manage our safety paperwork for regular audits.'"
                      className="resize-vertical text-base min-h-[120px] bg-background rounded-xl"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
                <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    <>
                       <Sparkles className="mr-2 h-5 w-5" />
                        Get AI Analysis
                    </>
                )}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="mt-6">
        {isPending && (
             <div className="w-full text-center p-8">
                <div className="flex justify-center items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-lg font-semibold text-muted-foreground">Our AI is analyzing your scenario...</p>
                </div>
             </div>
        )}
        {error && (
            <div className="w-full text-center text-destructive p-8 bg-destructive/10 rounded-md">
                <p><strong>Error:</strong> {error}</p>
            </div>
        )}
        {result && (
          <Card className="w-full bg-card border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">Your AI-Generated Compliance Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-3 text-foreground mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                    Potential Risks Identified
                </h3>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground pl-4">
                  {result.risks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold flex items-center gap-3 text-foreground mb-6">
                    <Zap className="h-6 w-6 text-primary" />
                    Recommended Services
                </h3>
                <div className="space-y-6">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 mt-1">
                         {serviceIcons[rec.serviceName]}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-foreground">{rec.serviceName}</h4>
                            <p className="text-muted-foreground">{rec.reason}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>

               <div className="text-center pt-6">
                  <p className="text-muted-foreground mb-4">Ready to take the next step towards a safer worksite?</p>
                   <Button asChild size="lg">
                        <Link href="/e-safety-file">Request a Free Consultation</Link>
                    </Button>
               </div>

            </CardContent>
          </Card>
        )}
      </CardFooter>
    </Card>
  );
}
