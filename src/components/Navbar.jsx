import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Skills",        href: "#skills" },
  { label: "Training & Conferences",  href: "#publications" },
  { label: "Projects",      href: "#projects" },
  { label: "Gallery",       href: "#gallery" },
  { label: "Certificates",  href: "#certificates" },
  { label: "Contact",  href: "#contact" },
];

export function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [activeLink, setActiveLink]   = useState("#hero");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeSection) setActiveLink(`#${activeSection}`);
  }, [activeSection]);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: isScrolled ? "var(--color-glass)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--color-border)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: activeLink === href ? "var(--color-primary)" : "var(--color-muted)",
                    background: activeLink === href ? "var(--color-accent-dim)" : "transparent",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger */}
            <button
              className="lg:hidden z-50 w-10 h-10 flex items-center justify-center rounded-full transition-all"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6"
          style={{ background: "var(--color-glass)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              className="text-3xl font-bold transition-all hover:scale-105"
              style={{
                fontFamily: "var(--font-display)",
                color: activeLink === href ? "var(--color-primary)" : "var(--color-foreground)",
              }}
            >
              {label}
            </a>
          ))}
          <div className="mt-2">
            <ThemeToggle className="!flex" />
          </div>
        </div>
      )}
    </>
  );
}
