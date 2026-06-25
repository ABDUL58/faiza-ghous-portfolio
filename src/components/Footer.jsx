import { ArrowUp } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-4 text-center relative"
      style={{
        background: "var(--color-section-alt)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <p
        className="text-sm"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}
      >
        © {year}{" "}
        <span style={{ color: "var(--color-foreground)", fontWeight: 600 }}>
          Faiza Ghous
        </span>
        . Designed &amp; built with React + Vite + Tailwind CSS.
      </p>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-2"
        style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          color: "var(--color-muted)",
        }}
      >
        <ArrowUp size={15} />
      </a>
    </footer>
  );
}
