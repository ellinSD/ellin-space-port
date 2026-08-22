import { BookOpen, Camera, Clapperboard, Cpu, GraduationCap, Music, Plane } from "lucide-react";
import { profile, hobbies } from "@/lib/portfolio-content";
import { SectionHeading } from "./SectionHeading";

const icons = { Plane, BookOpen, Camera, Music, Clapperboard, Cpu } as const;

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading eyebrow="About" title="Curious by default, engineer by training" />

      <div className="mx-auto max-w-3xl">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {profile.bio}
        </p>

        <div className="card-elevated mt-8 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <span className="rounded-xl bg-accent p-3 text-primary">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold">{profile.education.degree}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{profile.education.institution}</p>
              <p className="text-sm text-muted-foreground">{profile.education.department}</p>
              <p className="mt-2 text-sm font-medium text-primary">{profile.education.status}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Beyond the code
          </h3>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {hobbies.map((hobby) => {
              const Icon = icons[hobby.icon];
              return (
                <span
                  key={hobby.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="size-3.5 text-primary" />
                  {hobby.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
