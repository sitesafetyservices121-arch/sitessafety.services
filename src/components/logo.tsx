import * as React from "react";
import Image from "next/image";
import imageData from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export const Logo = ({ className }: LogoProps) => (
    <div className={cn("relative", className)}>
        <Image 
            src={imageData.meta.favicon.url}
            alt="RAK-Site Safety Services Logo"
            fill
            style={{ objectFit: 'contain' }}
            sizes="10vw"
            priority
        />
    </div>
);
