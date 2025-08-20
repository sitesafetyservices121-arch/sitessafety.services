
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialCard } from "@/components/testimonial-card";
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Award, Building2, HardHat, ShieldCheck, Factory, Truck, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: 'Proven Experience & Client Success',
  description: 'Explore our portfolio of successful projects and read testimonials from satisfied clients across various industries.',
};

const testimonials = [
  { name: "Sarah Williams", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Their proactive approach prevented numerous issues. Highly recommended for any large-scale project!", rating: 5, image: "https://placehold.co/100x100.png", hint: "female professional" },
  { name: "David Chen", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant for a critical audit. The process was smooth, efficient, and utterly professional.", rating: 5, image: "https://placehold.co/100x100.png", hint: "male ceo" },
  { name: "Emily Rodriguez", title: "Ops Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents and a huge boost in employee engagement.", rating: 5, image: "https://placehold.co/100x100.png", hint: "female director" },
];

const portfolio = [
    { title: "High-Rise Commercial Tower", image: "https://placehold.co/800x600.png", hint: "skyscraper construction" },
    { title: "Industrial Manufacturing Plant", image: "https://placehold.co/800x600.png", hint: "modern factory interior" },
    { title: "Metropolitan Subway Expansion", image: "https://placehold.co/800x600.png", hint: "tunnel construction site" },
    { title: "Renewable Energy Wind Farm", image: "https://placehold.co/800x600.png", hint: "wind turbines field" },
];

const stats = [
    { icon: <Award className="h-10 w-10 text-primary" />, value: "10+", label: "Years in Business" },
    { icon: <HardHat className="h-10 w-10 text-primary" />, value: "500+", label: "Projects Completed" },
    { icon: <ShieldCheck className="h-10 w-10 text-primary" />, value: "100%", label: "Audit Pass Rate" },
    { icon: <Building2 className="h-10 w-10 text-primary" />, value: "12+", label: "Industries Served" },
];

const industries = [
    { icon: <HardHat className="h-8 w-8 text-primary" />, name: "Construction" },
    { icon: <Factory className="h-8 w-8 text-primary" />, name: "Manufacturing" },
    { icon: <Truck className="h-8 w-8 text-primary" />, name: "Logistics" },
    { icon: <Wrench className="h-8 w-8 text-primary" />, name: "Engineering" },
];

export default function ExperiencePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Trusted Nationwide for Safety & Compliance
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our track record speaks for itself. We deliver reliable, expert safety solutions that protect your people, projects, and reputation.
          </p>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-24">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat) => (
                      <div key={stat.label} className="text-center p-4 bg-card rounded-2xl shadow-sm border">
                          <div className="flex justify-center items-center mb-4 text-primary w-20 h-20 rounded-full mx-auto bg-primary/10">
                              {stat.icon}
                          </div>
                          <p className="text-4xl md:text-5xl font-extrabold text-primary">{stat.value}</p>
                          <p className="text-muted-foreground font-medium mt-2">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Project Portfolio Section */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">Project Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {portfolio.map((item) => (
                  <Card key={item.title} className="overflow-hidden group border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                      <CardContent className="p-0">
                          <div className="relative h-80 w-full">
                              <Image src={item.image} alt={item.title} fill sizes="100vw" style={{objectFit: 'cover'}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint={item.hint}/>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                              <div className="absolute bottom-0 left-0 p-6">
                                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
       <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">Expertise Across Key Industries</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry) => (
                <div key={industry.name} className="flex flex-col items-center text-center gap-4">
                    <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center border">
                        {industry.icon}
                    </div>
                    <p className="text-lg font-bold text-foreground">{industry.name}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-10 md:p-16 text-center shadow-lg">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">Ready to Elevate Your Site's Safety?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/90 text-lg">Let's collaborate to build a safer, more compliant, and more productive work environment. Contact us today for a complimentary consultation.</p>
                <Button asChild size="lg" className="mt-8 bg-background text-primary hover:bg-background/90">
                  <Link href="/e-safety-file">
                      Request a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

    