"use client";

import { useEffect, useRef, useState } from "react";

// Keeps unfinished navigation honest without building additional page sections.
export function PreviewNotice() {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [destination, setDestination] = useState("Contact");

  useEffect(() => {
    function intercept(event: MouseEvent) {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a");
      const href = anchor?.getAttribute("href");
      if (!href || !["#contact", "#our-work", "#about"].includes(href)) return;
      event.preventDefault();
      previousFocus.current = anchor;
      setDestination(href === "#contact" ? "Contact" : href === "#our-work" ? "Our Work" : "About Us");
      dialog.current?.showModal();
    }
    document.addEventListener("click", intercept);
    return () => document.removeEventListener("click", intercept);
  }, []);

  return (
    <dialog ref={dialog} className="preview-dialog" onClose={() => previousFocus.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">WTS NOVA · WEBSITE PREVIEW</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight">{destination}</h2>
      <p className="mt-4 text-sm leading-7 text-navy/75">{destination === "Contact" ? "Our contact channel will be connected in the next phase. This preview includes the navigation, hero, and expertise bar only." : "This section is reserved for the next phase, following approval of the homepage direction."}</p>
      <form method="dialog" className="mt-7"><button className="button button-dark w-full">Back to preview</button></form>
    </dialog>
  );
}
