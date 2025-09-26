
"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function TopLoader() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(0); // Reset progress on route change

    const timer = setTimeout(() => {
      setProgress(70); // Simulate progress
    }, 100);

    return () => {
      clearTimeout(timer);
      setProgress(100); // Complete progress on unmount or route change
    };
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-primary transition-all duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
