import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserCheck, FileText, Settings } from "lucide-react";

const services = [
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Rent a Safety Officer",
    description: "Get qualified and experienced safety officers on-site to ensure compliance and safety for your projects.",
    link: "/rent-a-safety-officer",
    color: "primary",
  },
  {
    icon: <FileText className="h-10 w-10 text-accent" />,
    title: "E Safety File",
    description: "Comprehensive, legally compliant digital safety files tailored to your business needs.",
    link: "/e-safety-file",
    color: "accent",
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: "Safety Management System",
    description: "Implement a robust safety management system to proactively manage risks and improve safety culture.",
    link: "/safety-management-system",
    color: "primary",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-24 md:py-32 lg:py-40 text-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline">
              Your Trusted Partner in Site Safety
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              RAK-Site Safety Services provides expert solutions to ensure your workplace is safe, compliant, and efficient.
            </p>
            <div>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="/e-safety-file">
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-16 md:py-24 bg-card">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary font-headline">Our Core Services</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-lg">
              We offer a range of services designed to meet the specific safety needs of your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card 
                key={service.title} 
                className={`flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl border-t-4 ${service.color === 'accent' ? 'border-accent' : 'border-primary'}`}
              >
                <CardHeader className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 ${service.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center text-center">
                  <CardDescription className="mb-6 flex-grow">{service.description}</CardDescription>
                  <Button asChild variant="secondary" className={`${service.color === 'accent' ? 'bg-accent/10 hover:bg-accent/20' : 'bg-primary/10 hover:bg-primary/20'}`}>
                    <Link href={service.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 md:py-24">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Why Choose Us?</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              With years of experience and a commitment to excellence, we deliver safety solutions that protect your people, your assets, and your reputation.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/about">About Our Company</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/experience">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
