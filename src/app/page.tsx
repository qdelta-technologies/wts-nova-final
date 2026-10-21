import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PreviewNotice } from "@/components/preview-notice";
import { TrustBar } from "@/components/trust-bar";
import { ServicesSection } from "@/components/services-section";
import { AudienceSection } from "@/components/audience-section";
import { SectionDivider } from "@/components/section-divider";
import { WhyNovaSection } from "@/components/why-nova-section";
import { FounderSection } from "@/components/founder-section";
import { SiteEnding } from "@/components/site-ending";
import { PageReveals } from "@/components/page-reveals";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <div id="home" className="site-shell">
        <main id="main"><Hero /><TrustBar /></main>
      </div>
      <ServicesSection />
      <SectionDivider />
      <AudienceSection />
      <WhyNovaSection />
      <FounderSection />
      <SiteEnding />
      <PreviewNotice />
      <PageReveals />
    </>
  );
}
