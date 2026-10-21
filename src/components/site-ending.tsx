import Image from "next/image";
import { siteLinks } from "@/lib/site-links";
import { Arrow, Sparkle } from "./icons";
import "./site-ending.css";
import "./agency-footer.css";

function ContactAction({ href, children, secondary = false, noticeId = "ending-contact-note" }: {
  href: string | null;
  children: React.ReactNode;
  secondary?: boolean;
  noticeId?: string;
}) {
  const className = `ending-action${secondary ? " ending-action-secondary" : ""}`;
  const content = <>{children}<span className="button-icon"><Arrow diagonal /></span></>;
  return href ? <a className={className} href={href}>{content}</a> : (
    <button type="button" disabled className={className} title="Contact destination pending" aria-describedby={noticeId}>{content}</button>
  );
}

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
        <div className="ending-cta-content" data-reveal>
          <p className="ending-eyebrow section-label">LET&apos;S WORK TOGETHER</p>
          <h2 id="ending-cta-heading" className="section-heading">Let&apos;s Build Your <span>Digital Presence.</span></h2>
          <p className="ending-cta-lead">You have a business to grow. Let us take care of how it shows up online.</p>
          <p className="ending-cta-description">Tell us about your business, your goals, and what you need. Let&apos;s explore what we can create together.</p>
          <div className="ending-actions">
            <ContactAction href={siteLinks.talk}>Let&apos;s Talk</ContactAction>
            <ContactAction href={siteLinks.whatsapp} secondary>Chat on WhatsApp</ContactAction>
          </div>
          {(!siteLinks.talk || !siteLinks.whatsapp) && <p id="ending-contact-note" className="ending-preview-note">Contact links coming soon.</p>}
        </div>
      </section>

      <footer id="footer" className="agency-footer" aria-label="WTS Nova footer">
        <div className="agency-footer-panel">
          <div className="agency-footer-pattern" aria-hidden="true" />
          <a href="#home" aria-label="WTS Nova home" className="agency-footer-logo">
            {siteLinks.logo ? <Image src={siteLinks.logo} width={1254} height={1254} alt="WTS Nova" className="agency-footer-original-logo" unoptimized /> : <span className="agency-footer-logo-placeholder">WTS<br /><span>NOVA</span></span>}
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
                <p className="agency-footer-description">Helping businesses and personal brands build a stronger presence through content, creativity, and social media management.</p>
                <div className="agency-footer-actions">
                  <ContactAction href={siteLinks.talk} noticeId="footer-contact-note">Let&apos;s Talk</ContactAction>
                  <ContactAction href={siteLinks.whatsapp} noticeId="footer-contact-note" secondary>Chat on WhatsApp</ContactAction>
                </div>
                {(!siteLinks.talk || !siteLinks.whatsapp) && <p id="footer-contact-note" className="agency-footer-note">Contact links coming soon.</p>}
              </div>
              <nav className="agency-footer-links" aria-label="Footer navigation">
                <h2>Explore</h2>
                <ul>{navigation.map((item) => <li key={item.label}>{item.href ? <a href={item.href}>{item.label}</a> : <span aria-disabled="true">{item.label}<small>Coming soon</small></span>}</li>)}</ul>
              </nav>
              <nav className="agency-footer-links" aria-label="Footer services">
                <h2>Our expertise</h2>
                <ul>{services.map((service) => <li key={service}><a href="#our-services">{service}</a></li>)}</ul>
              </nav>
              <div className="agency-footer-social-column">
                <h2>Stay connected</h2>
                <ul className="agency-footer-socials" aria-label="Social media">
                  {[
                    { label: "Instagram", href: siteLinks.instagram, type: "instagram" },
                    { label: "WhatsApp", href: siteLinks.whatsapp, type: "whatsapp" },
                  ].map((social) => {
                    const content = <><span className="agency-footer-social-icon"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{social.type === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></> : <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 21l1.7-5a8.5 8.5 0 1 1 15.8-4.3Z" /><path d="M8 7.5c0 4.5 4 8 8.5 8l1-2-3-1-1 1c-1.4-.7-2.4-1.7-3-3l1-1-1.5-3Z" /></>}</svg></span>{social.label}</>;
                    return <li key={social.label}>{social.href ? <a href={social.href}>{content}</a> : <span aria-disabled="true" title="Profile link pending">{content}</span>}</li>;
                  })}
                </ul>
                {(!siteLinks.instagram || !siteLinks.whatsapp) && <p className="agency-footer-note">Social links coming soon.</p>}
              </div>
            </div>
            <div className="agency-footer-bottom">
              <p>© 2026 WTS Nova. All rights reserved.</p>
              <a href="#home">Back to top <Arrow diagonal /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
