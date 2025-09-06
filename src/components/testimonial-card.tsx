import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  name: string;
  title: string;
  company: string;
  image?: string;
  testimonial: string;
  rating: number;
  hint?: string;
};

export function TestimonialCard({ name, title, company, image, testimonial, rating, hint }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card border shadow-sm rounded-lg">
      <CardContent className="p-8 flex flex-col flex-grow">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("h-5 w-5 text-yellow-400", i < rating ? 'fill-yellow-400' : 'fill-muted stroke-muted-foreground')} />
          ))}
        </div>
        <blockquote className="text-foreground/90 font-body italic flex-grow text-lg border-l-4 border-accent pl-6 my-4">
            "{testimonial}"
        </blockquote>
         <div className="flex items-center gap-4 mt-6 pt-6 border-t">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={image} alt={name} data-ai-hint={hint} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-headline font-semibold text-lg text-primary-dark">{name}</p>
            <p className="text-sm text-muted-foreground font-body">{title}, {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
