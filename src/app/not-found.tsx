
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-24">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>The page you are looking for does not exist.</p>
          <Link href="/" className="inline-block mt-4">
            <span className="underline font-semibold text-primary">Go back to homepage</span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
