'use client';

import { useEffect, useRef, useCallback, CSSProperties } from 'react';

interface FrameCanvasProps {
  framesDir: string;
  frameCount: number;
  fps?: number;
  className?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export default function FrameCanvas({
  framesDir,
  frameCount,
  fps = 30,
  className = '',
  width = 800,
  height = 600,
  style,
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  const padNum = (n: number) => String(n).padStart(4, '0');

  const preloadFrames = useCallback(async () => {
    const images: HTMLImageElement[] = new Array(frameCount);
    const interval = 1000 / fps;

    const loadPromises = Array.from({ length: frameCount }, (_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `/${framesDir}/frame_${padNum(i + 1)}.webp`;
        img.onload = () => { images[i] = img; resolve(); };
        img.onerror = () => { images[i] = img; resolve(); };
      });
    });

    await Promise.all(loadPromises);
    framesRef.current = images;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw first frame immediately
    const first = images[0];
    if (first?.naturalWidth > 0) ctx.drawImage(first, 0, 0, canvas.width, canvas.height);

    const animate = (timestamp: number) => {
      if (timestamp - lastTimeRef.current >= interval) {
        lastTimeRef.current = timestamp;
        const frame = framesRef.current[currentFrameRef.current];
        if (frame?.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }
        currentFrameRef.current = (currentFrameRef.current + 1) % frameCount;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [framesDir, frameCount, fps]);

  useEffect(() => {
    preloadFrames();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [preloadFrames]);

  const defaultStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ ...defaultStyle, ...style }}
    />
  );
}
