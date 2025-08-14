import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserCheck, FileText, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <UserCheck className="h-7 w-7 text-accent" />,
    title: "Rent a Safety Officer",
    description: "Deploy certified safety professionals to your site, ensuring full compliance and risk mitigation from day one.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <FileText className="h-7 w-7 text-accent" />,
    title: "E-Safety File",
    description: "Digitize your compliance with our audit-proof, cloud-based safety file management system.",
    link: "/e-safety-file",
  },
  {
    icon: <Settings className="h-7 w-7 text-accent" />,
    title: "Safety Management System",
    description: "Implement a bespoke, scalable system to proactively manage safety and cultivate a zero-incident culture.",
    link: "/safety-management-system",
  },
];

export default function Home() {
  return (
    <div className="bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="py-24 md:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
                Engineering a Safer Tomorrow
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-body">
                RAK-Site Safety delivers precision-engineered safety solutions, ensuring your projects are compliant, efficient, and fundamentally secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" variant="cta">
                  <Link href="/e-safety-file">
                    Request Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 w-full lg:h-[500px] rounded-lg overflow-hidden border-2 border-accent/20 shadow-2xl shadow-accent/10">
              <Image 
                src="https://placehold.co/800x600.png"
                alt="Engineer reviewing blueprints on a construction site"
                layout="fill"
                objectFit="cover"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                data-ai-hint="engineer blueprints construction"
                priority
              />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-24 md:py-32 bg-card border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-primary">Core Safety Solutions</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground font-body text-lg">
              Specialized services designed to integrate seamlessly with your operations, delivering unparalleled safety and compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-secondary border-border/50 hover:border-accent shadow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col group">
                <CardHeader>
                  <div className="bg-background rounded-lg w-14 h-14 flex items-center justify-center mb-4 border border-border/50 group-hover:border-accent transition-colors">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline font-semibold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground font-body mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-accent hover:text-accent/80 flex items-center group">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="w-full py-24 md:py-32">
        <div className="container grid items-center justify-center gap-12 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-20">
          <div className="relative h-96 lg:h-[500px] w-full rounded-lg overflow-hidden border-2 border-accent/20 shadow-2xl shadow-accent/10">
            <Image 
              src="https://placehold.co/800x600.png"
              alt="Team of safety professionals in a meeting"
              layout="fill"
              objectFit="cover"
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              data-ai-hint="industrial safety meeting"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2 font-body text-sm font-semibold text-accent border border-accent/30">
              The RAK-Safety Advantage
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Precision in Practice</h2>
            <p className="text-muted-foreground font-body text-lg md:text-xl/relaxed">
              With over a decade of experience, we deliver safety solutions that protect your people, assets, and reputation. Our team of certified professionals is dedicated to creating safer work environments across all industries through technology and expertise.
            </p>
            <div className="flex justify-center lg:justify-start pt-4">
              <Button asChild size="lg" variant="cta">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
