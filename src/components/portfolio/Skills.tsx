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

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
