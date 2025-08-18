import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Shield, Briefcase, Calendar } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent a Certified Safety Officer',
  description: 'Ensure project compliance with our flexible safety officer rental service. Get qualified, on-demand professionals on-site when you need them.',
};

const serviceFeatures = [
    { 
        icon: <Shield className="h-7 w-7 text-primary" />,
        title: "Certified Professionals",
        description: "Fully certified and experienced officers ready to deploy." 
    },
    { 
        icon: <Calendar className="h-7 w-7 text-primary" />,
        title: "Flexible Rental Periods",
        description: "Hire for a day, a week, a month, or for the entire project duration."
    },
    { 
        icon: <Briefcase className="h-7 w-7 text-primary" />,
        title: "Multi-Industry Coverage",
        description: "Expertise in construction, manufacturing, energy, and more."
    },
    { 
        icon: <Zap className="h-7 w-7 text-primary" />,
        title: "Comprehensive Duties",
        description: "On-site audits, incident reporting, safety meetings, and toolbox talks."
    }
];

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
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Flexible, Reliable, Certified
              </h2>
              <div className="space-y-8">
                  {serviceFeatures.map((feature) => (
                      <div key={feature.title} className="flex items-start gap-4">
                          <div className="flex-shrink-0 bg-primary/10 text-primary rounded-xl p-3 shadow-sm border">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
            </div>

            {/* Booking Form */}
            <Card className="shadow-xl border bg-card sticky top-24 p-2">
              <CardHeader>
                <CardTitle className="text-center text-3xl text-foreground font-bold">Book Your Safety Officer</CardTitle>
                <CardDescription className="text-center text-base">Complete the form to get a fast, no-obligation quote.</CardDescription>
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
