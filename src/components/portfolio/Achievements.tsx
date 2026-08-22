import { useQuery } from "@tanstack/react-query";
import { Award, Trophy } from "lucide-react";
import { achievementsQuery } from "@/lib/portfolio-api";
import { SectionHeading } from "./SectionHeading";

export function Achievements() {
  const { data: achievements = [], isLoading } = useQuery(achievementsQuery);

  return (
    <section id="achievements" className="section-shell">
      <SectionHeading
        eyebrow="Achievements"
        title="Milestones along the way"
        description="Certificates, awards and competition results collected during my degree."
      />

      {isLoading ? (
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-border bg-surface" />
          ))}
        </div>
      ) : achievements.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-12 text-center">
          <Trophy className="mx-auto size-8 text-primary" />
          <h3 className="mt-4 text-base font-semibold">First milestones on the way</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Certificates, awards and competition results will be listed here as they come.
          </p>
        </div>
      ) : (
        <ol className="relative space-y-5 border-l border-border pl-6">
          {achievements.map((item) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[31px] top-5 flex size-2.5 rounded-full bg-primary" />
              <div className="card-elevated rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    <Award className="size-4 text-primary" />
                    {item.title}
                  </h3>
                  {item.date_label && (
                    <span className="text-xs text-muted-foreground">{item.date_label}</span>
                  )}
                </div>
                {item.issuer && <p className="mt-1 text-sm text-primary">{item.issuer}</p>}
                {item.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
