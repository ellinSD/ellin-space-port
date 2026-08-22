import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsQuery, type Project } from "@/lib/portfolio-api";
import { profile } from "@/lib/portfolio-content";
import { SectionHeading } from "./SectionHeading";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-elevated flex flex-col rounded-2xl p-6">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      {project.description && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      )}

      {project.tech_stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild size="sm" variant="secondary">
          <a href={project.github_url || profile.contact.github} target="_blank" rel="noreferrer">
            <Github className="size-4" /> Code
          </a>
        </Button>
        {project.live_url && (
          <Button asChild size="sm" variant="outline">
            <a href={project.live_url} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" /> Live
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { data: projects = [], isLoading } = useQuery(projectsQuery);

  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Things I'm building"
        description="A growing collection of coursework and personal projects. New work lands here as I finish it."
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-surface" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-12 text-center">
          <FolderGit2 className="mx-auto size-8 text-primary" />
          <h3 className="mt-4 text-base font-semibold">Projects coming soon</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            New projects are being polished right now. In the meantime, my code experiments live on
            GitHub.
          </p>
          <Button asChild size="sm" className="mt-6">
            <a href={profile.contact.github} target="_blank" rel="noreferrer">
              <Github className="size-4" /> Visit GitHub
            </a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
