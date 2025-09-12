
"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

// Extend the Window interface to include VANTA
declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

const VantaBackground = () => {
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    useEffect(() => {
        if (window.VANTA && vantaEffect === null) {
            const effect = window.VANTA.NET({
                el: vantaRef.current,
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x8c8c8c, // Silver-gray color for the lines
                backgroundColor: 0x0, // Black background
                points: 10.00,
                maxDistance: 25.00,
                spacing: 20.00
            });
            setVantaEffect(effect);
        }

        // Cleanup function to destroy the effect when the component unmounts
        return () => {
            if (vantaEffect) {
                (vantaEffect as any).destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    // After Three.js loads, load Vanta.js
                    const vantaScript = document.createElement('script');
                    vantaScript.src = '/vanta.net.min.js';
                    vantaScript.onload = () => {
                        // Manually trigger a state update if VANTA is ready
                        // This helps in case the component mounts before the script is fully parsed
                         if (window.VANTA) {
                           setVantaEffect(null); // Reset to trigger re-initialization
                           if (vantaEffect) (vantaEffect as any).destroy(); // Destroy old instance if exists
                         }
                    };
                    document.body.appendChild(vantaScript);
                }}
            />
            <div ref={vantaRef} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
        </>
    );
};

export default VantaBackground;
