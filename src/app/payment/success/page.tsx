
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
        <Card className="max-w-md mx-auto text-center">
            <CardHeader>
                <div className="mx-auto bg-success text-success-foreground w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-success">Payment Successful</CardTitle>
                <CardDescription>
                    Thank you for your payment. You will receive a confirmation email shortly. If you have any questions, please contact support.
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
