import * as React from "react";

export const ProudlySaLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className="text-white"
        >
        <rect width="200" height="70" fill="transparent" />
        
        <circle cx="35" cy="35" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        
        <path d="M35 5 A 30 30 0 0 1 35 65" fill="none" stroke="black" strokeWidth="10" />
        <path d="M35 5 A 30 30 0 0 1 60 20" fill="none" stroke="#E03C31" strokeWidth="10" />
        <path d="M35 65 A 30 30 0 0 1 10 50" fill="none" stroke="#007749" strokeWidth="10" />
        <path d="M10 20 L 60 50" fill="none" stroke="white" strokeWidth="12" />
        <path d="M10 20 L 60 50" fill="none" stroke="#007749" strokeWidth="8" />
        <path d="M10 50 L 60 20" fill="none" stroke="white" strokeWidth="12" />
        <path d="M10 50 L 60 20" fill="none" stroke="#007749" strokeWidth="8" />
        <path d="M10 20 L 10 50" fill="none" stroke="white" strokeWidth="12" />
        <path d="M10 20 L 10 50" fill="none" stroke="#FFB612" strokeWidth="8" />
        <path d=" M 60 20 L 60 50" fill="none" stroke="white" strokeWidth="12" />
        <path d=" M 60 20 L 60 50" fill="none" stroke="#002366" strokeWidth="8" />

        <text x="80" y="28" fontFamily="Arial, sans-serif" fontSize="14" fill="currentColor" fontWeight="bold">PROUDLY</text>
        <text x="80" y="48" fontFamily="Arial, sans-serif" fontSize="14" fill="currentColor" fontWeight="bold">SOUTH AFRICAN</text>
        <text x="80" y="62" fontFamily="Arial, sans-serif" fontSize="8" fill="currentColor">MEMBER</text>
    </svg>
);
