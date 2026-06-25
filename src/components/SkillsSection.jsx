import { skills } from "@/data/skillsData";

export function SkillsSection() {
  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="tag-pill mb-4">What I Know</p>
          <h2 className="section-title mb-3">
            Skills &amp; <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-subtitle max-w-lg mx-auto">
            A snapshot of the technologies I work with daily and my proficiency in each.
          </p>
        </div>

        {/* Skills grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card card-hover p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <span
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-foreground)" }}
                >
                  {skill.name}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--color-border)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                  }}
                />
              </div>

              {/* Category tag */}
              <div className="mt-3">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "var(--color-accent-dim)",
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
