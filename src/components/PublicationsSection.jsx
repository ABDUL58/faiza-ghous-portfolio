import { ExternalLink, BookOpen, ImageIcon } from "lucide-react";

const ENTRIES = [
  {
    status: "Training",
    title: "Climate Modelling: ICON Numerical Model Course 2024",
    org: "Deutscher Wetterdienst (DWD), Offenbach, Germany",
    details: "June 10–14, 2024 · ICON, COSMO, CLM model structure, configuration, data assimilation, and climate forecasting applications",
    href: null,
    images: [],
  },
  {
    status: "Conference",
    title: "International Conference on Climate Resilience and Early Warning Systems",
    org: "Subject Expert, Early Warning Systems & Disaster Preparedness",
    details: "March 4–5, 2024 · Delivered insights on integrating geoscience data into forecasting and community alert mechanisms; engaged with international researchers on multi hazard early warning frameworks",
    href: null,
    images: [],
  },
  {
    status: "Training",
    title: "JICA & US Army Corps of Engineers: Capacity Building & Hydrological Modelling",
    org: "Japan International Cooperation Agency · US Army Corps of Engineers",
    details: "April 6–7, 2025 · Specialised training in HEC-HMS for flood forecasting, watershed analysis, and rainfall-runoff modelling",
    href: null,
    images: [],
  },
  {
    status: "Membership",
    title: "AAPGWN-2023 — American Association of Petroleum Geologist Women Network",
    org: "AAPG Women's Network · February – June 2023",
    details: "Global networking, leadership development, and access to petroleum geology research and events; contributed to initiatives promoting diversity and inclusion in geosciences",
    href: null,
    images: [],
  },
  {
    status: "Workshop",
    title: "National & International Training Workshops on Disaster Risk Reduction",
    org: "Organiser & Participant — Community Vulnerability & Hazard Preparedness Programs",
    details: "Multiple sessions · Risk communication, community resilience, adaptive strategies, and capacity building with local and international stakeholders",
    href: null,
    images: [],
  },
];

function MediaBox({ images }) {
  if (images.length > 0) {
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-24 h-16 object-cover rounded-lg"
            style={{ border: "1px solid var(--color-border)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3"
      style={{
        border: "1.5px dashed var(--color-border)",
        background: "var(--color-accent-dim)",
      }}
    >
      <ImageIcon size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
      <span
        className="text-xs"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
      >
        Add photos — paste image paths into the <code style={{ color: "var(--color-accent)" }}>images</code> array for this entry
      </span>
    </div>
  );
}

export function PublicationsSection() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="tag-pill mb-4">Professional Development</p>
          <h2 className="section-title mb-3">
            Training &amp; <span className="text-gradient">Conferences</span>
          </h2>
          <p className="section-subtitle max-w-lg mx-auto">
            International training programmes, conferences, and professional activities spanning
            climate modelling, early warning systems, and disaster risk reduction.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {ENTRIES.map((entry, i) => (
            <div
              key={i}
              className="gradient-border card-hover p-6"
              style={{ background: "var(--color-card)" }}
            >
              <div className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: "var(--color-accent-dim)" }}
                >
                  <BookOpen size={18} style={{ color: "var(--color-accent)" }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--color-accent-dim)",
                        color: "var(--color-accent)",
                        fontFamily: "var(--font-display)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {entry.status}
                    </span>
                  </div>

                  <h3
                    className="font-bold mb-1 leading-snug"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      color: "var(--color-foreground)",
                    }}
                  >
                    {entry.title}
                  </h3>

                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}>
                    {entry.org}
                  </p>

                  <p className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>
                    {entry.details}
                  </p>

                  {entry.href && (
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-75 mb-1"
                      style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)" }}
                    >
                      View Details <ExternalLink size={12} />
                    </a>
                  )}

                  <MediaBox images={entry.images} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
