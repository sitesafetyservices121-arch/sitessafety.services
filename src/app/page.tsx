
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, HardHat, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <HardHat className="h-8 w-8 text-primary" />,
    title: "Rent a Safety Officer",
    description: "Deploy elite, certified safety officers, registered with SACPCMP or SAIOH, for on-demand risk mitigation and unparalleled on-site expertise.",
    link: "/rent-a-safety-officer",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "E-Safety File",
    description: "The world's first fully-digitized compliance solution. An audit-proof, cloud-based safety file, accessible instantly, anywhere on earth.",
    link: "/e-safety-file",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Safety Management System",
    description: "Command your entire safety operation from a single, AI-powered platform. A revolutionary system to build a zero-incident culture.",
    link: "/safety-management-system",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Electronically Delivered Safety Files",
    description: "The future of rapid compliance. Upload your client's index and our AI builds your print-ready file in as little as 6-24 hours.",
    link: "/electronically-delivered-safety-files",
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
        <div className="absolute inset-0 z-0">
            <video
              poster="https://iili.io/FpW6fmF.png"
              src="https://cdn.streamable.com/video/mp4/1d5a7d.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
                The Future of Safety Compliance is Here
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-white/80 mx-auto lg:mx-0">
                Welcome to the world's first AI-powered safety ecosystem. RAK-Site Safety Services delivers revolutionary solutions that automate compliance, eliminate risk, and redefine operational excellence for your industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button asChild size="lg" variant="cta">
                  <Link href="/e-safety-file/#inquiry-form">
                    Request a Free Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                  <Link href="#services">
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div>
                {/* This div is intentionally left empty to create the two-column layout */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Proof Section */}
      <section className="w-full py-24 bg-background">
        <div className="container px-4 md:px-6">
            <h2 className="text-center text-lg text-muted-foreground font-semibold tracking-wider uppercase mb-12">TRUSTED BY INDUSTRY LEADERS NATIONWIDE</h2>
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
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">A Revolutionary Suite of Safety Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground text-lg">
              We engineered the future of safety. Explore our pioneering services, built to deliver unprecedented compliance and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              src="https://iili.io/JAA4jF2.png"
              alt="Handshake between two businessmen on a construction site"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              data-ai-hint="business handshake construction"
              quality={100}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Expertise Forged in the Future</h2>
            <p className="text-muted-foreground text-lg md:text-xl/relaxed">
              For over a decade, we have not just participated in the safety industry; we have redefined it. RAK-Site Safety Services combines deep field experience with world-first AI technology to offer a level of protection and efficiency previously unimaginable. Our systems safeguard your people and assets, ensuring you don't just meet regulatory requirements—you exceed them. Partner with us to transform your workplace into a model of modern safety and operational excellence.
            </p>
            <div className="flex justify-center lg:justify-start pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
