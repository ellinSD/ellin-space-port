import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="size-5" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
