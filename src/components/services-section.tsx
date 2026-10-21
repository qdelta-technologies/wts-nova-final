import Image from "next/image";
import "./services-section.css";

const services = [
  {
    title: "Social Media Management",
    description: "From planning and scheduling to publishing and managing your accounts, we take care of your social media.",
    image: "/images/service-social-management.webp",
    alt: "A laptop, notebook, and coffee arranged for a content planning session.",
  },
  {
    title: "Content Creation",
    description: "Creative reels, eye-catching posts, carousels, and stories that bring your brand to life.",
    image: "/images/service-content-creation.webp",
    alt: "A professional camera and lenses ready for a creative shoot.",
  },
  {
    title: "Social Media Marketing & Strategy",
    description: "Thoughtful strategies, targeted promotions, and campaigns that help your brand reach the right audience.",
    image: "/images/service-marketing-strategy.webp",
    alt: "A laptop displaying a marketing analytics dashboard and performance charts.",
  },
  {
    title: "Online Presence & Growth Solutions",
    description: "Websites, landing pages, digital branding, and creative solutions that strengthen your presence online.",
    image: "/images/service-online-presence.webp",
    alt: "A website development workspace with a live page and code on screen.",
  },
] as const;

export function ServicesSection() {
  return (
    <section id="our-services" aria-labelledby="services-heading" className="services-section">
      <div className="services-container">
        <header className="services-header" data-reveal>
          <p className="services-label section-label">OUR SERVICES</p>
          <h2 id="services-heading" className="services-heading section-heading">What We <span>Do.</span></h2>
          <p className="services-intro">Everything your brand needs to create, manage, and strengthen its online presence.</p>
        </header>
        <ol className="services-list">
          {services.map((service, index) => (
            <li className={`service-capsule${index % 2 ? " service-capsule-right" : ""}`} key={service.title} data-reveal>
              <div className="service-image-ring">
                <div className="service-image-crop">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 639px) 68px, (max-width: 899px) 112px, 140px" />
                </div>
              </div>
              <div className="service-copy">
                <span className="service-index" aria-hidden="true">0{index + 1}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
