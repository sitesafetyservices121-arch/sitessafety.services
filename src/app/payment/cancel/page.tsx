
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
        <Card className="max-w-md mx-auto text-center">
            <CardHeader>
                <div className="mx-auto bg-destructive text-destructive-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-destructive">Payment Cancelled</CardTitle>
                <CardDescription>
                    Your payment was not completed. You can try again or contact us for assistance if you encountered an issue.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center gap-4">
                <Button asChild variant="outline">
                    <Link href="/pay">Try Again</Link>
                </Button>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}
