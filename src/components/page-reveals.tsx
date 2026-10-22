"use client";

import { useEffect } from "react";

/** One observer for the whole page. Content stays visible without JavaScript. */
export function PageReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-text-reveal]")];
    let observer: IntersectionObserver | undefined;

    function configure() {
      observer?.disconnect();
      let textIndex = 0;
      elements.forEach((element, index) => {
        element.removeAttribute("data-reveal-state");
        const delay = element.hasAttribute("data-text-reveal") ? (textIndex++ % 3) * 65 : (index % 4) * 55;
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      });
      if (preference.matches || !("IntersectionObserver" in window)) return;

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-state", "visible");
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

      for (const element of elements) {
        // Don't hide content already visible or above the current scroll position.
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        element.setAttribute("data-reveal-state", "pending");
        observer.observe(element);
      }
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      elements.forEach((element) => element.removeAttribute("data-reveal-state"));
    };
  }, []);

  return null;
}
