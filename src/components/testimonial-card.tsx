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
    <Card className="h-full flex flex-col bg-card border-border/80 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-accent hover:shadow-accent/10">
      <CardContent className="p-8 flex flex-col flex-grow">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("h-5 w-5 text-yellow-400", i < rating ? 'fill-yellow-400' : 'fill-muted stroke-muted-foreground')} />
          ))}
        </div>
        <blockquote className="text-primary/90 font-body italic flex-grow text-lg border-l-4 border-accent pl-6 my-4">
            "{testimonial}"
        </blockquote>
         <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border/80">
          <Avatar className="h-14 w-14 border-2 border-accent/30">
            <AvatarImage src={image} alt={name} data-ai-hint={hint} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-headline font-semibold text-lg text-primary">{name}</p>
            <p className="text-sm text-muted-foreground font-body">{title}, {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
