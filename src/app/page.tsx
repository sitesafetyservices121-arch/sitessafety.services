import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserCheck, FileText, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <UserCheck className="h-8 w-8 text-accent" />,
    title: "Rent a Safety Officer",
    description: "Get qualified and experienced safety officers on-site to ensure compliance and safety for your projects.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: "E Safety File",
    description: "Comprehensive, legally compliant digital safety files tailored to your business needs.",
    link: "/e-safety-file",
  },
  {
    icon: <Settings className="h-8 w-8 text-accent" />,
    title: "Safety Management System",
    description: "Implement a robust safety management system to proactively manage risks and improve safety culture.",
    link: "/safety-management-system",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-24 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Your Trusted Partner in <span className="text-primary">Site Safety</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground font-body md:text-xl">
                RAK-Site Safety Services provides expert solutions to ensure your workplace is safe, compliant, and efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/80 text-accent-foreground font-body font-bold rounded-full text-base">
                  <Link href="/e-safety-file">
                    Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-body font-bold rounded-full text-base border-2">
                  <Link href="#services">
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 w-full lg:h-96 rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
              <Image 
                src="https://placehold.co/600x400.png"
                alt="Construction site with safety measures"
                layout="fill"
                objectFit="cover"
                data-ai-hint="construction safety"
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-20 md:py-28 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl text-foreground">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground font-body md:text-lg">
              We offer a range of services designed to meet the specific safety needs of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 flex flex-col">
                <CardHeader>
                  {service.icon}
                  <CardTitle className="text-2xl font-headline font-bold text-foreground mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground font-body mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-accent hover:underline flex items-center">
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
          <div className="relative h-80 lg:h-[450px] w-full rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Team of safety professionals"
              layout="fill"
              objectFit="cover"
              data-ai-hint="safety team professional"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 font-body text-sm font-semibold text-primary">
              Why Choose Us?
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl text-foreground">Experience and Excellence in Safety</h2>
            <p className="text-muted-foreground font-body md:text-xl/relaxed">
              With years of experience and a commitment to excellence, we deliver safety solutions that protect your people, your assets, and your reputation. Our team of certified professionals is dedicated to creating safer work environments across all industries.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full font-bold font-body">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
