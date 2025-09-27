
"use client";

import { BookingForm } from "@/components/booking-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Clock, Phone, UserCheck, CalendarDays } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const VantaBackground = dynamic(() => import("@/components/vanta-background"), {
  ssr: false,
});


// export const metadata: Metadata = { // Metadata must be defined in a server component
//   title: 'Book a Certified Safety Officer',
//   description: 'Get an instant quote and book a certified safety professional for your specific project needs. Fast, transparent, and compliant.',
// };

const howItWorksSteps = [
    {
        icon: <CalendarDays className="h-8 w-8 text-primary" />,
        title: "1. Fill Out the Form",
        description: "Select your service and dates. Standard bookings must be made at least 3 days in advance."
    },
    {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: "2. Need Urgent Help?",
        description: "For emergencies, select the 'Emergency Booking' option. A once-off fee applies for rapid deployment."
    },
    {
        icon: <Phone className="h-8 w-8 text-primary" />,
        title: "3. Confirmation Call",
        description: "After processing your request, an agent will call you within the hour to confirm details and finalize payment."
    },
    {
        icon: <UserCheck className="h-8 w-8 text-primary" />,
        title: "4. Meet Your Officer",
        description: "We'll connect you directly with your assigned safety officer to ensure a smooth start on-site."
    }
]

export default function RentASafetyOfficerPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Header Section */}
      <section className="relative py-20 md:py-32 border-b text-white bg-transparent">
        <VantaBackground />
        <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Book Your On-Demand Safety Officer
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Get an instant quote and book a certified safety professional for your specific project needs. Fast, transparent, and compliant.
            </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">How It Works</h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">A simple, streamlined process to get you the expertise you need, fast.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {howItWorksSteps.map(step => (
                    <div key={step.title} className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-primary/10 p-4 rounded-full">
                                {step.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Content & Form Section */}
      <section id="booking-form" className="py-24 bg-card border-t">
        <div className="container max-w-4xl mx-auto px-4">
            <Card className="shadow-xl border bg-card p-2">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl text-foreground font-bold">Book Your Safety Officer</CardTitle>
                <CardDescription className="text-center text-base max-w-2xl mx-auto">
                    Select your required service, choose your dates, and get an instant quote. You'll need to be logged in to complete the booking.
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
