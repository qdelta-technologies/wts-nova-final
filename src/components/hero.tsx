"use client";

import { useEffect, useRef } from "react";
import { Arrow, Sparkle } from "./icons";
import "./hero.css";

export function Hero() {
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = hero.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;

    const reset = () => {
      element?.style.setProperty("--hero-content-x", "0px");
      element?.style.setProperty("--hero-content-y", "0px");
      element?.style.setProperty("--hero-atmosphere-x", "0px");
      element?.style.setProperty("--hero-atmosphere-y", "0px");
      element?.style.setProperty("--hero-horizon-x", "0px");
    };
    const move = (event: PointerEvent) => {
      if (!element || reducedMotion.matches || !finePointer.matches) return;
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--hero-content-x", `${Math.round(x * -8)}px`);
        element.style.setProperty("--hero-content-y", `${Math.round(y * -5)}px`);
        element.style.setProperty("--hero-atmosphere-x", `${Math.round(x * 18)}px`);
        element.style.setProperty("--hero-atmosphere-y", `${Math.round(y * 12)}px`);
        element.style.setProperty("--hero-horizon-x", `${Math.round(x * -14)}px`);
      });
    };

    element?.addEventListener("pointermove", move, { passive: true });
    element?.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      element?.removeEventListener("pointermove", move);
      element?.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
    };
  }, []);

  return (
    <section ref={hero} aria-labelledby="hero-heading" className="hero">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-particles">
          {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
        </div>
        <svg className="hero-horizon" viewBox="0 0 1440 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="hero-arc-edge" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#66A3BF" stopOpacity=".5" />
              <stop offset=".5" stopColor="#F2EFE7" stopOpacity=".9" />
              <stop offset="1" stopColor="#66A3BF" stopOpacity=".5" />
            </linearGradient>
            <filter id="hero-arc-glow" x="-30%" y="-80%" width="160%" height="260%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="hero-arc-soft" x="-20%" y="-40%" width="140%" height="180%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <path d="M-120 0C240 350 1200 350 1560 0" stroke="#3368A0" strokeWidth="48" opacity=".6" filter="url(#hero-arc-glow)" />
          <path d="M-120 0C240 350 1200 350 1560 0" stroke="#66A3BF" strokeWidth="9" opacity=".55" filter="url(#hero-arc-soft)" />
          <path d="M-120 0C240 350 1200 350 1560 0" stroke="url(#hero-arc-edge)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="hero-content">
        <div className="hero-label entrance delay-1"><Sparkle className="h-3 w-3 shrink-0 text-blue" /><span>YOUR SOCIAL MEDIA MANAGEMENT TEAM</span></div>
        <h1 id="hero-heading" className="hero-heading entrance delay-2">
          <span className="headline-business">You Focus on Your Business.</span>
          <em className="headline-social">We Handle Your Social Media.</em>
        </h1>
        <p className="hero-description entrance delay-3">We help businesses build a stronger social media presence with great content, consistent posting, and the right strategy.</p>
        <div className="hero-actions entrance delay-4">
          <a href="#get-in-touch" className="button button-dark hero-primary">Contact <span className="button-icon"><Arrow diagonal /></span></a>
          <a href="#our-services" className="button button-light">Explore Our Services <span className="button-icon"><Arrow /></span></a>
        </div>
      </div>
    </section>
  );
}
