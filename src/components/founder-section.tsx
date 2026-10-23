import Image from "next/image";
import { FounderStats } from "./founder-stats";
import "./founder-section.css";

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
            <figcaption className="founder-caption">
              <p>Shaik Abdul Wahab</p>
              <span>Founder &amp; Content Creator</span>
            </figcaption>
          </figure>
          <div className="founder-content">
            <p className="founder-eyebrow section-label">ABOUT WTS NOVA</p>
            <h2 id="founder-heading" className="section-heading">We Transform <span>Stories.</span></h2>
            <p className="founder-description">WTS Nova helps businesses, creators, and personal brands grow through creative content, social media management, and strategy.</p>
            <div className="founder-introduction">
              <h3>Shaik Abdul Wahab <span>— Founder &amp; Content Creator</span></h3>
              <p>Shaik Abdul Wahab founded WTS Nova with a vision to help businesses and personal brands build a stronger online presence. With experience in content creation, storytelling, and social media, he focuses on developing creative content and practical strategies that help brands connect with their audiences.</p>
              <a className="founder-instagram" href="https://www.instagram.com/vibesbywahab?xtok=M3Yzd2F3NHFrODE1" target="_blank" rel="noopener noreferrer" aria-label="Follow Shaik Abdul Wahab on Instagram at vibesbywahab">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
                </svg>
                <span>vibesbywahab</span>
              </a>
            </div>
            <FounderStats />
          </div>
        </div>
      </div>
    </section>
  );
}
