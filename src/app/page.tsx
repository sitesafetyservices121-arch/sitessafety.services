import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Award, Building, HeartHandshake, ShieldCheck } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Rent a Safety Officer",
    description: "Deploy certified safety professionals to your site, ensuring full compliance and risk mitigation from day one.",
    link: "/rent-a-safety-officer",
  },
  {
    title: "E-Safety File",
    description: "Digitize your compliance with our audit-proof, cloud-based safety file management system.",
    link: "/e-safety-file",
  },
  {
    title: "Safety Management System",
    description: "Implement a bespoke, scalable system to proactively manage safety and cultivate a zero-incident culture.",
    link: "/safety-management-system",
  },
];

const stats = [
    { icon: <Award className="h-10 w-10 text-primary" />, value: "10+", label: "Years of Expertise" },
    { icon: <Building className="h-10 w-10 text-primary" />, value: "500+", label: "Successful Projects" },
    { icon: <ShieldCheck className="h-10 w-10 text-primary" />, value: "100%", label: "Compliance Record" },
    { icon: <HeartHandshake className="h-10 w-10 text-primary" />, value: "99%", label: "Client Retention" },
]

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 md:py-40 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-headline font-bold tracking-tight sm:text-6xl md:text-7xl text-primary-dark">
                Engineering a Safer Tomorrow
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-body">
                RAK-Site Safety delivers precision-engineered safety solutions, ensuring your projects are compliant, efficient, and fundamentally secure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" variant="default">
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
            <div className="relative h-96 w-full lg:h-[500px] overflow-hidden">
              <Image 
                src="https://placehold.co/800x600.png"
                alt="Engineer reviewing blueprints on a construction site"
                layout="fill"
                objectFit="cover"
                data-ai-hint="engineer blueprints construction"
                priority
                className="border-4 border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-24 md:py-32 bg-secondary border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary-dark">Core Safety Solutions</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground font-body text-lg">
              Specialized services designed to integrate seamlessly with your operations, delivering unparalleled safety and compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-card border flex flex-col group">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline font-semibold text-primary-dark">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground font-body mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-primary hover:text-primary-dark flex items-center group">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        {stat.icon}
                        <p className="text-4xl md:text-5xl font-bold font-headline text-primary-dark mt-4">{stat.value}</p>
                        <p className="text-muted-foreground font-body mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-24 md:py-32 bg-secondary border-y">
        <div className="container grid items-center justify-center gap-12 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-20">
          <div className="relative h-96 lg:h-[500px] w-full overflow-hidden">
            <Image 
              src="https://placehold.co/800x600.png"
              alt="Team of safety professionals in a meeting"
              layout="fill"
              objectFit="cover"
              data-ai-hint="industrial safety meeting"
              className="border-4 border-border"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-primary-dark">Uncompromising Quality, Unmatched Expertise.</h2>
            <p className="text-muted-foreground font-body text-lg md:text-xl/relaxed">
              With over a decade of dedicated experience, we provide safety solutions that protect your people, assets, and reputation. Our team of certified professionals is committed to creating safer work environments across all industries through proven processes and advanced technology.
            </p>
            <div className="flex justify-center lg:justify-start pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
