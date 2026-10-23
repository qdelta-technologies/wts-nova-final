import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteLinks } from "@/lib/site-links";
import { Arrow, Sparkle } from "./icons";
import { ContactForm } from "./contact-form";
import "./site-ending.css";
import "./agency-footer.css";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-wts-nova" },
  { label: "Services", href: "#our-services" },
  { label: "Who We Help", href: "#who-we-work-with" },
  { label: "Contact", href: "#get-in-touch" },
];

const services = ["Social Media Management", "Content Creation", "Social Media Marketing & Strategy", "Digital Solutions"];

export function SiteEnding() {
  return (
    <div className="site-ending">
      <section id="get-in-touch" aria-labelledby="ending-cta-heading" className="ending-cta">
        <div className="ending-atmosphere" aria-hidden="true" />
        <div className="ending-cta-layout" data-reveal>
          <div className="ending-cta-content">
            <p className="ending-eyebrow section-label">LET&apos;S WORK TOGETHER</p>
            <h2 id="ending-cta-heading" className="section-heading">Let&apos;s Build Your <span>Digital Presence.</span></h2>
            <p className="ending-cta-lead">You have a business to grow. Let us take care of how it shows up online.</p>
            <p className="ending-cta-description">Tell us about your business, your goals, and what you need. Let&apos;s explore what we can create together.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer id="footer" className="agency-footer" aria-label="WTS Nova footer">
        <div className="agency-footer-panel">
          <div className="agency-footer-pattern" aria-hidden="true">
            <div className="agency-footer-particles">
              {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
            </div>
          </div>
          <a href="#home" aria-label="WTS Nova home" className="agency-footer-logo">
            {siteLinks.logo ? <Image src={siteLinks.logo} width={288} height={288} alt="WTS Nova" className="agency-footer-original-logo" unoptimized /> : <span className="agency-footer-logo-placeholder">WTS<br /><span>NOVA</span></span>}
          </a>
          <div className="agency-footer-inner">
            <div className="agency-footer-brand" data-reveal>
              <p className="agency-footer-wordmark">WTS NOVA<span>.</span></p>
              <p className="agency-footer-tagline">We Transform Stories.</p>
              <div className="agency-footer-ornament" aria-hidden="true"><span /><Sparkle className="h-3 w-3" /><span /></div>
            </div>

            <div className="agency-footer-grid">
              <div className="agency-footer-contact">
                <h2>Let&apos;s connect</h2>
                <p className="agency-footer-description">Social media management and content creation for businesses and personal brands in Nalgonda, Telangana.</p>
                <address className="agency-footer-details">
                  <a className="agency-footer-detail" href="tel:+918106294158">
                    <Phone aria-hidden="true" />
                    <span>+91 81062 94158</span>
                  </a>
                  <a className="agency-footer-detail" href="mailto:contact@wtsnova.com">
                    <Mail aria-hidden="true" />
                    <span>contact@wtsnova.com</span>
                  </a>
                  <span className="agency-footer-detail agency-footer-detail-location">
                    <MapPin aria-hidden="true" />
                    <span>Nalgonda, Telangana, India</span>
                  </span>
                </address>
                {siteLinks.instagram && (
                  <a className="agency-footer-detail" href={siteLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram @wtsnova">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
                    </svg>
                    <span>@wtsnova</span>
                  </a>
                )}
              </div>
              <nav className="agency-footer-links" aria-label="Footer navigation">
                <h2>Explore</h2>
                <ul>{navigation.map((item) => <li key={item.label}><a href={item.href}>{item.label}</a></li>)}</ul>
              </nav>
              <nav className="agency-footer-links" aria-label="Footer services">
                <h2>Our expertise</h2>
                <ul>{services.map((service) => <li key={service}><a href="#our-services">{service}</a></li>)}</ul>
              </nav>
            </div>
            <div className="agency-footer-bottom">
              <p>© 2026 WTS Nova. All rights reserved.</p>
              <a href="#home">Back to top <Arrow diagonal /></a>
            </div>
          </div>
        </div>
      </footer>
      {siteLinks.whatsapp && (
        <a className="whatsapp-float" href={siteLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with WTS Nova on WhatsApp" title="Chat with us on WhatsApp">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 21l1.7-5a8.5 8.5 0 1 1 15.8-4.3Z" />
            <path d="M8 7.5c0 4.5 4 8 8.5 8l1-2-3-1-1 1c-1.4-.7-2.4-1.7-3-3l1-1-1.5-3Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
