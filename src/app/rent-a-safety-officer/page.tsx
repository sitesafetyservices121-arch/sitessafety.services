import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">Rent a Safety Officer</h1>
          <p className="text-lg text-muted-foreground">
            Ensure your project meets all safety regulations with our flexible and reliable safety officer rental service. Get qualified professionals on-site when you need them, without the overhead of a full-time hire.
          </p>
          <Card className="bg-white dark:bg-card">
              <CardHeader>
                  <CardTitle className="text-primary">Service Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-3">
                      {serviceFeatures.map((feature, index) => (
                          <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                          </li>
                      ))}
                  </ul>
              </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">Book Your Safety Officer</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
