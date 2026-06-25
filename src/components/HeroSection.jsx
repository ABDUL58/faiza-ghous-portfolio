import { ArrowDown, Linkedin, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/faiza-baloch-a90483190/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BT9hvAPdGQPuARc1tCyOBMQ%3D%3D", label: "LinkedIn" },
  { icon: Mail,     href: "mailto:faizabaloch10@gmail.com",                       label: "Email" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col text-center px-4 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-primary-glow) 0%, transparent 70%)",
        }}
      />

      {/* Content — padded top so it always clears the fixed navbar (h-16 = 64px) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full pt-24 pb-16">

        {/* Round profile photo */}
        <div className="animate-fade-in-delay-1 flex justify-center mb-6">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36"
            style={{
              borderRadius: "50%",
              padding: 3,
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent, #818cf8), var(--color-primary))",
              boxShadow: "0 0 0 6px var(--color-accent-dim), 0 0 48px var(--color-primary-glow)",
            }}
          >
            <img
              src="https://i.postimg.cc/262sY6LB/Picture1.png"
              alt="Faiza Ghous"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                background: "var(--color-card)",
              }}
            />
          </div>
        </div>

        <h1
          className="section-title animate-fade-in-delay-2 mb-3"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          Faiza <span className="text-gradient">Ghous</span>
        </h1>

        <p
          className="animate-fade-in-delay-2 text-base sm:text-lg md:text-xl font-medium mb-4 px-2"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}
        >
          Climate Scientist &amp; Disaster Risk Reduction Specialist
        </p>

        <p className="animate-fade-in-delay-3 section-subtitle max-w-xl mx-auto mb-8 px-2">
          Dedicated to advancing climate resilience through science based decision making,
          anticipatory action, and risk informed policies, bridging the gap between climate
          science, policy, and practice to build societies capable of anticipating, preparing
          for, and responding to emerging climate and disaster risks.
        </p>

        <div className="animate-fade-in-delay-4 flex flex-wrap gap-3 justify-center mb-8">
          <a href="#projects" className="cosmic-button">
            View My Work
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="ghost-button">
            Get in Touch
          </a>
        </div>

        <div className="animate-fade-in-delay-4 flex gap-3 justify-center">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                color: "var(--color-muted)",
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator — always anchored to bottom */}
      <div className="relative z-10 pb-6 flex justify-center animate-bounce-slow">
        <a
          href="#about"
          aria-label="Scroll to about"
          className="flex flex-col items-center gap-1"
          style={{ color: "var(--color-muted)" }}
        >
          <span className="text-xs font-medium" style={{ fontFamily: "var(--font-display)" }}>scroll</span>
          <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
