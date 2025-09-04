
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, HardHat, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "Rent a Safety Officer",
    description: "We deploy certified safety officers nationwide, registered with SACPCMP, SAIOH, or both, ensuring full compliance and effective risk mitigation from day one.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "E-Safety File",
    description: "The future of compliance. Our cloud-based system provides a complete, digital safety file solution that is audit-ready and accessible anywhere.",
    link: "/e-safety-file",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Safety Management System",
    description: "Implement a bespoke, scalable system to proactively manage safety and cultivate a zero-incident culture.",
    link: "/safety-management-system",
  },
];

const stats = [
    { value: "10+", label: "Years of Expertise" },
    { value: "500+", label: "Successful Projects" },
    { value: "100%", label: "Compliance Record" },
    { value: "99%", label: "Client Retention" },
]

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-40 bg-card border-b">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Your Partner in Workplace Safety and Compliance
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-muted-foreground mx-auto lg:mx-0">
                RAK-Site Safety provides cutting-edge safety solutions that go beyond compliance, driving efficiency, protecting people, and securing every phase of your project from planning to completion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/e-safety-file">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#services">
                    Explore Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 w-full lg:h-[450px] overflow-hidden rounded-lg shadow-xl bg-gray-200">
              <video
                poster="https://iili.io/FpW6fmF.png"
                src="https://cdn.streamable.com/video/mp4/1d5a7d.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Proof Section */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 md:px-6">
            <h2 className="text-center text-lg text-muted-foreground font-semibold tracking-wider uppercase mb-12">TRUSTED BY COMPANIES NATIONWIDE</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                        <p className="text-4xl md:text-5xl font-extrabold text-primary">{stat.value}</p>
                        <p className="text-muted-foreground font-medium mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. Core Value / Features Section */}
      <section id="services" className="w-full py-24 md:py-32 bg-card border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">A Solution for Every Safety Need</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              We offer specialized services designed to integrate seamlessly with your operations, delivering unparalleled safety and compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="bg-background text-center flex flex-col group p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                  <Link href={service.link} className="font-body font-semibold text-primary hover:underline flex items-center justify-center group">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Showcase / Why Choose Us Section */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="container grid items-center justify-center gap-12 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left lg:gap-20">
          <div className="relative h-96 lg:h-[500px] w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://iili.io/J1eM6nN.png"
              alt="Handshake between two businessmen on a construction site"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              data-ai-hint="business handshake construction"
              quality={100}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Expertise You Can Build On</h2>
            <p className="text-muted-foreground text-lg md:text-xl/relaxed">
              With over a decade of specialized experience, RAK-Site Safety delivers comprehensive safety solutions designed to safeguard your people, protect your assets, and uphold your reputation. Our team of highly qualified and certified professionals brings deep industry knowledge, proven methodologies, and cutting-edge technology to every project. We partner with organizations across diverse sectors to create safer, more compliant, and more productive workplaces, ensuring not only regulatory alignment but also long-term operational excellence and peace of mind.
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
