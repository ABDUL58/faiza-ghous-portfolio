import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PublicationsSection } from "@/components/PublicationsSection";
import { ContactSection } from "@/components/ContactSection";
import { GallerySection } from "@/components/GallerySection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { MapSection } from "@/components/MapSection";
import { useVisitorLog } from "@/hooks/useVisitorLog";

export function Home() {
  useVisitorLog();
  const [visibleSectionId, setVisibleSectionId] = useState("hero");
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* Fixed map background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MapSection />
      </div>

      {/* Navbar */}
      <Navbar activeSection={visibleSectionId} />

      {/* Main content */}
      <main className="relative z-10">
        <div id="hero" ref={(el) => (sectionsRef.current[0] = el)}>
          <HeroSection />
        </div>
        <div id="about" ref={(el) => (sectionsRef.current[1] = el)}>
          <AboutSection />
        </div>
        <div id="skills" ref={(el) => (sectionsRef.current[2] = el)}>
          <SkillsSection />
        </div>
        <div id="publications" ref={(el) => (sectionsRef.current[3] = el)}>
          <PublicationsSection />
        </div>
        <div id="projects" ref={(el) => (sectionsRef.current[4] = el)}>
          <ProjectsSection />
        </div>
        <div id="gallery" ref={(el) => (sectionsRef.current[5] = el)}>
          <GallerySection />
        </div>
        <div id="certificates" ref={(el) => (sectionsRef.current[6] = el)}>
          <CertificatesSection />
        </div>
        <div id="contact" ref={(el) => (sectionsRef.current[7] = el)}>
          <ContactSection />
        </div>
      </main>

    </div>
  );
}
