"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteLinks } from "@/lib/site-links";
import { Arrow } from "./icons";

// Navigation points to completed sections.
const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#our-services" },
  { label: "Who We Help", href: "#who-we-work-with" },
  { label: "About Us", href: "#about-wts-nova" },
  { label: "Contact", href: "#get-in-touch" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMenu = () => setOpen(false);
    desktop.addEventListener("change", closeMenu);
    window.addEventListener("hashchange", closeMenu);
    return () => {
      desktop.removeEventListener("change", closeMenu);
      window.removeEventListener("hashchange", closeMenu);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    function focusOutside(event: FocusEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focusOutside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", focusOutside);
    };
  }, [open]);

  return (
    <header ref={header} className="nav-wrap">
      <nav aria-label="Main navigation" className="navbar">
        <a href="#home" aria-label="WTS Nova home" className="brand">
          {siteLinks.navLogo ? (
            <Image src={siteLinks.navLogo} width={288} height={288} alt="WTS Nova" className="brand-logo" loading="eager" fetchPriority="high" unoptimized />
          ) : (
            <span className="brand-name">WTS <span className="font-normal">NOVA</span><span className="brand-period">.</span></span>
          )}
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {links.filter(({ label }) => label !== "Contact").map(({ label, href }) => (
            <a key={label} href={href} className="nav-link" aria-current={label === "Home" ? "page" : undefined}>{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a className="button button-dark nav-cta" href="#get-in-touch">Contact <span className="button-icon"><Arrow diagonal /></span></a>
          <button ref={menuButton} type="button" className="menu-button lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
            <span className={open ? "menu-lines is-open" : "menu-lines"}><span /><span /><span /></span>
          </button>
        </div>
        {open && (
          <div id="mobile-navigation" className="mobile-menu lg:hidden">
            {links.map(({ label, href }, index) => (
              <a href={href} key={label} onClick={() => setOpen(false)}><span className="menu-index">0{index + 1}</span>{label}<Arrow diagonal className="ml-auto" /></a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
