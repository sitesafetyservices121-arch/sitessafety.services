"use client";

import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentCancelledPage() {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Payment Cancelled</h1>
        <p className="mt-4 text-muted-foreground">
          Your payment was cancelled. If you experienced an issue, please try again or contact support.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
