
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  title: string;
  company: string;
  testimonial: string;
  rating: number;
  image: {
    url: string;
    hint: string;
  };
};

export function TestimonialCard({ name, title, company, testimonial, rating, image }: TestimonialCardProps) {
  return (
    <Card className="bg-card border p-6 flex flex-col justify-between shadow-lg h-full">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
            <Image src={image.url} alt={name} fill style={{objectFit: "cover"}} data-ai-hint={image.hint} />
          </div>
          <div>
            <p className="font-bold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{title}, {company}</p>
          </div>
        </div>
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-muted-foreground italic">&quot;{testimonial}&quot;</p>
      </CardContent>
    </Card>
  );
}
