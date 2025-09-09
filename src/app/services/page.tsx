
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, HardHat, ShieldCheck, Zap, Bot } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import { ComplianceAdvisor } from "@/components/compliance-advisor";

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive suite of safety services, from on-demand safety officers to advanced AI-powered management systems.',
};

const services = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "Rent a Safety Officer",
    description: "Get a certified, registered safety professional on-site whenever you need one. Flexible, reliable, and fully compliant.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "E-Safety File",
    description: "A complete, cloud-based digital safety file solution. Audit-ready, accessible anywhere, and tailored to your business size.",
    link: "/e-safety-file",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Safety Management System",
    description: "An AI-powered platform to manage your entire safety program, from documents and inspections to AI-driven consultations.",
    link: "/safety-management-system",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Electronically Delivered Safety Files",
    description: "The fastest way to get compliant. Upload your client's index, like those for Sasol or Mittal, and get a print-ready file in 12-24 hours.",
    link: "/electronically-delivered-safety-files",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            A Solution for Every Safety Challenge
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From on-the-ground personnel to advanced AI-powered compliance platforms, our services are designed to meet the complex demands of modern industry and ensure your worksite is safe, compliant, and efficient.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card border text-center flex flex-col group p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                  <Button asChild>
                    <Link href={service.link} className="font-body font-semibold flex items-center justify-center group">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Advisor Section */}
      <section id="ai-advisor" className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <ComplianceAdvisor />
        </div>
      </section>
    </div>
  );
}
