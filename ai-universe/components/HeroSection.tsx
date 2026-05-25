'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrameCanvas from './FrameCanvas';
import SectionIndicator from './SectionIndicator';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '10K+', label: 'AI TOOLS' },
  { value: '500+', label: 'AI APIS' },
  { value: '50+', label: 'AI CATEGORIES' },
  { value: '24/7', label: 'SMART ASSISTANT' },
];

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '1.35rem',
        fontWeight: 700,
        color: 'white',
        letterSpacing: '0.05em',
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.58rem',
        letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

/* Floating blue particle dot */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      background: '#00A8FF',
      boxShadow: '0 0 6px rgba(0,168,255,0.9), 0 0 12px rgba(0,168,255,0.4)',
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

/* Red floating particle */
function RedParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      background: '#FF2D2D',
      boxShadow: '0 0 6px rgba(255,45,45,0.9), 0 0 12px rgba(255,45,45,0.4)',
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

/* Data visualization line (like in reference bg) */
function DataLine({ style }: { style: React.CSSProperties }) {
  return (
    <div style={{
      position: 'absolute',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(0,168,255,0.35), rgba(0,168,255,0.15), transparent)',
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0, y: 60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(canvasWrapRef.current, {
        opacity: 0, x: 60, duration: 1.2, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(statsRef.current, {
        opacity: 0, y: 30, duration: 0.8, delay: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '72px',
        paddingBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
      }}
    >
      {/* ── Deep background gradient (right side blue atmospheric) ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 75% 50%, #0A1628 0%, #050A18 40%, transparent 70%)',
      }} />

      {/* ── Left-side blue ambient haze ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 15% 60%, rgba(0,168,255,0.07) 0%, transparent 55%)',
      }} />

      {/* ── Red glow — right side atmosphere ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 85% 30%, rgba(255,45,45,0.09) 0%, transparent 45%)',
      }} />

      {/* ── Data visualization lines (background) ── */}
      {[12, 22, 32, 42, 55, 65, 75].map((top, i) => (
        <DataLine key={i} style={{
          top: `${top}%`, left: '40%', right: 0,
          opacity: 0.4 + (i % 3) * 0.15,
          width: `${30 + (i * 7) % 25}%`,
        }} />
      ))}

      {/* ── Scanline overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)',
      }} />

      {/* ── Section number ── */}
      <div style={{
        position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
      }}>
        <div style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '12px',
          letterSpacing: '4px',
          fontFamily: "'Orbitron', sans-serif"
        }}>
          01
        </div>
        <div style={{
          width: '6px', height: '6px', background: '#FF2D2D', borderRadius: '50%', boxShadow: '0 0 8px #FF2D2D'
        }} />
      </div>

      {/* ════════════════════════════════════════════
          ROBOT CANVAS — fills entire right portion,
          bleeds into background (NO box/border)
      ════════════════════════════════════════════ */}
      <div
        ref={canvasWrapRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* ── Atmospheric background BEHIND robot ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 55% 35%, #0D1B3E 0%, #050A18 50%, transparent 80%)',
          zIndex: 0,
        }} />

        {/* ── Red radial glow behind robot head (upper-right area) ── */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '8%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(255,45,45,0.28) 0%, rgba(255,45,45,0.1) 35%, transparent 65%)',
          filter: 'blur(18px)',
          zIndex: 1,
          animation: 'pulseRing 3s ease-in-out infinite',
        }} />

        {/* ── Blue ambient glow left side of robot ── */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          width: '40%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(0,168,255,0.18) 0%, transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 1,
        }} />

        {/* ── The actual animated canvas (no border, full bleed) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          // CSS mask: fade in from left edge, fade at bottom
          maskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 18%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}>
          <FrameCanvas
            framesDir="ai-frames"
            frameCount={240}
            fps={30}
            width={1200}
            height={900}
            className=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* ── Dark vignette edges ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 60% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }} />



        {/* ── Floating blue particles ── */}
        <Particle style={{ width: 5, height: 5, top: '18%', left: '8%',  animation: 'float1 5s ease-in-out infinite', animationDelay: '0s'    }} />
        <Particle style={{ width: 3, height: 3, top: '35%', left: '3%',  animation: 'float2 4s ease-in-out infinite', animationDelay: '0.6s'   }} />
        <Particle style={{ width: 4, height: 4, top: '52%', left: '12%', animation: 'float3 6s ease-in-out infinite', animationDelay: '1.2s'   }} />
        <Particle style={{ width: 3, height: 3, top: '65%', left: '6%',  animation: 'float1 4.5s ease-in-out infinite', animationDelay: '0.3s' }} />
        <Particle style={{ width: 6, height: 6, top: '22%', left: '28%', animation: 'float2 5.5s ease-in-out infinite', animationDelay: '0.9s' }} />
        <Particle style={{ width: 3, height: 3, top: '75%', left: '20%', animation: 'float3 5s ease-in-out infinite', animationDelay: '1.5s'   }} />
        <Particle style={{ width: 4, height: 4, top: '42%', left: '40%', animation: 'float1 6s ease-in-out infinite', animationDelay: '2s'     }} />
        <Particle style={{ width: 2, height: 2, top: '58%', left: '35%', animation: 'float2 4s ease-in-out infinite', animationDelay: '0.4s'   }} />

        {/* ── Floating red particles (right side) ── */}
        <RedParticle style={{ width: 4, height: 4, top: '15%', right: '5%',  animation: 'float3 5s ease-in-out infinite', animationDelay: '0.7s'  }} />
        <RedParticle style={{ width: 3, height: 3, top: '38%', right: '12%', animation: 'float1 4s ease-in-out infinite', animationDelay: '1.1s'  }} />
        <RedParticle style={{ width: 5, height: 5, top: '62%', right: '8%',  animation: 'float2 5.5s ease-in-out infinite', animationDelay: '0.2s' }} />
        <RedParticle style={{ width: 3, height: 3, top: '80%', right: '20%', animation: 'float3 4.5s ease-in-out infinite', animationDelay: '1.8s' }} />
      </div>

      {/* ════════════════════════════════════════════
          LEFT CONTENT
      ════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: '5rem',
        paddingRight: '2rem',
        paddingTop: '2rem',
        paddingBottom: '4rem',
      }}>
        <div
          ref={leftRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
            maxWidth: '520px',
          }}
        >
          {/* Welcome tag */}
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.45em',
            color: 'rgba(255,255,255,0.38)',
            textTransform: 'uppercase',
          }}>
            WELCOME TO
          </div>

          {/* Giant heading */}
          <div style={{ lineHeight: 1, marginBottom: '0.2rem' }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(70px, 10vw, 118px)',
              fontWeight: 900,
              color: '#FF2D2D',
              textShadow: '0 0 30px rgba(255,45,45,0.75), 0 0 60px rgba(255,45,45,0.35), 0 0 100px rgba(255,45,45,0.12)',
              lineHeight: 1,
            }}>
              AI
            </div>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(58px, 8vw, 98px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 0 40px rgba(255,255,255,0.08)',
            }}>
              UNIVERSE
            </div>
          </div>

          {/* Subtext */}
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.05rem',
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.5,
          }}>
            Discover, Compare and Explore<br />
            the Best AI Tools in the World.
          </p>

          {/* Body */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.865rem',
            color: 'rgba(255,255,255,0.46)',
            lineHeight: 1.85,
            maxWidth: '420px',
          }}>
            Your gateway to everything AI —<br />
            from chatbots and coding assistants<br />
            to video generation, APIs and automation tools.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '0.2rem' }}>
            <button className="btn-red">
              EXPLORE AI TOOLS <span>→</span>
            </button>
            <button className="btn-outline">
              <span style={{
                width: 28, height: 28,
                border: '1.5px solid rgba(255,255,255,0.55)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
              }}>▶</span>
              WATCH VIDEO
            </button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: 'flex',
              gap: '0',
              alignItems: 'center',
              paddingTop: '1.2rem',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              marginTop: '0.4rem',
            }}
          >
            {STATS.map((stat, idx) => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
                <StatCounter value={stat.value} label={stat.label} />
                {idx < STATS.length - 1 && (
                  <div style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18), transparent)', margin: '0 1.2rem' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll to discover ── */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
      }}>
        <style>{`
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'scrollBounce 1.5s infinite' }}>
          <svg width="20" height="30" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <rect x="5" y="2" width="14" height="32" rx="7" />
            <line x1="12" y1="10" x2="12" y2="14" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '3px', fontFamily: "'Orbitron', sans-serif" }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
}
