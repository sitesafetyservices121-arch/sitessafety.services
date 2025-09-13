
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
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaScriptLoaded = useRef(false);

    const initVanta = () => {
        if (vantaEffect || !vantaScriptLoaded.current || !window.VANTA || !window.THREE || !vantaRef.current) {
            return;
        }

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
    };

    useEffect(() => {
        if (vantaScriptLoaded.current) {
            initVanta();
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vantaScriptLoaded.current]);

    const handleVantaLoad = () => {
        vantaScriptLoaded.current = true;
        initVanta();
    };

    return (
        <>
            <Script
                src="/vanta.net.min.js"
                strategy="lazyOnload"
                onLoad={handleVantaLoad}
            />
            <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }} />
        </>
    );
};

export default VantaBackground;
