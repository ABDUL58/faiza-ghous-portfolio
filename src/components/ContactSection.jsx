import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ─── Web3Forms access key ───────────────────────────────────
// Get your free key at https://web3forms.com  (enter your email → they send the key)
// Free tier: 250 submissions / month, no backend needed
const WEB3FORMS_KEY = "f456caa4-4f0b-4769-a4d9-bba386dc49ca";

const CONTACT_INFO = [
  { icon: Mail,   label: "Email",    value: "faizabaloch10@gmail.com", href: "mailto:faizabaloch10@gmail.com" },
  { icon: Phone,  label: "Phone",    value: "+92 312 0543279",         href: "tel:+923120543279" },
  { icon: MapPin, label: "Location", value: "Islamabad, Pakistan",     href: null },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/faiza-baloch-a90483190/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BT9hvAPdGQPuARc1tCyOBMQ%3D%3D", label: "LinkedIn" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData]         = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name:       formData.name,
          email:      formData.email,
          subject:    formData.subject || "New message from portfolio",
          message:    formData.message,
          from_name:  "Portfolio Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast({ title: "Message sent!", description: "I'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch {
      toast({
        title: "Error sending message",
        description: "Please try emailing me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    color: "var(--color-foreground)",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="tag-pill mb-4">Let's Talk</p>
          <h2 className="section-title mb-3">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle max-w-lg mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — info */}
          <div>
            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--color-accent-dim)" }}
                  >
                    <Icon size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-sm font-medium hover:underline" style={{ color: "var(--color-foreground)" }}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "var(--color-foreground)" }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                  style={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-muted)",
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>
                  Your Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project inquiry / Collaboration / Other"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full justify-center"
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Sending…" : (<><Send size={15} /> Send Message</>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
