
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialCard } from "@/components/testimonial-card";
import Image from "next/image";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Award, Building2, HardHat, ShieldCheck, Factory, Truck, Wrench, DollarSign, Users, CheckCircle, Mountain, Flame, Store, Tractor, Wind, TowerControl, Utensils, Plane, Cpu, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: 'Proven Experience & Client Success',
  description: 'Explore our portfolio of successful projects and read testimonials from satisfied clients across various industries.',
};

const testimonials = [
  { name: "Lerato Khumalo", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Their proactive approach prevented numerous issues. Highly recommended for any large-scale project!", rating: 5, image: "https://iili.io/JADe4mB.png", hint: "professional black woman" },
  { name: "Pieter van der Merwe", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant for a critical audit. The process was smooth, efficient, and professional.", rating: 5, image: "https://iili.io/JADeLp1.png", hint: "professional white man" },
  { name: "Anika Patel", title: "Ops Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents and a huge boost in employee engagement.", rating: 5, image: "https://iili.io/JADeZuG.png", hint: "professional indian woman" },
  { name: "Bongani Zulu", title: "Site Foreman", company: "Gold One Mining", testimonial: "The electronically delivered safety file was a lifesaver. We got our compliant, print-ready documents in less than a day, which kept our project on schedule. The process was incredibly fast and easy.", rating: 5, image: "https://iili.io/JADesol.png", hint: "male construction worker" },
  { name: "Fatima Allie", title: "Compliance Officer", company: "Omnia Foods", testimonial: "RAK's AI-powered Safety Management System is revolutionary. The built-in consultant helps us identify risks we hadn't even considered. It's an essential tool for maintaining our safety standards.", rating: 5, image: "https://iili.io/JADeYXv.png", hint: "professional coloured woman" },
  { name: "Jaco Jacobs", title: "Small Business Owner", company: "JJ Engineering", testimonial: "As a smaller operation, we don't have a dedicated safety department. The instant Legal Document Generator is invaluable for creating compliant HIRAs and method statements quickly and affordably.", rating: 5, image: "https://iili.io/JADejnJ.png", hint: "male engineer" },
  { name: "Sipho Ndlovu", title: "Logistics Manager", company: "Cape Gate Logistics", testimonial: "We rented a safety officer for a complex warehouse setup. The expertise provided was top-notch. They helped us establish safe operating procedures that we still use today. A fantastic service.", rating: 5, image: "https://iili.io/JADe5X7.png", hint: "male logistics manager" },
  { name: "Naledi Ramphele", title: "Head of Operations", company: "Aviation Giants", testimonial: "The thoroughness of the compliance audit RAK-Site Safety Services performed was exceptional. They prepared us for our ISO certification and identified critical areas for improvement. Highly professional.", rating: 5, image: "https://iili.io/JADeKGs.png", hint: "female executive" },
  { name: "Chris Botha", title: "Factory Manager", company: "Sasol Polymers", testimonial: "The Specialised Risk Assessment identified key vulnerabilities in our production line. The detailed report and actionable recommendations have been instrumental in enhancing our operational safety.", rating: 5, image: "https://iili.io/JADeGvF.png", hint: "male factory manager" },
];

const portfolio = [
    { title: "High-Rise Commercial Tower", image: "https://i.ibb.co/rKv0KSNP/image-29.jpg", hint: "skyscraper construction" },
    { title: "Industrial Manufacturing Plant", image: "https://i.ibb.co/4wkRjkxL/image-32.jpg", hint: "industrial plant" },
    { title: "Metropolitan Subway Expansion", image: "https://i.ibb.co/FbCcN8Nq/image-36.jpg", hint: "tunnel construction site" },
    { title: "Renewable Energy Wind Farm", image: "https://i.ibb.co/Y4HJxm8w/image-38.jpg", hint: "wind turbines field" },
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
    { icon: <Mountain className="h-8 w-8 text-primary" />, name: "Mining" },
    { icon: <Flame className="h-8 w-8 text-primary" />, name: "Oil & Gas" },
    { icon: <Store className="h-8 w-8 text-primary" />, name: "Retail" },
    { icon: <Tractor className="h-8 w-8 text-primary" />, name: "Agriculture" },
    { icon: <Wind className="h-8 w-8 text-primary" />, name: "Renewable Energy" },
    { icon: <TowerControl className="h-8 w-8 text-primary" />, name: "Telecoms" },
    { icon: <Utensils className="h-8 w-8 text-primary" />, name: "Food & Beverage" },
    { icon: <Plane className="h-8 w-8 text-primary" />, name: "Aviation" },
];

const clients = [
    "AMSA (Mittal)", "Sasol", "Omnia", "Cape Gate", "Coca-Cola", "Gold One", "Engen", "Denel", "Eskom", "Rand Water", "Conco", "Aviation Giants"
];

const valuePropositions = [
    { 
        icon: <Users className="h-7 w-7 text-primary" />, 
        title: "Why Companies Trust Us", 
        description: "We have proudly partnered with a diverse range of clients, from national construction conglomerates and industrial manufacturing leaders to renewable energy pioneers. They trust us because we do not just enforce rules; we embed a culture of safety that becomes a core part of their operation. Our registered professionals bring verifiable expertise and a proactive mindset, ensuring projects stay compliant, on schedule, and most importantly, safe." 
    },
    { 
        icon: <DollarSign className="h-7 w-7 text-primary" />, 
        title: "The Financial Impact of Safety", 
        description: "Investing in professional safety management is not a cost; it is a high-return investment. By preventing just one serious incident, companies can save hundreds of thousands, if not millions, in direct and indirect costs. Our proactive systems can reduce incident-related costs by up to 40%, delivering a safer site and a healthier bottom line." 
    },
    { 
        icon: <Cpu className="h-7 w-7 text-primary" />, 
        title: "Innovation in Action", 
        description: "Our competitive edge lies in our purpose-built AI. While others manually draft documents, our systems generate legally-aligned, site-specific documentation in a fraction of the time. This allows our certified experts to focus on high-level risk analysis, strategic planning, and hands-on site management, providing you with a faster, more intelligent, and cost-effective service." 
    },
    { 
        icon: <Handshake className="h-7 w-7 text-primary" />, 
        title: "Partnership Approach", 
        description: "We don’t just consult; we integrate. Our goal is to become a seamless extension of your team. We work to transfer knowledge, empower your staff with our AI tools, and build a self-sustaining safety culture. This collaborative approach ensures that safety excellence continues long after a project is complete, saving your business money and building a lasting legacy of safety." 
    },
];

export default function ExperiencePage() {
  return (
    <div className="bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">
            Trusted Nationwide for Safety & Compliance
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our track record speaks for itself. We deliver reliable, expert safety solutions that protect your people, projects, and reputation.
          </p>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-foreground mb-4">Trusted by Industry Leaders</h2>
            <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                We have extensive experience providing safety solutions for some of the biggest names in industry.
            </p>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                    {clients.map(client => (
                        <span key={client} className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary">
                            {client}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Why Companies Trust Us Section */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
            <Card className="max-w-7xl mx-auto bg-transparent p-8 rounded-2xl border-0 shadow-none">
                <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-10">
                        {valuePropositions.map(prop => (
                            <div key={prop.title}>
                                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-4">{prop.icon}{prop.title}</h3>
                                <p className="text-muted-foreground text-lg">{prop.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
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
                              <Image src={item.image} alt={item.title} fill style={{objectFit: 'cover'}} className="transition-transform duration-500 group-hover:scale-105" data-ai-hint={item.hint} quality={100} />
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
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
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
            <div className="bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-10 md:p-16 text-center shadow-lg">
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
