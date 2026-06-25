import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}
    >
      <div className="animate-fade-in">
        <p
          className="text-8xl font-black mb-2 text-gradient"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </p>
        <h1
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page Not Found
        </h1>
        <p className="mb-8" style={{ color: "var(--color-muted)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="cosmic-button">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
