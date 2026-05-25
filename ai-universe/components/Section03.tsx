'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameCanvas from './FrameCanvas';
import SectionIndicator from './SectionIndicator';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-3.04-3.04 2.5 2.5 0 0 1 .46-4.96A2.5 2.5 0 0 1 9.5 2z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 3.04-3.04 2.5 2.5 0 0 0-.46-4.96A2.5 2.5 0 0 0 14.5 2z"/>
      </svg>
    ),
    title: 'AI Categories',
    desc: 'Explore every AI domain from one centralized platform.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'API Learning Hub',
    desc: 'Learn APIs, integrations and AI workflows easily.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    title: 'Future Ready',
    desc: 'Built for the next generation of AI innovation.',
  },
];

export default function Section03() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      itemsRef.current.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: 40,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-03"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* Section number */}
      <SectionIndicator number="03" />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,168,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '52% 48%',
          minHeight: '100vh',
          alignItems: 'center',
          padding: '80px 60px 80px 80px',
          gap: '60px',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* LEFT - Cube canvas */}
        <div ref={leftRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
          
          {/* Subtle dark gradient behind cube */}
          <div style={{ position: 'absolute', inset: '-20%', background: 'radial-gradient(ellipse at center, rgba(0,30,60,0.4) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />

          {/* Panel */}
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              height: '600px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(0,168,255,0.2)',
              position: 'relative',
              boxShadow: '0 0 25px rgba(0,168,255,0.1), 0 0 50px rgba(0,168,255,0.05)',
            }}
          >

            {/* Canvas */}
            <FrameCanvas
              framesDir="cube-frames"
              frameCount={240}
              fps={30}
              width={800}
              height={800}
              className=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }}
            />

            {/* Blue rotating ring glow */}
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: 40,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(0,168,255,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'pulseRing 2s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />

            {/* Floating particle dust */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: '#00A8FF',
                  boxShadow: '0 0 6px rgba(0,168,255,0.8)',
                  top: `${20 + (i * 10) % 60}%`,
                  left: `${10 + (i * 12) % 80}%`,
                  animation: `float${(i % 3) + 1} ${4 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                  zIndex: 6,
                }}
              />
            ))}

            {/* Radial blue bloom */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(0,168,255,0.05) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            />

            {/* Blue inner vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.5) 100%)',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />

            {/* HUD pulsing dot */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
              <div className="pulse-dot" style={{ background: '#FF2D2D', boxShadow: '0 0 8px rgba(255,45,45,0.8)' }} />
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', color: '#FF2D2D', letterSpacing: '0.2em' }}>LIVE</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '20px', justifyContent: 'center' }}>
          {/* Tag */}
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: '#FF2D2D',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF2D2D', boxShadow: '0 0 8px rgba(255,45,45,0.8)' }} />
            LIVE AI ECOSYSTEM
          </span>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'white',
            }}
          >
            The Future Hub
            <br />
            <span
              style={{
                color: '#FF2D2D',
                textShadow: '0 0 25px rgba(255,45,45,0.6)',
              }}
            >
              of Artificial
            </span>{' '}
            <span style={{ color: 'white' }}>Intelligence</span>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              maxWidth: '380px',
            }}
          >
            AI Universe connects AI tools, developers, APIs and intelligent systems into one powerful futuristic ecosystem.
          </p>

          {/* Feature items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="feature-item"
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
              >
                <div className="feature-item-icon">
                  {feat.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: '3px',
                    }}
                  >
                    {feat.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {feat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Explore link */}
          <div className="animated-link" style={{ marginTop: '0.5rem', color: 'white' }}>
            <span>EXPLORE ECOSYSTEM</span>
            <div className="link-line" style={{ width: '40px' }} />
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
