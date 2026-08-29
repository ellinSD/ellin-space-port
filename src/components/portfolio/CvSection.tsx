import { useQuery } from "@tanstack/react-query";
import { Download, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_DOWNLOAD_URL, CV_URL, settingsQuery } from "@/lib/portfolio-api";
import { SectionHeading } from "./SectionHeading";

export function CvSection() {
  const { data: settings } = useQuery(settingsQuery);
  const hasCv = Boolean(settings?.cv_path);

  return (
    <section id="cv" className="section-shell">
      <SectionHeading eyebrow="CV / Resume" title="My full resume" />

      <div className="card-elevated flex flex-col items-start gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="rounded-xl bg-accent p-3 text-primary">
            <FileText className="size-6" />
          </span>
          <div>
            <h3 className="text-base font-semibold">Modinatul Ferdows Ellin — CV</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {hasCv
                ? "Education, skills, projects and contact details in one PDF."
                : "The PDF is being updated — please reach out by email in the meantime."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="outline" disabled={!hasCv}>
            <a href={CV_URL} target="_blank" rel="noreferrer">
              <Eye className="size-4" /> View CV
            </a>
          </Button>
          <Button asChild size="lg" disabled={!hasCv}>
            <a href={CV_DOWNLOAD_URL}>
              <Download className="size-4" /> Download CV
            </a>
          </Button>
        </div>
      </div>

      {hasCv && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
          <object data={CV_URL} type="application/pdf" className="h-[70vh] w-full">
            <p className="p-6 text-sm text-muted-foreground">
              Your browser can't display the PDF inline. Use the download button above.
            </p>
          </object>
        </div>
      )}
    </section>
  );
}
