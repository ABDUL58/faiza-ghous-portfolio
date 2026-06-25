import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const CATEGORIES = [
  {
    id: "national-international-representations",
    label: "National and International Representations",
    images: [
      "/gallery/capacity-building/1.jpg",
      "/gallery/capacity-building/1.png",
      "/gallery/capacity-building/2.png",
      "/gallery/capacity-building/3.png",
      "/gallery/capacity-building/4.png",
    ],
    videos: [],
  },
  {
    id: "climate-modelling-training",
    label: "Climate Modelling Training",
    images: [
      "/gallery/climate-modelling-training/1.jpg",
      "/gallery/climate-modelling-training/2.jpg",
      "/gallery/climate-modelling-training/3.jpg",
      "/gallery/climate-modelling-training/4.jpg",
      "/gallery/climate-modelling-training/5.jpg",
      "/gallery/climate-modelling-training/6.jpg",
    ],
    videos: [],
  },
  {
    id: "community-building",
    label: "Community Building",
    images: [
      "/gallery/community-building/1.png",
      "/gallery/community-building/2.png",
      "/gallery/community-building/3.png",
    ],
    videos: [],
  },
  {
    id: "green-talks",
    label: "Green Talks",
    images: [
      "/gallery/achievements/1.png",
      "/gallery/achievements/2.png",
      "/gallery/green-talks/11.png",
    ],
    videos: [],
  },
  {
    id: "media-appearances",
    label: "Media Appearances as Climate Expert",
    images: [],
    videos: [
      {
        embed: "https://streamable.com/e/l331e9",
        label: "Geo News Morning Show · 25 Nov 2025",
      },
      {
        embed: "https://streamable.com/e/ks2njf",
        label: "ARY Morning Show · 26 Nov 2025",
      },
    ],
  },
];

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
        style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <img
        src={images[idx]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
        style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="absolute bottom-4 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 20 : 8,
                height: 8,
                background: i === idx ? "var(--color-primary)" : "var(--color-border)",
              }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function ImageGrid({ images }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="group relative overflow-hidden rounded-xl aspect-square focus:outline-none"
            style={{ border: "1px solid var(--color-border)" }}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.35)" }}
            >
              <ChevronRight size={24} style={{ color: "#fff" }} />
            </div>
          </button>
        ))}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}

function VideoGrid({ videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map((v, i) => (
        <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={v.embed}
              title={v.label}
              allowFullScreen
              frameBorder="0"
              className="absolute inset-0 w-full h-full"
              style={{ background: "#000" }}
            />
          </div>
          <div
            className="px-3 py-2 flex items-center gap-2"
            style={{ background: "var(--color-card)" }}
          >
            <Play size={13} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
            <span className="text-xs font-medium" style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}>
              {v.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GallerySection() {
  return (
    <section className="py-16 sm:py-24 px-4" style={{ background: "var(--color-section-alt)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="tag-pill mb-4">Highlights</p>
          <h2 className="section-title mb-3">
            Gallery &amp; <span className="text-gradient">Milestones</span>
          </h2>
          <p className="section-subtitle max-w-lg mx-auto">
            A visual record of achievements, training programmes, community engagements,
            media appearances, and climate advocacy work.
          </p>
        </div>

        <div className="flex flex-col gap-14">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <div className="flex items-center gap-3 mb-6">
                <h3
                  className="font-bold shrink-0 text-sm sm:text-base"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-foreground)",
                  }}
                >
                  {cat.label}
                </h3>
                <div className="flex-1 h-px min-w-4" style={{ background: "var(--color-border)" }} />
              </div>

              {cat.images.length > 0 && <ImageGrid images={cat.images} />}
              {cat.videos.length > 0 && <VideoGrid videos={cat.videos} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
