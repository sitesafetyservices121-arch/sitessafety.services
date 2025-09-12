
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
        // This effect should only run once on mount to initialize Vanta
        let effect: any = null;

        const initVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current) {
                effect = window.VANTA.NET({
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

        // Check if scripts are already loaded
        if (window.VANTA && window.THREE) {
            initVanta();
        }

        // Set a listener for when the scripts are loaded
        window.addEventListener('vanta-loaded', initVanta);

        // Cleanup function to destroy the effect when the component unmounts
        return () => {
            if (effect) {
                effect.destroy();
            }
            window.removeEventListener('vanta-loaded', initVanta);
        };
    }, []);

    const handleScriptsLoaded = () => {
      // Once both scripts are loaded, dispatch a custom event
      window.dispatchEvent(new Event('vanta-loaded'));
    };

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
                strategy="afterInteractive"
                onLoad={() => {
                  // This is a bit of a hack. We assume if three.js is loaded, 
                  // we can check if vanta is also ready to go.
                  if (document.querySelector('script[src="/vanta.net.min.js"]')) {
                    handleScriptsLoaded();
                  }
                }}
            />
             <Script
                src="/vanta.net.min.js"
                strategy="afterInteractive"
                onLoad={handleScriptsLoaded}
            />
            <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }} />
        </>
    );
};

export default VantaBackground;
