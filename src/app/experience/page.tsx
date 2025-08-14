import { Card, CardContent } from "@/components/ui/card";
import { TestimonialCard } from "@/components/testimonial-card";
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Our Experience',
};

const testimonials = [
  { name: "Sarah Williams", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Highly recommended!", rating: 5, image: "https://placehold.co/100x100.png" },
  { name: "David Chen", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant. The process was smooth and efficient.", rating: 5, image: "https://placehold.co/100x100.png" },
  { name: "Emily Rodriguez", title: "Operations Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents.", rating: 4, image: "https://placehold.co/100x100.png" },
];

const portfolio = [
    { title: "High-Rise Commercial Tower", image: "https://placehold.co/600x400.png", hint: "construction building" },
    { title: "Industrial Manufacturing Plant", image: "https://placehold.co/600x400.png", hint: "industrial factory" },
    { title: "Metropolitan Subway Expansion", image: "https://placehold.co/600x400.png", hint: "subway construction" },
    { title: "Renewable Energy Wind Farm", image: "https://placehold.co/600x400.png", hint: "wind farm" },
];

export default function ExperiencePage() {
  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline">Proven Expertise, Trusted Results</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto font-body">
          We have a track record of successfully implementing safety solutions across diverse and challenging projects.
        </p>
      </div>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">Project Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {portfolio.map((item) => (
                <Card key={item.title} className="overflow-hidden group border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-0">
                        <div className="relative h-72 w-full">
                            <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-xl font-headline font-bold text-white transition-colors">{item.title}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 rounded-xl p-10 md:p-16 text-center">
        <h2 className="text-3xl font-bold font-headline text-foreground">Ready to improve your site's safety?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground font-body">Let's work together to create a safer, more compliant work environment. Contact us for a free consultation.</p>
        <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/80 text-accent-foreground font-body font-bold rounded-full text-base">
          <Link href="/e-safety-file">
            Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
