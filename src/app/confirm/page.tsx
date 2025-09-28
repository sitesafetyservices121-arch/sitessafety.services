
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Confirmation</CardTitle>
          <CardDescription>
            Thank you for your submission. We will be in touch with you soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
