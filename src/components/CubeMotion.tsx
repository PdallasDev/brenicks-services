"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Scroll motion for the cube, after the Escher plate in brenicks.com's Atelier:
 * - every STEP pixels of scroll, the face colours rotate to the next palette
 *   (set as data-state="0|1|2"; CSS fades each face with a small stagger)
 * - --s (0–1) drives a gentle parallax lift and turn
 * - --mx (-1–1) tilts the cube toward the pointer on mouse devices
 */
const STEP = 140; // px of scroll per colour turn
const RANGE = 500; // px of scroll over which --s goes from 0 to 1

export default function CubeMotion({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.dataset.state = String(Math.floor(y / STEP) % 3);
      el.style.setProperty("--s", Math.min(y / RANGE, 1).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onPointer = (e: PointerEvent) => {
      el.style.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    };
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={ref} className={className} data-state="0">
      {children}
    </div>
  );
}
