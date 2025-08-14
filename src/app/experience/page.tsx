import { Card, CardContent } from "@/components/ui/card";
import { TestimonialCard } from "@/components/testimonial-card";
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Experience',
};

const testimonials = [
  { name: "Sarah Williams", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Highly recommended!", rating: 5 },
  { name: "David Chen", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant. The process was smooth and efficient.", rating: 5 },
  { name: "Emily Rodriguez", title: "Operations Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents.", rating: 4 },
];

const portfolio = [
    { title: "High-Rise Commercial Tower", image: "https://placehold.co/600x400.png", hint: "construction building" },
    { title: "Industrial Manufacturing Plant", image: "https://placehold.co/600x400.png", hint: "industrial factory" },
    { title: "Metropolitan Subway Expansion", image: "https://placehold.co/600x400.png", hint: "subway construction" },
    { title: "Renewable Energy Wind Farm", image: "https://placehold.co/600x400.png", hint: "wind farm" },
];

export default function ExperiencePage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">Proven Expertise, Trusted Results</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We have a track record of successfully implementing safety solutions across diverse and challenging projects.
        </p>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Project Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolio.map((item) => (
                <Card key={item.title} className="overflow-hidden group">
                    <CardContent className="p-0">
                        <div className="relative h-64 w-full">
                            <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
