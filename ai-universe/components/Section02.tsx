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
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
      </svg>
    ),
    title: 'AI Tool Discovery',
    desc: 'Explore thousands of AI tools across every category.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="18" y="3" width="4" height="18" />
        <rect x="10" y="8" width="4" height="13" />
        <rect x="2" y="13" width="4" height="8" />
      </svg>
    ),
    title: 'AI Comparison System',
    desc: 'Compare pricing, APIs, features and capabilities instantly.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18h8M10 18v-4l4-4 4 4" />
        <circle cx="18" cy="14" r="2" />
        <circle cx="6" cy="18" r="2" />
      </svg>
    ),
    title: 'Smart Recommendations',
    desc: 'Get personalized AI suggestions based on your needs and workflow.',
  },
];

export default function Section02() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: -40,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-02"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5rem',
        paddingRight: '2rem',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Section number */}
      <SectionIndicator number="02" />

      {/* Ambient blue glow */}
      <div style={{ position: 'absolute', top: '20%', right: '30%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,168,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Tag */}
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: '#FF2D2D',
              textTransform: 'uppercase',
            }}
          >
            AI DISCOVERY PLATFORM
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
            Everything AI
            <br />
            In One{' '}
            <span
              style={{
                color: '#00A8FF',
                textShadow: '0 0 20px rgba(0,168,255,0.5)',
              }}
            >
              Universe
            </span>
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8,
              maxWidth: '420px',
            }}
          >
            AI Universe helps users discover, compare and learn the world's best AI tools, APIs and intelligent platforms.
          </p>

          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="feature-card"
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
              >
                <div className="feature-icon-box">
                  {feat.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: '4px',
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

          {/* Discover more link */}
          <div className="animated-link" style={{ marginTop: '0.5rem' }}>
            <span>DISCOVER AI</span>
            <div className="link-line" />
            <span>→</span>
          </div>
        </div>

        {/* RIGHT - AI Video canvas with holographic panel */}
        <div ref={rightRef} style={{ position: 'relative' }}>
          {/* Holographic panel */}
          <div
            style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: '8px' }}
          >
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '1px solid rgba(0,168,255,0.4)', borderLeft: '1px solid rgba(0,168,255,0.4)', zIndex: 10 }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderTop: '1px solid rgba(0,168,255,0.4)', borderRight: '1px solid rgba(0,168,255,0.4)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderBottom: '1px solid rgba(0,168,255,0.4)', borderLeft: '1px solid rgba(0,168,255,0.4)', zIndex: 10 }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '1px solid rgba(0,168,255,0.4)', borderRight: '1px solid rgba(0,168,255,0.4)', zIndex: 10 }} />

            {/* Scan line */}
            <div className="scan-line" style={{ zIndex: 9 }} />

            {/* Canvas */}
            <FrameCanvas
              framesDir="robot-frames"
              frameCount={240}
              fps={30}
              width={800}
              height={600}
              className="w-full h-full"
            />

            {/* Blue inner glow vignette */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,168,255,0.1) 100%)',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />

            {/* HUD pulsing dots */}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 6 }}>
              <div className="pulse-dot" />
              <div className="pulse-dot" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* HUD data readout */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 0,
                right: 0,
                overflow: 'hidden',
                zIndex: 10,
                padding: '4px 12px',
                background: 'rgba(0,0,0,0.5)',
                borderTop: '1px solid rgba(0,168,255,0.2)',
              }}
            >
              <div className="hud-data">
                CHAT AI | IMAGE AI | VIDEO AI | VOICE AI | CODING AI | WEBSITE AI | AUTOMATION AI | API HUB | AI ASSISTANT | PRODUCTIVITY AI |&nbsp;&nbsp;
                CHAT AI | IMAGE AI | VIDEO AI | VOICE AI | CODING AI | WEBSITE AI | AUTOMATION AI | API HUB | AI ASSISTANT | PRODUCTIVITY AI |&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
