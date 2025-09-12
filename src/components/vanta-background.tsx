
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
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef(null);
    const threeScriptLoaded = useRef(false);
    const vantaScriptLoaded = useRef(false);

    const initVanta = () => {
        if (vantaEffect) return;

        if (threeScriptLoaded.current && vantaScriptLoaded.current && window.VANTA && vantaRef.current) {
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
    };

    useEffect(() => {
        initVanta();
        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]); // Re-run effect if vantaEffect changes, for cleanup.

    const handleThreeLoad = () => {
        threeScriptLoaded.current = true;
        initVanta();
    };

    const handleVantaLoad = () => {
        vantaScriptLoaded.current = true;
        initVanta();
    };

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="afterInteractive"
                onLoad={handleThreeLoad}
            />
             <Script
                src="/vanta.net.min.js"
                strategy="afterInteractive"
                onLoad={handleVantaLoad}
            />
            <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }} />
        </>
    );
};

export default VantaBackground;
