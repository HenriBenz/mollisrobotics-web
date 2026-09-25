/**
 * Product photography. Files live in public/products/.
 * Each photo has its intrinsic size and a default focal point for object-fit cropping.
 */
export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for cropped uses, e.g. "50% 30%". */
  position?: string;
}

export const photos = {
  family: {
    src: "/products/mollis-product-01.jpg",
    width: 1536,
    height: 1024,
    alt: "MOLLIS Core mounted on an industrial robot with five finger variants standing below it",
    position: "50% 60%",
  },
  soft: {
    src: "/products/mollis-product-02.jpg",
    width: 1240,
    height: 1269,
    alt: "MOLLIS Soft tool with orange compliant fingers on a robot arm in a workshop",
    position: "50% 45%",
  },
  softDetail: {
    src: "/products/mollis-product-03.jpg",
    width: 1024,
    height: 1536,
    alt: "Close-up of MOLLIS orange compliant fingers below the Core",
    position: "50% 55%",
  },
  grip: {
    src: "/products/mollis-product-04.jpg",
    width: 1536,
    height: 1024,
    alt: "MOLLIS Grip parallel gripper with aluminium jaws and black pads",
    position: "50% 50%",
  },
  hand: {
    src: "/products/mollis-product-05.jpg",
    width: 1536,
    height: 1024,
    alt: "MOLLIS Hand with articulated aluminium fingers holding a concrete block",
    position: "50% 50%",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/** Which photo (and crop) represents each product. */
const productPhotos: Record<string, { photo: PhotoId; position?: string; gallery?: PhotoId[] }> = {
  "developer-kit-grip": { photo: "grip", gallery: ["family"] },
  "developer-kit-soft": { photo: "soft", gallery: ["softDetail"] },
  "research-kit": { photo: "family", position: "50% 55%", gallery: ["grip", "soft"] },
  "link-iso-50": { photo: "softDetail", position: "50% 8%" },
  "link-blank": { photo: "grip", position: "50% 5%" },
  core: { photo: "family", position: "50% 28%", gallery: ["softDetail"] },
  grip: { photo: "grip", gallery: ["hand"] },
  soft: { photo: "softDetail", gallery: ["soft"] },
  hand: { photo: "hand", gallery: ["grip"] },
  pick: { photo: "soft", position: "50% 60%" },
  "fingers-rigid": { photo: "grip", position: "50% 75%" },
  "fingers-soft": { photo: "softDetail", position: "50% 70%" },
  "fingers-blank": { photo: "family", position: "50% 78%" },
  sense: { photo: "family", position: "50% 22%" },
  "cable-set": { photo: "soft", position: "30% 25%" },
};

export function photoFor(slug: string): Photo {
  const entry = productPhotos[slug] ?? { photo: "family" as PhotoId };
  const base = photos[entry.photo];
  return { ...base, position: entry.position ?? base.position };
}

export function galleryFor(slug: string): Photo[] {
  const entry = productPhotos[slug];
  return (entry?.gallery ?? []).map((id) => photos[id]);
}
