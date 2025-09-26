"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'medium', color = 'border-blue-500', ...props }, ref) => {
    const spinnerSize = {
      small: 'h-6 w-6',
      medium: 'h-10 w-10',
      large: 'h-16 w-16',
    }[size];

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-4 border-t-4 border-gray-200 ease-linear',
          spinnerSize,
          color,
          className
        )}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };
