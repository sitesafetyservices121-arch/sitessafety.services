import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
};

export function TestimonialCard({ name, title, company, image, testimonial, rating }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card border-2 border-border">
      <CardContent className="pt-6 flex flex-col flex-grow">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn("h-5 w-5", i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500')} />
          ))}
        </div>
        <p className="text-foreground font-body italic flex-grow text-lg">"{testimonial}"</p>
         <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt={name} data-ai-hint="person" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-headline font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground font-body">{title}, {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
