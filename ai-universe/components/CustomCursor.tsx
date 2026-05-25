'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animationFrameId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const addHoverEffects = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, label, select'
      );

      clickables.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.dataset.cursorBound) return;
        htmlEl.dataset.cursorBound = 'true';

        el.addEventListener('mouseenter', () => {
          if (dot && ring) {
            dot.style.width = '10px';
            dot.style.height = '10px';
            ring.style.width = '50px';
            ring.style.height = '50px';
            ring.style.borderColor = 'rgba(255,45,45,1)';
            ring.style.backgroundColor = 'rgba(255,45,45,0.06)';
          }
        });
        el.addEventListener('mouseleave', () => {
          if (dot && ring) {
            dot.style.width = '6px';
            dot.style.height = '6px';
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.borderColor = 'rgba(255,45,45,0.7)';
            ring.style.backgroundColor = 'transparent';
          }
        });
      });
    };

    addHoverEffects();
    const observer = new MutationObserver(() => addHoverEffects());
    observer.observe(document.body, { childList: true, subtree: true });

    const onMouseDown = () => {
      if (dot) dot.style.transform = 'translate(-50%,-50%) scale(0.7)';
      if (ring) ring.style.transform = 'translate(-50%,-50%) scale(0.85)';
    };
    const onMouseUp = () => {
      if (dot) dot.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    const onMouseLeave = () => {
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        /* Modal open state */
        body.modal-open #cursor-dot, body.modal-open #cursor-ring {
          display: none !important;
        }
        body.modal-open * {
          cursor: auto !important;
        }
        body.modal-open input, body.modal-open button {
          cursor: pointer !important;
        }
      `}</style>
      <div
        id="cursor-dot"
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          background: '#FF2D2D',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px #FF2D2D, 0 0 12px #FF2D2D, 0 0 20px rgba(255,45,45,0.6)',
          transition: 'transform 0.1s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          willChange: 'left, top',
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '36px',
          height: '36px',
          border: '1.5px solid rgba(255, 45, 45, 0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px rgba(255,45,45,0.3), inset 0 0 8px rgba(255,45,45,0.1)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, transform 0.1s ease',
          willChange: 'left, top',
          backgroundColor: 'transparent',
        }}
      />
    </>
  );
}
