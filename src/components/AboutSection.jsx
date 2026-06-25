import { CloudLightning, FlaskConical, Globe } from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: CloudLightning,
    title: "Trigger Based Anticipatory Actions",
    desc: "Designing and implementing trigger based anticipatory action frameworks at NDMA, defining forecast thresholds and early warning triggers that activate preemptive disaster response before hazards strike and connect climate science directly to community level preparedness.",
  },
  {
    icon: FlaskConical,
    title: "Climate & NWP Modelling",
    desc: "Expertise in numerical weather prediction (ICON, COSMO, CLM), multi model ensemble CMIP6 projections, regional downscaling, and impact based forecasting for disaster risk management.",
  },
  {
    icon: Globe,
    title: "International Research",
    desc: "Research exposures at Helmholtz-Zentrum Hereon, Potsdam Institute for Climate Impact Research, GERICS, GFZ, and Deutscher Wetterdienst, with hands-on work in earth system modelling, HPC, and geophysical simulation.",
  },
];

const EXPERTISE_TAGS = [
  "Trigger Based Anticipatory Actions", "Meteorology", "Climate Modelling",
  "Early Warning Systems", "Disaster Risk Reduction", "Numerical Weather Prediction",
  "CMIP6 Analysis", "Impact based Forecasting", "Seismic Analysis", "Hydrological Modelling",
];

export function AboutSection() {
  return (
    <section
      className="py-16 sm:py-24 px-4"
      style={{ background: "var(--color-section-alt)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="animate-slide-in-left">
          <p className="tag-pill mb-4">About Me</p>
          <h2 className="section-title mb-5">
            Climate science,{" "}
            <span className="text-gradient">real world impact</span>
          </h2>

          <div className="space-y-4 mb-8" style={{ color: "var(--color-muted)" }}>
            <p className="section-subtitle">
              I am{" "}
              <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>Faiza Ghous</strong>,
              a Climate Scientist, Disaster Risk Reduction Specialist, and founder of{" "}
              <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>CHANGE</strong>{" "}
              (Climate, Human and Nature for Geospatial Empowerment). My expertise spans climate
              science, meteorology, risk assessment, and anticipatory action, with a focus on
              understanding climate extremes, assessing vulnerabilities, and translating scientific
              knowledge into actionable solutions that strengthen resilience and support informed
              decision making.
            </p>

            <div className="flex flex-wrap gap-2 py-1">
              {EXPERTISE_TAGS.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            <p className="section-subtitle">
              I have contributed to climate and disaster risk initiatives spanning climate
              projections, severe weather monitoring, impact based forecasting, anticipatory
              action, and early warning to early action systems. Through national and international
              collaborations, technical training, and policy engagements, I advocate for the
              integration of climate science into disaster risk governance, development planning,
              and community resilience strategies.
            </p>

            <p className="section-subtitle">
              My long term vision is to advance climate resilient governance through scientific
              innovation, risk informed planning, and people centred approaches, with a particular
              focus on the space between early warning and community impact, where preparedness,
              anticipatory action, and resilience have the greatest potential to{" "}
              <strong style={{ color: "var(--color-foreground)", fontWeight: 600 }}>save lives and safeguard livelihoods</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="cosmic-button">
              Get in Touch
            </a>
            <a
              href="/projects/Faiza_Ghous_CV.pdf"
              download="Faiza_Ghous_CV.pdf"
              className="ghost-button"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          {FEATURE_CARDS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="gradient-border card-hover p-5 flex items-start gap-4"
              style={{ background: "var(--color-card)" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--color-accent-dim)" }}
              >
                <Icon size={20} style={{ color: "var(--color-accent)" }} />
              </div>
              <div>
                <h3
                  className="font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}
                >
                  {title}
                </h3>
                <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
