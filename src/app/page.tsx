
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, HardHat, ShieldCheck, Mail, Phone, Linkedin, Facebook, Twitter, Building, Shield, Zap, Puzzle, BrainCircuit } from "lucide-react";
import Image from "next/image";
import { TestimonialCard } from "@/components/testimonial-card";
import { InquiryForm } from "@/components/inquiry-form";
import { VantaBackground } from "@/components/vanta-background";


const projects = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "Rent a Safety Officer",
    description: "Deploy elite, certified safety officers for on-demand risk mitigation and unparalleled on-site expertise.",
    link: "/rent-a-safety-officer",
    image: "https://i.ibb.co/ks6sd9m/image-4.jpg",
    hint: "construction site safety"
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "E-Safety File Website & Hosting",
    description: "A fully-digitized, cloud-based safety file solution, ensuring you are always audit-proof and compliant.",
    link: "/e-safety-file",
    image: "https://i.ibb.co/Y46T4bc/image-19.jpg",
    hint: "digital document management"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "AI-Powered Safety System",
    description: "A revolutionary platform to command your entire safety operation and build a zero-incident culture.",
    link: "/safety-management-system",
    image: "https://i.ibb.co/TM3NSPD/image-10.jpg",
    hint: "safety dashboard analytics"
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Download Print-Ready Safety Files",
    description: "Instantly get your compliant, print-ready safety documents delivered electronically within hours.",
    link: "/print-ready-safety-files",
    image: "https://i.ibb.co/rR17WKM/image-14.jpg",
    hint: "digital file download"
  },
];

const testimonials = [
  { name: "Lerato Khumalo", title: "Project Manager", company: "ConstructCo", testimonial: "RAK's safety officers were professional, knowledgeable, and integrated seamlessly with our team. Their proactive approach prevented numerous issues.", rating: 5, image: "https://iili.io/JADe4mB.png", hint: "professional black woman" },
  { name: "Pieter van der Merwe", title: "CEO", company: "BuildRight Inc.", testimonial: "The E-Safety File service saved us countless hours and ensured we were fully compliant for a critical audit. The process was smooth and professional.", rating: 5, image: "https://iili.io/JADeLp1.png", hint: "professional white man" },
  { name: "Anika Patel", title: "Ops Director", company: "InfraGroup", testimonial: "Implementing their Safety Management System has transformed our safety culture for the better. We've seen a measurable reduction in incidents.", rating: 5, image: "https://iili.io/JADeZuG.png", hint: "professional indian woman" },
];

const problems = [
    {
        title: "Wasted Admin Time",
        description: "Hours lost building complex safety files and chasing paperwork instead of managing site safety.",
        icon: <Puzzle className="h-8 w-8 text-primary" />
    },
    {
        title: "Compliance Blind Spots",
        description: "The constant risk of missing a new regulation, leading to fines, project delays, or legal trouble.",
        icon: <Puzzle className="h-8 w-8 text-primary" />
    },
    {
        title: "Unseen Site Hazards",
        description: "Without a dedicated expert, critical risks go unnoticed, leading to incidents that should have been prevented.",
        icon: <Puzzle className="h-8 w-8 text-primary" />
    },
    {
        title: "Inconsistent Safety Culture",
        description: "Safety is treated as a checklist, not a core value, leading to shortcuts and disengaged teams.",
        icon: <Puzzle className="h-8 w-8 text-primary" />
    },
]

const solutions = [
    {
        title: "Automated Documentation",
        description: "Our AI platform generates legally-aligned HIRAs, method statements, and full safety files in minutes, freeing your team to focus on-site.",
        icon: <BrainCircuit className="h-8 w-8 text-primary" />
    },
    {
        title: "Expert Human Oversight",
        description: "Every AI-generated document and system is verified and signed off by certified safety professionals, guaranteeing 100% compliance.",
        icon: <HardHat className="h-8 w-8 text-primary" />
    },
    {
        title: "On-Demand Expertise",
        description: "Deploy our registered safety officers exactly when and where you need them for immediate risk mitigation and expert site management.",
        icon: <Zap className="h-8 w-8 text-primary" />
    },
    {
        title: "Total Safety Ecosystem",
        description: "We provide an integrated system of tools and talent that builds a proactive, sustainable safety culture from the ground up.",
        icon: <ShieldCheck className="h-8 w-8 text-primary" />
    },
]


export default function Home() {
  return (
    <div className="bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="relative py-40 md:py-60 border-b bg-transparent">
        <VantaBackground />
        <div className="container px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-7xl text-white">
              Building Safer Tomorrows
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-white/90">
              We provide expert safety solutions that protect your people, ensure compliance, and drive operational excellence.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" variant="default">
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
              src="https://i.ibb.co/5pHLV4D/image-27.jpg"
              alt="Portrait of the founder"
              fill
              style={{objectFit:"cover", objectPosition: "center"}}
              data-ai-hint="male professional portrait"
              quality={100}
              priority
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">A Commitment to Uncompromising Safety</h2>
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
      <section id="projects" className="w-full py-24 md:py-32 bg-card/50 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              We engineered the future of safety. Explore our pioneering services, built to deliver unprecedented compliance and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="bg-transparent flex flex-col group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border">
                <CardContent className="p-0">
                  <div className="relative h-56 w-full">
                    <Image src={project.image} alt={project.title} fill style={{objectFit:"cover"}} data-ai-hint={project.hint} quality={100} className="transition-transform duration-500 group-hover:scale-105" />
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

       {/* Problems Section */}
       <section className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">What Problems We Solve</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              Companies face the same compliance headaches again and again. We built the cure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem) => (
              <Card key={problem.title} className="text-center p-6 border-0 shadow-none bg-transparent">
                  <CardHeader className="items-center p-0 mb-4">
                      <div className="bg-primary/10 p-4 rounded-full">
                          {problem.icon}
                      </div>
                  </CardHeader>
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold text-foreground mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                  </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 md:py-32 bg-card/50 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">How We Solve It</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              We combine purpose-built AI with certified human expertise to deliver a complete safety solution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.title} className="text-center p-6 border bg-card shadow-sm">
                  <CardHeader className="items-center p-0 mb-4">
                      <div className="bg-primary/10 p-4 rounded-full">
                          {solution.icon}
                      </div>
                  </CardHeader>
                  <CardContent className="p-0">
                      <h3 className="text-xl font-bold text-foreground mb-2">{solution.title}</h3>
                      <p className="text-muted-foreground">{solution.description}</p>
                  </CardContent>
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
      <section id="contact" className="py-24 md:py-32 bg-card/50 border-y">
        <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Get in Touch</h2>
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
                    <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-7 w-7" />
                    </a>
                    <a href="https://www.facebook.com/share/p/1W3cmvZK6o/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Facebook className="h-7 w-7" />
                    </a>
                    <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-7 w-7" />
                    </a>
                </div>
            </div>
        </div>
      </section>
      
    </div>
  );
}
