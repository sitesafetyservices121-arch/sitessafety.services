
"use client";

import { useState, useEffect, useRef } from 'react';

// Extend the Window interface to include VANTA
declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

let vantaEffect: any = null;

export const VantaBackground = () => {
    const vantaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isMounted = true;
        const vantaScript = document.createElement('script');
        vantaScript.src = '/vanta.net.min.js';
        vantaScript.async = true;
        
        const initVanta = () => {
            if (isMounted && window.VANTA && window.THREE && vantaRef.current && !vantaEffect) {
                vantaEffect = window.VANTA.NET({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x8c8c8c,
                    backgroundColor: 0x0,
                    points: 10.00,
                    maxDistance: 25.00,
                    spacing: 20.00
                });
            }
        };

        const loadAndInit = () => {
            if (window.VANTA) {
                 initVanta();
            } else {
                document.body.appendChild(vantaScript);
                vantaScript.onload = initVanta;
            }
        };

        // Check if three.js is already loaded
        if (window.THREE) {
           loadAndInit();
        } else {
            // Wait for the three.js script from the layout to load
            const checkThree = setInterval(() => {
                if (window.THREE) {
                    clearInterval(checkThree);
                    loadAndInit();
                }
            }, 100);
        }

        return () => {
            isMounted = false;
            // We don't destroy the effect to keep it running across pages
            try {
                if (vantaScript.parentNode) {
                    vantaScript.parentNode.removeChild(vantaScript);
                }
            } catch (e) {
                // ignore
            }
        };
    }, []);

    return (
        <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }} />
    );
};

    