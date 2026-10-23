"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 6, unit: "", suffix: " Years", label: "Content Experience" },
  { target: 23, unit: "K+", suffix: "", label: "Instagram Followers" },
  { target: 8, unit: "+", suffix: "", label: "Brand Retainers" },
  { target: 100, unit: "+", suffix: "", label: "Promotions Delivered" },
];
const numberFormat = new Intl.NumberFormat("en-US");

export function FounderStats() {
  const element = useRef<HTMLDListElement>(null);
  // Render final values on the server and when JavaScript or motion is unavailable.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const list = element.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!list || preference.matches || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let startedAt: number | undefined;
    let lastPaint = -Infinity;
    const duration = 1200;
    const tick = (time: number) => {
      startedAt ??= time;
      const elapsed = Math.min((time - startedAt) / duration, 1);
      // Cap React updates around 30fps; the browser can still schedule each frame.
      if (elapsed === 1 || time - lastPaint >= 32) {
        setProgress(1 - Math.pow(1 - elapsed, 3));
        lastPaint = time;
      }
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      setProgress(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.2 });
    const onPreferenceChange = () => {
      if (!preference.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setProgress(1);
    };

    observer.observe(list);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <dl className="founder-stats" ref={element}>
      {stats.map((stat) => (
        <div className="founder-stat" key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>
            <span className="sr-only">{numberFormat.format(stat.target)}{stat.unit}{stat.suffix}</span>
            <span aria-hidden="true">
              {numberFormat.format(Math.floor(stat.target * progress))}{stat.unit}
              {stat.suffix && <span className="founder-stat-suffix">{stat.suffix}</span>}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
