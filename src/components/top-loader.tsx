"use client";

export function TopLoader() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] overflow-hidden">
      <div
        className="h-full bg-primary animate-pulse"
        style={{ animation: 'top-loader-animation 2s linear infinite' }}
      />
      <style jsx>{`
        @keyframes top-loader-animation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
