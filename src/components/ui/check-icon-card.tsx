
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type CheckIconCardProps = {
    title: string;
    description: string;
};

export function CheckIconCard({ title, description }: CheckIconCardProps) {
    return (
        <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground">{title}</h4>
                        <p className="text-muted-foreground mt-1">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

    