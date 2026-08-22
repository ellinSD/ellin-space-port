import { useState } from "react";
import { PHOTO_URL } from "@/lib/portfolio-api";
import profileAsset from "@/assets/profile.jpg.asset.json";
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
        "relative overflow-hidden rounded-3xl border border-border bg-surface",
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-accent">
          <span className="font-display text-5xl font-bold accent-gradient-text">MFE</span>
        </div>
      ) : (
        <img
          src={PHOTO_URL}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
