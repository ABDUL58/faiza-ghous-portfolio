import { useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, X, ChevronLeft, ChevronRight,
  Layers, Users, Cpu, Star, AlertTriangle, BookOpen,
} from "lucide-react";
import { projects } from "@/data/projectsData";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => String(p.id) === projectId);

  const [selectedImg, setSelectedImg]     = useState(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}
      >
        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Project Not Found
        </h2>
        <Link to="/" className="cosmic-button">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>
    );
  }

  const allImages = (() => {
    const raw = project.carouselImages?.length
      ? [project.mainImage, ...project.carouselImages]
      : [project.mainImage];
    return raw.filter((img, idx) => raw.indexOf(img) === idx);
  })();

  const openLightbox = (img, idx) => { setSelectedImg(img); setCurrentImgIdx(idx); };
  const closeLightbox = () => setSelectedImg(null);
  const prevImg = () => {
    const newIdx = (currentImgIdx - 1 + allImages.length) % allImages.length;
    setCurrentImgIdx(newIdx);
    setSelectedImg(allImages[newIdx]);
  };
  const nextImg = () => {
    const newIdx = (currentImgIdx + 1) % allImages.length;
    setCurrentImgIdx(newIdx);
    setSelectedImg(allImages[newIdx]);
  };

  const Section = ({ icon: Icon, title, children }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} style={{ color: "var(--color-primary)" }} />
        <h3
          className="font-bold text-lg"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-4 py-3 flex items-center gap-3"
        style={{
          background: "var(--color-glass)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link to="/" className="ghost-button flex-shrink-0" style={{ padding: "0.45rem 1rem" }}>
          <ArrowLeft size={15} /> Back
        </Link>
        <span className="tag-pill hidden sm:inline-flex truncate max-w-[200px] lg:max-w-none">{project.type}</span>
        <div className="ml-auto flex-shrink-0">
          <ThemeToggle className="!flex" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="mb-10">
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
          >
            {project.intro}
          </p>
          <h1
            className="section-title mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {project.title}
          </h1>
          <p className="section-subtitle max-w-2xl">{project.tagline}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="cosmic-button">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.githubRepo && (
              <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="ghost-button">
                <Github size={15} /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Main image */}
        <div
          className="w-full rounded-2xl overflow-hidden mb-6 cursor-pointer"
          style={{ background: "var(--color-accent-dim)", minHeight: 220 }}
          onClick={() => openLightbox(project.mainImage, 0)}
        >
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full object-cover"
            style={{ maxHeight: "clamp(200px, 50vw, 460px)" }}
          />
        </div>

        {/* Thumbnail strip */}
        {project.carouselImages?.length > 0 && (
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-10">
            {[project.mainImage, ...project.carouselImages].map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{
                  background: "var(--color-accent-dim)",
                  border: currentImgIdx === idx ? "2px solid var(--color-primary)" : "2px solid transparent",
                }}
                onClick={() => openLightbox(img, idx)}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left 2/3 */}
          <div className="md:col-span-2 space-y-8">
            <Section icon={BookOpen} title="Overview">
              <p className="section-subtitle">{project.description}</p>
            </Section>

            {project.features?.length > 0 && (
              <Section icon={Star} title="Key Features">
                <ul className="space-y-2">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start" style={{ color: "var(--color-muted)" }}>
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}>✦</span>
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.challenges?.length > 0 && (
              <Section icon={AlertTriangle} title="Challenges">
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex gap-3 items-start" style={{ color: "var(--color-muted)" }}>
                      <span style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }}>→</span>
                      <span className="text-sm leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {project.learnings?.length > 0 && (
              <Section icon={BookOpen} title="Learnings">
                <ul className="space-y-2">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex gap-3 items-start" style={{ color: "var(--color-muted)" }}>
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}>◆</span>
                      <span className="text-sm leading-relaxed">{l}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6 md:col-span-1">
            {project.myRole?.length > 0 && (
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} style={{ color: "var(--color-primary)" }} />
                  <h4 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>My Role</h4>
                </div>
                <ul className="space-y-2">
                  {project.myRole.map((r, i) => (
                    <li key={i} className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>• {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.techStack?.length > 0 && (
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu size={16} style={{ color: "var(--color-primary)" }} />
                  <h4 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Tech Stack</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
            onClick={closeLightbox}
          >
            <X size={20} />
          </button>

          {/* Image */}
          <img
            src={selectedImg}
            alt="fullscreen"
            className="max-w-[92vw] max-h-[78vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div
            className="mt-3 text-xs"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-display)" }}
          >
            {currentImgIdx + 1} / {allImages.length}
          </div>

          {/* Prev / Next — bottom row on mobile, sides on larger screens */}
          <div className="flex gap-4 mt-4 sm:hidden">
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <button
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
          >
            <ChevronRight size={22} />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
