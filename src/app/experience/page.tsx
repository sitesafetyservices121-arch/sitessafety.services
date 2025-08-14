import { Card, CardContent } from "@/components/ui/card";
import { TestimonialCard } from "@/components/testimonial-card";
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function ExperiencePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold font-headline tracking-tight text-primary-dark">
            Proven Expertise, Trusted Results
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            We have a track record of successfully implementing safety solutions across diverse and challenging projects, delivering excellence every time.
          </p>
        </div>
      </section>

      {/* Project Portfolio Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary-dark font-headline mb-16">Project Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {portfolio.map((item) => (
                  <Card key={item.title} className="overflow-hidden group border shadow-sm rounded-md bg-card">
                      <CardContent className="p-0">
                          <div className="relative h-80 w-full">
                              <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-500 group-hover:scale-105" data-ai-hint={item.hint}/>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 p-6">
                                  <h3 className="text-2xl font-headline font-semibold text-white">{item.title}</h3>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary-dark font-headline mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
            <div className="bg-primary rounded-md p-10 md:p-16 text-center shadow-md">
                <h2 className="text-3xl md:text-4xl font-semibold font-headline text-primary-foreground">Ready to Elevate Your Site's Safety?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/90 font-body text-lg">Let's collaborate to build a safer, more compliant, and more productive work environment. Contact us today for a complimentary consultation.</p>
                <Button asChild size="lg" className="mt-8 bg-card text-primary-dark hover:bg-card/90">
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
