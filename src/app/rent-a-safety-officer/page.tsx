import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Shield, Briefcase, Calendar } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent a Safety Officer',
};

const serviceFeatures = [
    { 
        icon: <Shield className="h-7 w-7 text-accent" />,
        title: "Certified Professionals",
        description: "Fully certified and experienced officers ready to deploy." 
    },
    { 
        icon: <Calendar className="h-7 w-7 text-accent" />,
        title: "Flexible Rental Periods",
        description: "Hire for a day, a week, a month, or for the entire project duration."
    },
    { 
        icon: <Briefcase className="h-7 w-7 text-accent" />,
        title: "Multi-Industry Coverage",
        description: "Expertise in construction, manufacturing, energy, and more."
    },
    { 
        icon: <CheckCircle className="h-7 w-7 text-accent" />,
        title: "Comprehensive Duties",
        description: "On-site audits, incident reporting, safety meetings, and toolbox talks."
    }
];

export default function RentASafetyOfficerPage() {
  return (
    <div className="bg-background text-foreground">
       {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold font-headline tracking-tight text-primary">
            On-Demand Safety Expertise
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Ensure your project meets all safety regulations with our flexible and reliable safety officer rental service. Get qualified professionals on-site when you need them.
          </p>
        </div>
      </section>

      {/* Content & Form Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Features */}
            <div className="space-y-10">
              <h2 className="text-3xl md:text-4xl font-semibold font-headline text-primary">
                Flexible, Reliable, Certified
              </h2>
              <div className="space-y-8">
                  {serviceFeatures.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4">
                          <div className="flex-shrink-0 bg-secondary text-accent rounded-lg p-3 border border-border">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="font-headline text-xl font-semibold text-primary">{feature.title}</h3>
                            <p className="font-body text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
            </div>

            {/* Booking Form */}
            <Card className="shadow-2xl border-border bg-card sticky top-24 p-2">
              <CardHeader>
                <CardTitle className="text-center text-3xl text-primary font-headline">Book Your Safety Officer</CardTitle>
                <CardDescription className="text-center font-body text-base">Complete the form to get a fast, no-obligation quote.</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
