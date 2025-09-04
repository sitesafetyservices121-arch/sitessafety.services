
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
