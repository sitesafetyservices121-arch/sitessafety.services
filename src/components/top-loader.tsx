
"use client";

import { useEffect, useState } from 'react';

export function TopLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setProgress((prev) => {
        if (prev >= 95) {
          cancelAnimationFrame(animationFrameId);
          return 95; // Stop just before 100%
        }
        return prev + 1;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-primary transition-all duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
