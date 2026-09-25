import Image from "next/image";
import type { Photo } from "@/lib/images";

/**
 * A photo filling its container (object-fit: cover) with a focal point.
 * The parent sets the size and radius.
 */
export function ProductImage({
  photo,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
  className = "",
}: {
  photo: Photo;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={{ objectPosition: photo.position ?? "50% 50%" }}
    />
  );
}
