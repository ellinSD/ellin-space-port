import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-content";
import { CV_URL } from "@/lib/portfolio-api";
import { ProfilePhoto } from "./ProfilePhoto";

export function Hero() {
  return (
    <section id="home" className="hero-surface relative overflow-hidden pt-28">
      <div className="section-shell flex flex-row items-center gap-6 md:gap-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            {profile.contact.location}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-base font-medium accent-gradient-text sm:text-lg">
            {profile.tagline}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View Projects <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={CV_URL} target="_blank" rel="noreferrer">
                <Download className="size-4" /> Download CV
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                <Mail className="size-4" /> Contact Me
              </a>
            </Button>
          </div>
        </div>

        <ProfilePhoto className="w-full max-w-[120px] flex-shrink-0 self-center sm:max-w-[180px] md:max-w-[240px] lg:max-w-[280px] shadow-[var(--shadow-elevated)]" />
      </div>
    </section>
  );
}
