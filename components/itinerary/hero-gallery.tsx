import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/lib/types";

interface HeroGalleryProps {
  photos: Photo[] | null;
  destination: string;
}

export function HeroGallery({
  photos,
  destination,
}: HeroGalleryProps): ReactNode {
  if (!photos || photos.length === 0) return null;
  const [main, ...rest] = photos;

  return (
    <div className="grid gap-2 overflow-hidden rounded-2xl md:grid-cols-[2fr_1fr]">
      <div className="relative aspect-[16/10] md:aspect-[4/3]">
        <Image
          src={main.largeUrl ?? main.mediumUrl}
          alt={main.alt ?? destination}
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>
      {rest.length > 0 ? (
        <div className="hidden grid-rows-2 gap-2 md:grid">
          {rest.slice(0, 2).map((photo) => (
            <div key={photo.id} className="relative">
              <Image
                src={photo.mediumUrl}
                alt={photo.alt ?? destination}
                fill
                sizes="33vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
