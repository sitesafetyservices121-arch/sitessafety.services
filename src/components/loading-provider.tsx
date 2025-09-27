"use client";

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingSpinner } from './ui/loading-spinner';

function LoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  // This effect will run when navigation starts (e.g., before a new page loads)
  // and when it completes.
  // For App Router, there isn't a direct `router.events` like in Pages Router.
  // We can simulate this by setting loading to true on link clicks
  // and then setting it to false when the page renders (as above).
  // However, a more robust solution for App Router often involves a custom
  // loading.tsx file or a global loading state managed differently.
  // For now, we'll just show the spinner on initial load and hide it on route change complete.
  // To show it on button clicks, individual buttons would need to manage their own loading state
  // or a global context would be needed.

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <LoadingSpinner size="large" color="border-blue-500 border-t-blue-500" />
        </div>
      )}
    </>
  );
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <LoadingIndicator />
      </Suspense>
      {children}
    </>
  );
}