'use client';
import { useEffect, useRef, CSSProperties } from 'react';

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
  fps = 15,
  className = '',
  width = 800,
  height = 600,
  style,
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    loadedCountRef.current = 0;
    currentFrameRef.current = 0;

    function drawFrame(index: number) {
      const img = images[index];
      if (!img || !canvas) return;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    function startLoop() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const ms = Math.round(1000 / fps);
      intervalRef.current = setInterval(() => {
        currentFrameRef.current =
          (currentFrameRef.current + 1) % images.length;
        drawFrame(currentFrameRef.current);
      }, ms);
    }

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(4, '0');
      const src = `/${framesDir}/frame_${num}.webp`;
      const img = new Image();

      img.onload = () => {
        images[i - 1] = img;
        loadedCountRef.current += 1;
        if (loadedCountRef.current === 1) {
          drawFrame(0);
        }
        if (loadedCountRef.current === frameCount) {
          framesRef.current = images;
          startLoop();
        }
      };

      img.onerror = () => {
        loadedCountRef.current += 1;
        if (loadedCountRef.current === frameCount) {
          framesRef.current = images;
          startLoop();
        }
      };

      img.src = src;
    }

    function handleVisibility() {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        if (!intervalRef.current && framesRef.current.length > 0) {
          startLoop();
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [framesDir, frameCount, fps]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ display: 'block', ...style }}
    />
  );
}
