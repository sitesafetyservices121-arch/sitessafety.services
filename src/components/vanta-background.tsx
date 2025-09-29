"use client";

import { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min.js';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    if (vantaEffect) {
      if (resolvedTheme === 'dark') {
        vantaEffect.setOptions({
          color: 0xff8800,
          backgroundColor: 0x11111d,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 15.00
        });
      } else {
        vantaEffect.setOptions({
          color: 0xff8800,
          backgroundColor: 0xfafafa,
          points: 10.00,
          maxDistance: 20.00,
          spacing: 15.00
        });
      }
    }
  }, [vantaEffect, resolvedTheme]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};
