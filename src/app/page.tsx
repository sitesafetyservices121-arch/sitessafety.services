import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserCheck, FileText, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <UserCheck className="h-8 w-8 text-primary" />,
    title: "Rent a Safety Officer",
    description: "Get qualified and experienced safety officers on-site to ensure compliance and safety for your projects.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "E Safety File",
    description: "Comprehensive, legally compliant digital safety files tailored to your business needs.",
    link: "/e-safety-file",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Safety Management System",
    description: "Implement a robust safety management system to proactively manage risks and improve safety culture.",
    link: "/safety-management-system",
  },
];

export default function Home() {
  return (
    <>
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                Your Trusted Partner in Site Safety
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground font-body">
                RAK-Site Safety Services provides expert solutions to ensure your workplace is safe, compliant, and efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/e-safety-file">
                    Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 w-full lg:h-[400px] rounded-lg overflow-hidden border shadow-lg">
              <Image 
                src="https://placehold.co/600x450.png"
                alt="Construction site with safety measures"
                layout="fill"
                objectFit="cover"
                data-ai-hint="construction safety"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-28 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-foreground">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground font-body md:text-lg">
              We offer a range of services designed to meet the specific safety needs of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <div className="bg-primary/10 rounded-md w-14 h-14 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground font-body mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-primary hover:underline flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-20 md:py-28">
        <div className="container grid items-center justify-center gap-10 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-16">
          <div className="relative h-80 lg:h-[450px] w-full rounded-lg overflow-hidden border shadow-lg">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Team of safety professionals"
              layout="fill"
              objectFit="cover"
              data-ai-hint="safety team professional"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-block rounded-md bg-accent/10 px-4 py-2 font-body text-sm font-semibold text-accent">
              Why Choose Us?
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-foreground">Experience and Excellence in Safety</h2>
            <p className="text-muted-foreground font-body md:text-xl/relaxed">
              With years of experience and a commitment to excellence, we deliver safety solutions that protect your people, your assets, and your reputation. Our team of certified professionals is dedicated to creating safer work environments across all industries.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
