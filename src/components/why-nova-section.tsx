import { CalendarDays, Lightbulb, MessagesSquare, UsersRound } from "lucide-react";
import "./why-nova-section.css";

const benefits = [
  { title: "Creative Thinking", description: "Fresh ideas and engaging content that bring out your brand’s unique personality.", icon: "idea" },
  { title: "Consistent Execution", description: "From planning to publishing, we keep your social media active, organized, and professional.", icon: "calendar" },
  { title: "Personalized Approach", description: "Every brand is different. We create content and strategies that align with your business and its goals.", icon: "people" },
  { title: "Clear Communication", description: "We believe in transparency, collaboration, and keeping you informed throughout the process.", icon: "conversation" },
] as const;

function BenefitIcon({ type }: { type: typeof benefits[number]["icon"] }) {
  const Icon = { idea: Lightbulb, calendar: CalendarDays, people: UsersRound, conversation: MessagesSquare }[type];
  return <Icon aria-hidden="true" strokeWidth={1.5} />;
}

export function WhyNovaSection() {
  return (
    <section id="why-wts-nova" aria-labelledby="why-nova-heading" className="why-nova-section">
      <div className="why-nova-layout">
        <div className="why-nova-editorial">
          <header>
          <p className="why-nova-label section-label" data-text-reveal>WHY WTS NOVA?</p>
          <h2 id="why-nova-heading" className="why-nova-heading section-heading" data-text-reveal><span>More Than</span> <span>Just Content.</span></h2>
          <p className="why-nova-intro" data-text-reveal>Great social media isn’t just about posting. It’s about understanding your brand, creating with purpose, and showing up consistently.</p>
          </header>
        </div>
        <ol className="why-nova-benefits">
          {benefits.map((benefit, index) => (
            <li className="why-nova-benefit" key={benefit.title} data-text-reveal>
              {index < benefits.length - 1 && (
                <svg aria-hidden="true" className="why-nova-connector" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                  <path d={index % 2 ? "M54 0C-10 24 108 76 42 100" : "M42 0C108 24-10 76 54 100"} vectorEffect="non-scaling-stroke" />
                </svg>
              )}
              <div className="why-nova-icon"><BenefitIcon type={benefit.icon} /></div>
              <div className="why-nova-benefit-copy">
                <span className="why-nova-number" aria-hidden="true">0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
