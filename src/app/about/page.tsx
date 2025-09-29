"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Target, Handshake, CheckCircle, HardHat, Bot, FileDigit, Users, Cpu, ArrowRight, Zap } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import { CheckIconCard } from "@/components/ui/check-icon-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import imageData from "@/app/lib/placeholder-images.json";



// export const metadata: Metadata = { // This needs to be moved to a Server Component or removed from client component
//   title: 'About Our Mission',
//   description: 'Learn about the story, mission, and values that drive RAK-Site Safety Services to be a leader in occupational safety services.',
// };

const teamMembers = imageData.leadership.map(member => ({ ...member, avatar: member.image.url, hint: member.image.hint }));

const values = [
    { icon: <Shield className="h-8 w-8 text-primary" />, title: "Integrity", description: "Upholding the highest standards of honesty and ethical behavior in all our operations." },
    { icon: <Target className="h-8 w-8 text-primary" />, title: "Excellence", description: "Consistently delivering superior service and exceeding client expectations." },
    { icon: <Handshake className="h-8 w-8 text-primary" />, title: "Commitment", description: "Dedicated to the safety and well-being of our clients, their employees, and the public." },
];

const trustMarkers = [
    { text: "Nationwide Servicing" },
    { text: "SACPCMP & SAIOH Registered Officers" },
    { text: "24-Hour Turnaround Options" },
    { text: "600+ Legal-Grade Templates" },
]

const whatWeDo = [
    { 
        title: "Short-Term Safety Officers, On-Demand", 
        description: "Deploy a registered safety officer for the exact window you need: site mobilisations, shutdowns, audits, incident investigations, client inspections, or peak-period cover. No long contracts. No wasted payroll. Just the right competence, right on time.",
        icon: <HardHat className="h-8 w-8 text-primary" />
    },
    { 
        title: "AI-Driven Safety Management System", 
        description: "Your compliance engine, designed to cut admin hours and prevent lapses. Features 10 integrated AI tools, management dashboards, automated notifications, a 600+ document library, and a specialised AI consultant to guide you.",
        icon: <Bot className="h-8 w-8 text-primary" />
    },
    { 
        title: "e-Safety File Websites (Your brand. Your domain.)", 
        description: "We design a compliant, client-facing safety file website that matches your existing look and runs on your own domain. Replace hard-copy files with a secure, searchable, version-controlled system. Clean, professional, always up to date, built to impress auditors and clients.",
        icon: <FileDigit className="h-8 w-8 text-primary" />
    },
    { 
        title: "Print Ready Safety Files", 
        description: "Simply upload your client's required index and receive a complete, compliant, and print-ready safety file electronically in hours. Fast, efficient, and site-ready.",
        icon: <Zap className="h-8 w-8 text-primary" />
    },
];

const whyChooseUs = [
    { title: "Compliance You Can Prove", description: "Structured, traceable, audit-ready outputs." },
    { title: "Legal Confidence", description: "Documents aligned to regulatory requirements and best practice." },
    { title: "Cost Control", description: "Rent expertise only when you need it; automate the repetitive work." },
    { title: "Speed with Accuracy", description: "AI builds the base; certified professionals perfect it." },
    { title: "Nationwide Reach", description: "We service the whole of South Africa." },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
       <section className="relative py-40 md:py-60 border-b">
        
        <div className="container px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground">Achieving Perfection in Compliance Where AI Meets Human Expertise.</h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                When safety and compliance aren’t optional, guesswork isn’t either. RAK-Site Safety Services combines certified experts with purpose-built AI to deliver audit-ready documentation, faster approvals, and real savings nationwide. We don’t just promise compliance. We engineer it.
            </p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
            <Card className="bg-card/50 shadow-lg border p-6 rounded-2xl mb-20">
                <CardContent className="p-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {trustMarkers.map(marker => (
                            <div key={marker.text} className="flex flex-col sm:flex-row items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                                <span className="text-sm font-semibold text-muted-foreground text-center sm:text-left">{marker.text}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-16">
                {/* What We Do */}
                <div>
                    <h3 className="text-3xl font-extrabold text-foreground text-center mb-12">What We Do</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {whatWeDo.map((item, index) => (
                            <Card key={item.title} className="bg-transparent border-0 shadow-none">
                                <CardContent className="flex items-start gap-6 p-0">
                                    <div className="flex-shrink-0 mt-1">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Who We Serve */}
                <div className="bg-card/50 p-10 md:p-12 rounded-2xl border">
                     <div className="grid md:grid-cols-3 items-center gap-8">
                        <div className="md:col-span-1 flex justify-center">
                           <div className="bg-primary/10 rounded-full w-40 h-40 flex items-center justify-center">
                                <Users className="h-20 w-20 text-primary" />
                           </div>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-extrabold text-foreground">Who We Serve</h3>
                            <p className="mt-4 text-lg text-muted-foreground">
                                We work with CEOs, Directors, Safety Officers, Managers, and Admin teams who need rock-solid compliance without the burden. Trusted across Construction, Engineering, Manufacturing, Logistics, Mining, and Events any industry where safety and legality must be proven, not assumed.
                            </p>
                        </div>
                     </div>
                </div>
                
                {/* Why Choose Us */}
                <div>
                    <h3 className="text-3xl font-extrabold text-foreground text-center mb-12">Why Clients Choose RAK-Site Safety Services</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map(item => (
                            <CheckIconCard key={item.title} title={item.title} description={item.description} />
                        ))}
                    </div>
                </div>

                {/* The Promise */}
                <div className="text-center border-t border-dashed pt-16">
                     <h3 className="text-3xl font-extrabold text-foreground">The Promise</h3>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Compliance done right isn’t chance—it’s design. At RAK-Site Safety Services, AI handles the complexity, and certified professionals ensure it's airtight. The result? Lower risk, leaner costs, and audits passed the first time, every time.
                     </p>
                     <p className="mt-8 text-2xl font-bold text-primary">Ready to make compliance inevitable?</p>
                     <p className="mt-2 text-muted-foreground">Let’s build your file, deploy your officer, and put your legal proof in writing.</p>
                     <Button asChild size="lg" className="mt-8">
                         <Link href="/contact">Contact Us Today <ArrowRight className="ml-2 h-5 w-5" /></Link>

                     </Button>
                </div>
            </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-card/50 border-y">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide our every action.</p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map(v => (
                    <Card key={v.title} className="text-center border-t-4 border-t-primary p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                        <CardHeader className="items-center">
                            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            {v.icon}
                            </div>
                            <CardTitle className="mt-4 text-2xl text-foreground font-bold">{v.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{v.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">Meet Our Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center bg-card/50 border p-8 shadow-lg">
                <CardContent>
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
                    <AvatarImage data-ai-hint={member.hint} src={member.avatar} />
                    <AvatarFallback className="text-2xl font-bold">{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}
