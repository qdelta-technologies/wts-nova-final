import { Sparkle } from "./icons";

const services = ["CONTENT CREATION", "CREATIVITY", "SOCIAL MEDIA MANAGEMENT", "STRATEGY", "SOCIAL MEIDA MARKETING", "VIDEO EDITING", "GROWTH"];

export function TrustBar() {
  return (
    <section id="services" className="trust-bar" aria-label="Our expertise">
      <ul className="sr-only">{services.map((service) => <li key={service}>{service}</li>)}</ul>
      <div className="trust-viewport" aria-hidden="true">
        <div className="trust-track">
          {[0, 1].map((copy) => (
            <div className="trust-set" key={copy}>
              {services.map((service) => (
                <span className="trust-item" key={service}>
                  <span className="trust-name">{service}</span>
                  <span className="trust-separator"><Sparkle className="h-3 w-3 shrink-0 text-blue" /></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
