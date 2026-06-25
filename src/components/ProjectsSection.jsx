import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projectsData";

export function ProjectsSection() {
  const carouselRef = useRef(null);

  const getCardWidth = () => {
    if (!carouselRef.current) return 320;
    const container = carouselRef.current;
    const width = container.clientWidth;
    if (width >= 1024) return width / 3;
    if (width >= 640)  return width / 2;
    return width;
  };

  const scroll = (dir) => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollBy({ left: dir * getCardWidth(), behavior: "smooth" });
  };

  return (
    <section
      className="py-16 sm:py-24 px-4"
      style={{ background: "var(--color-section-alt)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="tag-pill mb-4">What I've Built</p>
            <h2 className="section-title">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>

          {/* Chevron buttons */}
          <div className="flex gap-2">
            {[{ dir: -1, Icon: ChevronLeft }, { dir: 1, Icon: ChevronRight }].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-5 scroll-smooth no-scrollbar pb-2"
        >
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31%] gradient-border card-hover overflow-hidden block group"
              style={{ background: "var(--color-card)", textDecoration: "none" }}
            >
              {/* Cover image */}
              <div
                className="w-full h-48 overflow-hidden relative"
                style={{ background: "var(--color-accent-dim)" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.display = "flex";
                    e.currentTarget.parentElement.style.alignItems = "center";
                    e.currentTarget.parentElement.style.justifyContent = "center";
                    e.currentTarget.parentElement.innerHTML = `<span style="font-family:var(--font-display);font-size:2rem;opacity:0.4">${project.id}</span>`;
                  }}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(30,111,255,0.15)" }}
                >
                  <ExternalLink size={24} color="#fff" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                >
                  {project.type}
                </p>

                <h3
                  className="font-bold mb-2 leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    color: "var(--color-foreground)",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-sm line-clamp-2"
                  style={{ color: "var(--color-muted)" }}
                >
                  {project.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
