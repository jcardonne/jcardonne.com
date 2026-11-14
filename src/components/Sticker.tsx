"use client";

import {
  CatSitSticker,
  CatSticker,
  CoffeeSticker,
  CosmicEyeSticker,
  CuriousGlobeSticker,
  EyeSplatSticker,
  PeaceHandSticker,
  SparkleTrioSticker,
  SparklesSticker,
  StarBurstSticker,
  YellowCatSticker,
} from "stick-it-up";

const STICKERS = {
  cat: CatSticker,
  "cat-sit": CatSitSticker,
  coffee: CoffeeSticker,
  "cosmic-eye": CosmicEyeSticker,
  "curious-globe": CuriousGlobeSticker,
  "eye-splat": EyeSplatSticker,
  "peace-hand": PeaceHandSticker,
  sparkles: SparklesSticker,
  "sparkle-trio": SparkleTrioSticker,
  "star-burst": StarBurstSticker,
  "yellow-cat": YellowCatSticker,
} as const;

type Props = {
  name: keyof typeof STICKERS;
  /** Resting tilt in degrees. */
  rotate?: number;
  /** Positions and sizes the sticker; it fills the box this class describes. */
  className: string;
};

/** A decorative vinyl sticker that lifts when pointed at. */
export default function Sticker({ name, rotate = 0, className }: Props) {
  const Art = STICKERS[name];
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-10 block ${className}`}>
      <Art
        peel
        size="100%"
        className="pointer-events-auto"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </span>
  );
}
