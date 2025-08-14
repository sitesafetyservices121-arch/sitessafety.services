import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Target, Users } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

const teamMembers = [
  { name: "John Doe", role: "Founder & Lead Safety Consultant", avatar: "/avatars/01.png", initials: "JD" },
  { name: "Jane Smith", role: "Operations Manager", avatar: "/avatars/02.png", initials: "JS" },
  { name: "Mike Johnson", role: "Senior Safety Officer", avatar: "/avatars/03.png", initials: "MJ" },
];

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">About RAK-Site Safety Services</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Dedicated to fostering secure, compliant, and productive work environments through expert safety solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit">
              <Building className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="mt-4 text-primary">Our History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Founded in 2010, RAK-Site Safety has grown from a small consultancy to a leading provider of occupational health and safety services across the region.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit">
              <Target className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="mt-4 text-primary">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To protect people, property, and the environment by delivering the highest quality safety services, training, and systems to our clients.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="mt-4 text-primary">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">To be the most trusted name in workplace safety, setting new standards for excellence and innovation in the industry.</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage data-ai-hint="person professional" src={`https://placehold.co/100x100.png`} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                <p className="text-accent">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
