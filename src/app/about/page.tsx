
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Target, Users } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'About Our Mission',
  description: 'Learn about the story, mission, and values that drive RAK-Site Safety to be a leader in occupational safety services.',
};

const teamMembers = [
  { name: "John Doe", role: "Founder & Lead Safety Consultant", avatar: "https://placehold.co/128x128.png", initials: "JD", hint: "male professional portrait" },
  { name: "Jane Smith", role: "Operations Manager", avatar: "https://placehold.co/128x128.png", initials: "JS", hint: "female professional portrait" },
  { name: "Mike Johnson", role: "Senior Safety Officer", avatar: "https://placehold.co/128x128.png", initials: "MJ", hint: "male expert portrait" },
];

const values = [
    { icon: <Shield className="h-8 w-8 text-primary" />, title: "Integrity", description: "Upholding the highest standards of honesty and ethical behavior in all our operations." },
    { icon: <Target className="h-8 w-8 text-primary" />, title: "Excellence", description: "Consistently delivering superior service and exceeding client expectations." },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Commitment", description: "Dedicated to the safety and well-being of our clients, their employees, and the public." },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Pioneering Safety, Building Trust
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a team of dedicated professionals committed to creating safer work environments across industries through innovation, expertise, and unwavering dedication.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://placehold.co/800x600.png" alt="Company history collage" fill sizes="100vw" style={{objectFit: 'cover'}} data-ai-hint="modern office architecture" />
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Story</h2>
                <p className="text-muted-foreground text-lg">Founded in 2010, RAK-Site Safety has grown from a small consultancy into a leading provider of occupational health and safety services. Our journey is one of passion for safety and a deep commitment to our clients' success.</p>
                <p className="text-muted-foreground">We continuously adapt to the evolving landscape of safety regulations and technologies to provide state-of-the-art solutions, building a reputation for reliability, expertise, and unparalleled customer service.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-4 lg:order-last">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Mission & Vision</h2>
                <p className="text-muted-foreground text-lg">Our mission is to protect people, property, and the environment by delivering the highest quality safety services. We strive to empower our clients with the knowledge and tools to create a zero-incident workplace.</p>
                <p className="text-muted-foreground">Our vision is to be the most trusted name in workplace safety, setting new standards for excellence and innovation in the industry, ultimately creating a future where every worker returns home safe every day.</p>
            </div>
            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-lg">
                <Image src="https://placehold.co/800x600.png" alt="Team discussing a project" fill sizes="100vw" style={{objectFit: 'cover'}} data-ai-hint="diverse team meeting" />
            </div>
            </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide our every action.</p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map(v => (
                    <Card key={v.title} className="text-center bg-card border-t-4 border-t-primary p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">Meet Our Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center bg-card border p-8 shadow-lg">
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

    