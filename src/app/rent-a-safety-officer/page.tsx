import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent a Safety Officer',
};

const serviceFeatures = [
    "Fully certified and experienced professionals",
    "Flexible rental periods (daily, weekly, monthly)",
    "Coverage for various industries (construction, manufacturing, etc.)",
    "On-site risk assessments and safety audits",
    "Incident investigation and reporting",
    "Toolbox talk and safety meeting leadership"
];

export default function RentASafetyOfficerPage() {
  return (
    <div className="container max-w-7xl mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline tracking-tighter">Rent a Safety Officer</h1>
          <p className="text-lg text-muted-foreground font-body">
            Ensure your project meets all safety regulations with our flexible and reliable safety officer rental service. Get qualified professionals on-site when you need them, without the overhead of a full-time hire.
          </p>
          <div className="space-y-4 pt-4">
              {serviceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-body text-foreground">{feature}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        <Card className="shadow-lg border bg-card sticky top-24">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-foreground font-headline">Book Your Safety Officer</CardTitle>
             <CardDescription className="text-center font-body">Complete the form to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
