import { Code2, Database, Globe } from "lucide-react";
import { skillGroups } from "@/lib/portfolio-content";
import { SectionHeading } from "./SectionHeading";

const icons = { Code2, Globe, Database } as const;

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I'm building fluency in"
        description="Coursework, lab work and self-study across programming, the web and data."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div key={group.title} className="card-elevated rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-accent p-2.5 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">{group.title}</h3>
              </div>

              <div className="mt-6 space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
