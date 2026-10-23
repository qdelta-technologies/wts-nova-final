import Image from "next/image";
import { Store, UserRound } from "lucide-react";
import "./audience-section.css";

function AudienceMark({ creator = false }: { creator?: boolean }) {
  const Icon = creator ? UserRound : Store;
  return <Icon aria-hidden="true" strokeWidth={1.5} />;
}

export function AudienceSection() {
  return (
    <section id="who-we-work-with" aria-labelledby="audience-heading" className="audience-section">
      <div className="audience-layout">
        <header className="audience-header" data-reveal>
          <p className="audience-label section-label">WHO WE WORK WITH</p>
          <h2 id="audience-heading" className="audience-heading section-heading"><span>Built for Businesses.</span> <span>Made for People.</span></h2>
          <p className="audience-intro">Whether you&apos;re building a business or a personal brand, we help you show up online with confidence.</p>
          <span className="audience-rule" aria-hidden="true" />
        </header>
        <ol className="audience-capsules">
          <li className="audience-capsule audience-business" data-reveal>
            <div className="audience-visual">
              <div className="audience-photo"><Image src="/images/audience-businesses.webp" alt="A warmly lit independent café with a handwritten menu and welcoming interior." fill sizes="(max-width: 639px) 72px, (max-width: 1099px) 104px, 128px" /></div>
              <span className="audience-badge"><AudienceMark /></span>
            </div>
            <div className="audience-copy">
              <h3>Businesses</h3>
              <p>From local shops and service providers to growing brands, we help businesses establish a professional and consistent social media presence.</p>
            </div>
          </li>
          <li className="audience-capsule audience-creators" data-reveal>
            <div className="audience-visual">
              <div className="audience-photo"><Image src="/images/audience-creators.webp" alt="A camera and printed photographs arranged on a creative workspace." fill sizes="(max-width: 639px) 72px, (max-width: 1099px) 104px, 128px" /></div>
              <span className="audience-badge"><AudienceMark creator /></span>
            </div>
            <div className="audience-copy">
              <h3>Creators &amp; Personal Brands</h3>
              <p>We help creators, founders, coaches, and professionals share their ideas, build their presence, and connect with their audience.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
