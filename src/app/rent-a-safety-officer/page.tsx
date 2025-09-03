
import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Certified Safety Officer',
  description: 'Get an instant quote and book a certified safety professional for your specific project needs. Fast, transparent, and compliant.',
};

export default function RentASafetyOfficerPage() {
  return (
    <div className="bg-background text-foreground">
       {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            On-Demand Safety Expertise
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ensure your project meets all safety regulations with our flexible and reliable safety officer rental service. Get a transparent quote and book qualified professionals in minutes.
          </p>
        </div>
      </section>
      
      {/* Content & Form Section */}
      <section id="booking-form" className="py-24">
        <div className="container max-w-4xl mx-auto px-4">
            <Card className="shadow-xl border bg-card p-2">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl text-foreground font-bold">Book Your Safety Officer</CardTitle>
                <CardDescription className="text-center text-base max-w-2xl mx-auto">
                    Select your required service, choose your dates, and get an instant quote. Complete the form to finalize your booking request.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BookingForm />
            </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
