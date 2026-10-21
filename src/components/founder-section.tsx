import Image from "next/image";
import { BarChart3, Layers3, Lightbulb, MessageCircle } from "lucide-react";
import { Sparkle } from "./icons";
import "./founder-section.css";

type FounderIconName = "idea" | "strategy" | "positioning" | "communication";

function FounderIcon({ name }: { name: FounderIconName }) {
  const Icon = { idea: Lightbulb, strategy: BarChart3, positioning: Layers3, communication: MessageCircle }[name];
  return <Icon aria-hidden="true" strokeWidth={1.5} />;
}

const features: { title: string; icon: FounderIconName }[] = [
  { title: "Creative Thinking", icon: "idea" },
  { title: "Content Strategy", icon: "strategy" },
  { title: "Brand Positioning", icon: "positioning" },
  { title: "Clear Communication", icon: "communication" },
];

const stats: { value: string; suffix?: string; label: string }[] = [
  { value: "6", suffix: " Years", label: "Content Experience" },
  { value: "24K+", label: "Instagram Followers" },
  { value: "8+", label: "Brand Retainers" },
  { value: "1,000+", label: "Promotions Delivered" },
];

// Pass the approved portrait path when it is supplied. No substitute person is used.
export function FounderSection({ portraitSrc }: { portraitSrc?: string }) {
  return (
    <section id="about-wts-nova" aria-labelledby="founder-heading" className="founder-section">
      <div className="founder-container">
        <div className="founder-panel" data-reveal>
          <figure className="founder-portrait">
            {portraitSrc ? (
              <Image src={portraitSrc} alt="Shaik Abdul Wahab, Founder and Content Creator at WTS Nova." fill sizes="(max-width: 999px) 620px, 40vw" className="founder-photo" />
            ) : (
              <div className="founder-photo-placeholder">
                <span className="founder-monogram" aria-hidden="true">AW</span>
                <span className="founder-placeholder-label">Founder portrait</span>
                <span className="founder-placeholder-note">To be added</span>
              </div>
            )}
            <span className="founder-tag"><Sparkle className="h-3 w-3" /> FOUNDER</span>
            <figcaption className="founder-caption">
              <p>Shaik Abdul Wahab</p>
              <span>Founder &amp; Content Creator</span>
            </figcaption>
          </figure>
          <div className="founder-content">
            <p className="founder-eyebrow section-label">ABOUT WTS NOVA</p>
            <h2 id="founder-heading" className="section-heading">We Transform <span>Stories.</span></h2>
            <p className="founder-description">WTS Nova helps businesses, creators, and personal brands grow through creative content, social media management, and strategy.</p>
            <ul className="founder-features">
              {features.map((feature) => (
                <li className="founder-feature" key={feature.title}>
                  <span className="founder-feature-icon"><FounderIcon name={feature.icon} /></span>
                  <h3>{feature.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="founder-stats" data-reveal>
          {stats.map((stat) => (
            <div className="founder-stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}{stat.suffix && <span>{stat.suffix}</span>}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
