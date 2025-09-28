
"use client";

import { useState, useEffect, useRef } from 'react';

// Extend the Window interface to include VANTA
declare global {
    interface Window {
        VANTA: any;
    }
}

const VantaBackground = () => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.VANTA && !vantaEffect && vantaRef.current) {
            const effect = window.VANTA.NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xff9b50,
                backgroundColor: 0x101010,
                points: 10.00,
                maxDistance: 25.00,
                spacing: 20.00
            });
            setVantaEffect(effect);
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    return (
        <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }} />
    );
};

export default VantaBackground;
