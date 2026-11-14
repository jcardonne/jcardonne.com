"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * `fit` is the font size as a fraction of the container width that makes the
 * line span 97% of it at the resting axis values (Archivo, wdth 100, wght 800).
 */
const LINES = [
  { text: "JEAN", fit: 0.339 },
  { text: "CARDONNE", fit: 0.1596 },
];

const REST_WIDTH = 100;
const REST_WEIGHT = 800;
const WIDTH_SWING = 60;
const WEIGHT_SWING = 110;
/** Reach of the swell, as a fraction of the line. */
const SPREAD = 0.16;
const POINTER_HOLD_MS = 2500;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function KineticName() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-line]")).map((line) =>
      Array.from(line.querySelectorAll<HTMLElement>("[data-letter]")),
    );

    let bounds = root.getBoundingClientRect();
    let pointerFocus = 0.5;
    let pointerAt = -Infinity;
    let focus = 0.5;
    let strength = 0;
    let clock = 0;
    let previous = performance.now();
    let frame = 0;
    let onScreen = true;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      clock += dt;

      // The swell follows the pointer, and drifts across the name when left alone.
      const following = now - pointerAt < POINTER_HOLD_MS;
      const target = following ? pointerFocus : 0.5 + 0.5 * Math.sin(clock * 0.45);
      focus += (target - focus) * (1 - Math.exp(-dt * (following ? 9 : 2.5)));
      strength += (1 - strength) * (1 - Math.exp(-dt * 1.2));

      for (const letters of lines) {
        const count = letters.length;
        const gains = letters.map((_, i) =>
          Math.exp(-(((i + 0.5) / count - focus) ** 2) / (2 * SPREAD * SPREAD)),
        );
        // Subtracting the mean keeps the summed width near constant, so the line never outgrows its box.
        const mean = gains.reduce((sum, gain) => sum + gain, 0) / count;
        letters.forEach((letter, i) => {
          const swell = strength * (gains[i] - mean);
          letter.style.setProperty("--w", clamp(REST_WIDTH + WIDTH_SWING * swell, 62, 125).toFixed(1));
          letter.style.setProperty("--g", clamp(REST_WEIGHT + WEIGHT_SWING * swell, 100, 900).toFixed(0));
        });
      }
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (onScreen && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerFocus = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      pointerAt = performance.now();
    };
    const onResize = () => {
      bounds = root.getBoundingClientRect();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      run();
    });
    observer.observe(root);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", run);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", run);
    };
  }, []);

  return (
    <h1 ref={ref} className="fit select-none">
      <span className="sr-only">Jean Cardonne</span>
      {LINES.map((line) => (
        <span
          key={line.text}
          data-line
          aria-hidden="true"
          className="kinetic-line mt-[0.07em] first:mt-0"
          style={{ "--fit": line.fit } as CSSProperties}
        >
          {Array.from(line.text).map((letter, i) => (
            <span key={i} data-letter className="kinetic-letter">
              {letter}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
