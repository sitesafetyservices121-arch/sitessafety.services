import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  title: string;
  company: string;
  image?: string;
  testimonial: string;
  rating: number;
};

export function TestimonialCard({ name, title, company, testimonial, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col bg-white dark:bg-card">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={`https://placehold.co/40x40.png`} alt={name} data-ai-hint="person" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-primary">{name}</p>
            <p className="text-sm text-muted-foreground">{title}, {company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <p className="text-muted-foreground italic flex-grow">"{testimonial}"</p>
      </CardContent>
    </Card>
  );
}
