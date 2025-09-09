
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, HardHat, ShieldCheck, Mail, Phone, Linkedin, Facebook, Twitter, Building, Shield } from "lucide-react";
import Image from "next/image";
import { TestimonialCard } from "@/components/testimonial-card";
import { InquiryForm } from "@/components/inquiry-form";

const projects = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "On-Demand Safety Officer",
    description: "Deploy elite, certified safety officers for on-demand risk mitigation and unparalleled on-site expertise.",
    link: "/rent-a-safety-officer",
    image: "https://iili.io/JADbnef.png",
    hint: "construction site safety"
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Audit-Ready E-Safety File",
    description: "A fully-digitized, cloud-based safety file solution, ensuring you are always audit-proof and compliant.",
    link: "/e-safety-file",
    image: "https://iili.io/JADbLPS.png",
    hint: "digital document management"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "AI-Powered Safety System",
    description: "A revolutionary, AI-powered platform to command your entire safety operation and build a zero-incident culture.",
    link: "/safety-management-system",
    image: "https://iili.io/JADb27u.png",
    hint: "safety dashboard analytics"
  },
];

const testimonials = [
  { name: "Lerato Khumalo", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Their proactive approach prevented numerous issues.", rating: 5, image: "https://iili.io/JADe4mB.png", hint: "professional black woman" },
  { name: "Pieter van der Merwe", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant for a critical audit. The process was smooth and professional.", rating: 5, image: "https://iili.io/JADeLp1.png", hint: "professional white man" },
  { name: "Anika Patel", title: "Ops Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents.", rating: 5, image: "https://iili.io/JADeZuG.png", hint: "professional indian woman" },
];


export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-40 md:py-60 bg-card border-b">
        <div className="absolute inset-0 z-0">
            <Image
              src="https://iili.io/JADbBv4.png"
              alt="Modern industrial facility background"
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl text-white">
              Building Safer Tomorrows
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-white/90">
              We provide expert safety solutions that protect your people, ensure compliance, and drive operational excellence.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="cta">
                <Link href="#projects">
                  View Our Work
                </Link>
              </Button>
            </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 md:py-32">
        <div className="container grid items-center justify-center gap-12 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-20">
          <div className="relative h-96 lg:h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
            <Image
              src="https://iili.io/JADeLp1.png"
              alt="Portrait of the founder"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              data-ai-hint="male professional portrait"
              quality={100}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">A Commitment to Uncompromising Safety</h2>
            <p className="text-muted-foreground text-lg md:text-xl/relaxed">
              For over a decade, RAK-Site Safety Services has been at the forefront of the safety industry. We blend deep field experience with cutting-edge, AI-powered technology to offer a level of protection and efficiency previously unimaginable. Our mission is to safeguard your people and assets, ensuring you don't just meet regulatory requirements—you exceed them. Partner with us to transform your workplace into a model of modern safety and operational excellence.
            </p>
            <div className="flex justify-center lg:justify-start pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/about">More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects/Featured Work Section */}
      <section id="projects" className="w-full py-24 md:py-32 bg-card border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              We engineered the future of safety. Explore our pioneering services, built to deliver unprecedented compliance and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="bg-background flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative h-56 w-full">
                    <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" data-ai-hint={project.hint} className="transition-transform duration-500 group-hover:scale-105" />
                  </div>
                </CardContent>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                  <Link href={project.link} className="font-body font-semibold text-primary hover:underline flex items-center group">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-card border-y">
        <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Get in Touch</h2>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
                    Have a project in mind or need to discuss your safety requirements? We're here to help.
                </p>
            </div>
            <Card className="p-8 shadow-xl border">
                <InquiryForm />
            </Card>
            <div className="text-center mt-12">
                <h3 className="text-xl font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex justify-center gap-6">
                    <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-7 w-7" />
                    </Link>
                    <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                        <Facebook className="h-7 w-7" />
                    </Link>
                    <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-7 w-7" />
                    </Link>
                </div>
            </div>
        </div>
      </section>
      
    </div>
  );
}
