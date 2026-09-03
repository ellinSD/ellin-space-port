import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProfilePhoto({
  className,
  alt = "Portrait of Modinatul Ferdows Ellin",
}: {
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full border border-border bg-surface",
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-accent">
          <span className="font-display text-5xl font-bold accent-gradient-text">
            MFE
          </span>
        </div>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}IMG_6958.PNG`}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
