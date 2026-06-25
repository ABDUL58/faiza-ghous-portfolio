import { useState } from "react";
import { Award, Download, X, Maximize2 } from "lucide-react";

const CERTIFICATES = [
  {
    title: "Anticipatory Actions Framework",
    issuer: "Pakistan – United Nations",
    category: "International",
    file: "/certificates/pak-un-anticipatory-actions.pdf",
  },
  {
    title: "International Training Certificate",
    issuer: "Deutscher Wetterdienst (DWD) · Germany",
    category: "International",
    file: "/certificates/international-training-germany.pdf",
  },
  {
    title: "International Training Certificate",
    issuer: "JICA · Japan",
    category: "International",
    file: "/certificates/international-training-japan.pdf",
  },
  {
    title: "International Training Certificate",
    issuer: "US Army Corps of Engineers · United States",
    category: "International",
    file: "/certificates/international-training-us.pdf",
  },
  {
    title: "National Training Certificate I",
    issuer: "National Programme · Pakistan",
    category: "National",
    file: "/certificates/national-training-1.pdf",
  },
  {
    title: "National Training Certificate II",
    issuer: "National Programme · Pakistan",
    category: "National",
    file: "/certificates/national-training-2.pdf",
  },
];

const CATEGORY_COLORS = {
  International: { bg: "rgba(99,102,241,0.12)", text: "#818cf8" },
  National:      { bg: "rgba(34,197,94,0.12)",  text: "#4ade80" },
};

function FullscreenViewer({ cert, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-card)" }}
      >
        <div className="flex items-center gap-3">
          <Award size={16} style={{ color: "var(--color-accent)" }} />
          <div>
            <p className="text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}>
              {cert.title}
            </p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>{cert.issuer}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={cert.file}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-75"
            style={{ background: "var(--color-accent-dim)", color: "var(--color-accent)", fontFamily: "var(--font-display)" }}
          >
            <Download size={13} /> Download
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ background: "var(--color-accent-dim)", color: "var(--color-muted)" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <iframe
        src={cert.file}
        title={cert.title}
        className="flex-1 w-full"
        style={{ border: "none", display: "block" }}
      />
    </div>
  );
}

export function CertificatesSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <>
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="tag-pill mb-4">Credentials</p>
            <h2 className="section-title mb-3">
              Certificates &amp; <span className="text-gradient">Awards</span>
            </h2>
            <p className="section-subtitle max-w-lg mx-auto">
              Recognised training, certifications, and awards from national and international
              institutions spanning climate science, disaster risk reduction, and anticipatory action.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERTIFICATES.map((cert, i) => {
              const colors = CATEGORY_COLORS[cert.category];
              return (
                <div
                  key={i}
                  className="gradient-border overflow-hidden flex flex-col"
                  style={{ background: "var(--color-card)" }}
                >
                  {/* PDF preview box */}
                  <div
                    className="relative group cursor-pointer"
                    style={{ height: 220 }}
                    onClick={() => setOpenIdx(i)}
                  >
                    <iframe
                      src={cert.file + "#toolbar=0&navpanes=0&scrollbar=0"}
                      title={cert.title}
                      className="w-full h-full"
                      style={{ border: "none", display: "block", pointerEvents: "none" }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(0,0,0,0.45)" }}
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                        style={{ background: "var(--color-card)", color: "var(--color-foreground)", fontFamily: "var(--font-display)" }}
                      >
                        <Maximize2 size={15} /> Open Full Screen
                      </div>
                    </div>
                  </div>

                  {/* Info row */}
                  <div className="px-4 py-3 flex items-center gap-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: colors.bg, color: colors.text, fontFamily: "var(--font-display)", letterSpacing: "0.06em" }}
                        >
                          {cert.category}
                        </span>
                      </div>
                      <p
                        className="font-bold text-sm leading-snug truncate"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
                      >
                        {cert.title}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>
                        {cert.issuer}
                      </p>
                    </div>
                    <a
                      href={cert.file}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-75"
                      style={{ background: "var(--color-accent-dim)", color: "var(--color-accent)" }}
                      aria-label="Download"
                    >
                      <Download size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {openIdx !== null && (
        <FullscreenViewer
          cert={CERTIFICATES[openIdx]}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </>
  );
}
