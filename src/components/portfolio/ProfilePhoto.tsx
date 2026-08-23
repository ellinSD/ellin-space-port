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
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const failed = stage === 2;
  const src = stage === 0 ? PHOTO_URL : profileAsset.url;

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full border border-border bg-surface",
        className,
      )}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-accent">
          <span className="font-display text-5xl font-bold accent-gradient-text">MFE</span>
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setStage((s) => (s === 0 ? 1 : 2))}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
