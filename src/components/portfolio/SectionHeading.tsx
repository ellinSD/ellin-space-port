export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
