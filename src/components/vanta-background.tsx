
"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

// Dynamically import Vanta and THREE to ensure they only run on the client
let NET: any = null;
let THREE: any = null;

if (typeof window !== 'undefined') {
  import('vanta/dist/vanta.net.min.js').then((vanta) => {
    NET = vanta.default;
  });
  import('three').then((three) => {
    THREE = three;
  });
}

export const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!vantaEffect && NET && THREE) {
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
      vantaEffect.setOptions({
        color: resolvedTheme === 'dark' ? 0xff8800 : 0xff8800,
        backgroundColor: resolvedTheme === 'dark' ? 0x11111d : 0xfafafa,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 15.00
      });
    }
  }, [vantaEffect, resolvedTheme]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};
