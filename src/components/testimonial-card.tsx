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
  accentColor?: 'primary' | 'accent';
};

export function TestimonialCard({ name, title, company, image, testimonial, rating, accentColor = 'accent' }: TestimonialCardProps) {
  return (
    <Card className={cn(
      "h-full flex flex-col bg-card border-t-4",
      accentColor === 'primary' ? 'border-primary' : 'border-accent'
    )}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={image} alt={name} data-ai-hint="person" />
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
            <Star key={i} className={cn("h-5 w-5", i < rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300')} />
          ))}
        </div>
        <p className="text-muted-foreground italic flex-grow">"{testimonial}"</p>
      </CardContent>
    </Card>
  );
}
