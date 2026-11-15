import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

type Props = { direction?: "right" | "up-right" | "up"; className?: string };

const ICONS = { right: ArrowRight, "up-right": ArrowUpRight, up: ArrowUp } as const;

export default function Arrow({ direction = "right", className = "" }: Props) {
  const Icon = ICONS[direction];
  return <Icon aria-hidden="true" strokeWidth={2.25} className={`size-[1em] shrink-0 ${className}`} />;
}
