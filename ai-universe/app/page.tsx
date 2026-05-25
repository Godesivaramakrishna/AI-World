'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Section02 from '../components/Section02';
import Section03 from '../components/Section03';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../components/Footer';

// Dynamic imports for client-only components that use browser APIs
const NeuralBackground = dynamic(() => import('../components/NeuralBackground'), { ssr: false });
const CustomCursor = dynamic(() => import('../components/CustomCursor'), { ssr: false });

function SectionDivider() {
  return (
    <div
      style={{
        position: 'relative',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)',
        margin: '0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FF2D2D',
          boxShadow: '0 0 16px rgba(255,45,45,0.8), 0 0 32px rgba(255,45,45,0.4)',
        }}
      />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    // Smooth scroll with lenis
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    // Page fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <main style={{ position: 'relative', background: '#000000', overflowX: 'hidden' }}>
      {/* Fixed overlays */}
      <NeuralBackground />
      <CustomCursor />
      <ScrollProgress />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <HeroSection />

      <SectionDivider />

      <Section02 />

      <SectionDivider />

      <Section03 />

      {/* Footer */}
      <Footer />
    </main>
  );
}
