import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, Award, Users } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'About Us',
};

const teamMembers = [
  { name: "John Doe", role: "Founder & Lead Safety Consultant", avatar: "https://placehold.co/100x100.png", initials: "JD", hint: "male professional" },
  { name: "Jane Smith", role: "Operations Manager", avatar: "https://placehold.co/100x100.png", initials: "JS", hint: "female professional" },
  { name: "Mike Johnson", role: "Senior Safety Officer", avatar: "https://placehold.co/100x100.png", initials: "MJ", hint: "male expert" },
];

const values = [
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: "Integrity", description: "Upholding the highest standards of honesty and ethical behavior in all our operations." },
    { icon: <Award className="h-8 w-8 text-primary" />, title: "Excellence", description: "Consistently delivering superior service and exceeding client expectations." },
    { icon: <Users className="h-8 w-8 text-primary" />, title: "Commitment", description: "Dedicated to the safety and well-being of our clients, their employees, and the public." },
];

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline tracking-tighter">About <span className="text-primary">RAK-Site Safety</span></h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto font-body">
          Dedicated to fostering secure, compliant, and productive work environments through expert safety solutions.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-96 w-full rounded-lg overflow-hidden border">
            <Image src="https://placehold.co/600x400.png" alt="Company history collage" layout="fill" objectFit="cover" data-ai-hint="office building modern" />
        </div>
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground font-headline">Our History</h2>
            <p className="text-muted-foreground font-body">Founded in 2010, RAK-Site Safety has grown from a small consultancy to a leading provider of occupational health and safety services. Our journey is one of passion for safety and a deep commitment to our clients' success. We continuously adapt to the evolving landscape of safety regulations and technologies to provide state-of-the-art solutions.</p>
            <p className="text-muted-foreground font-body">From humble beginnings, we've built a reputation for reliability, expertise, and unparalleled customer service, becoming a trusted partner for businesses across various industries.</p>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
         <div className="space-y-4 lg:order-last">
            <h2 className="text-3xl font-bold text-foreground font-headline">Our Mission & Vision</h2>
            <p className="text-muted-foreground font-body">Our mission is to protect people, property, and the environment by delivering the highest quality safety services, training, and systems. We strive to empower our clients with the knowledge and tools to create a zero-incident workplace.</p>
            <p className="text-muted-foreground font-body">Our vision is to be the most trusted name in workplace safety, setting new standards for excellence and innovation in the industry, ultimately creating a future where every worker returns home safe, every day.</p>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden border">
            <Image src="https://placehold.co/600x400.png" alt="Team discussing a project" layout="fill" objectFit="cover" data-ai-hint="team meeting" />
        </div>
      </div>


      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-foreground font-headline">Our Core Values</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(v => (
                 <Card key={v.title} className="text-center bg-card border">
                    <CardHeader className="items-center">
                        <div className="bg-primary/10 rounded-md w-14 h-14 flex items-center justify-center mb-4">
                          {v.icon}
                        </div>
                        <CardTitle className="mt-4 font-headline text-foreground">{v.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground font-body">{v.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center text-foreground font-headline mb-12">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center bg-card border group transition-colors">
              <CardContent className="pt-8">
                <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary/20 group-hover:border-primary transition-colors">
                  <AvatarImage data-ai-hint={member.hint} src={member.avatar} />
                  <AvatarFallback className="font-headline">{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-headline font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-body font-medium">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
