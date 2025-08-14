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
    title: "E-Safety File",
    description: "Comprehensive, legally compliant digital safety files tailored to your business needs.",
    link: "/e-safety-file",
  },
  {
    icon: <Settings className="h-8 w-8 text-accent" />,
    title: "Safety Management System",
    description: "Implement a robust system to proactively manage risks and improve your safety culture.",
    link: "/safety-management-system",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-24 md:py-40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-headline font-bold tracking-tight sm:text-6xl md:text-7xl text-primary">
                Pioneering Workplace Safety
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-body">
                RAK-Site Safety provides expert, data-driven solutions to ensure your workplace is safe, compliant, and efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link href="/e-safety-file">
                    Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 w-full lg:h-[500px] rounded-2xl overflow-hidden border shadow-2xl">
              <Image 
                src="https://placehold.co/800x600.png"
                alt="Construction site with safety measures"
                layout="fill"
                objectFit="cover"
                data-ai-hint="construction worker safety gear"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-24 md:py-32 bg-card border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold tracking-tight text-primary">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground font-body text-lg">
              We offer a range of specialized services designed to meet the unique safety needs of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-background border-none shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                <CardHeader>
                  <div className="bg-accent/10 rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground font-body mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-accent hover:underline flex items-center group">
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
          <div className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden border shadow-2xl">
            <Image 
              src="https://placehold.co/800x600.png"
              alt="Team of safety professionals in a meeting"
              layout="fill"
              objectFit="cover"
              data-ai-hint="diverse professionals meeting"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-accent/10 px-4 py-2 font-body text-sm font-semibold text-accent">
              Why Choose RAK-Safety?
            </div>
            <h2 className="text-4xl font-bold font-headline tracking-tight text-primary">Experience & Excellence in Safety</h2>
            <p className="text-muted-foreground font-body text-lg md:text-xl/relaxed">
              With over a decade of experience, we deliver safety solutions that protect your people, assets, and reputation. Our team of certified professionals is dedicated to creating safer work environments across all industries through technology and expertise.
            </p>
            <div className="flex justify-center lg:justify-start pt-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
