type Props = { direction?: "right" | "up-right" | "up"; className?: string };

const ROTATION = { right: "rotate-0", "up-right": "-rotate-45", up: "-rotate-90" } as const;

export default function Arrow({ direction = "right", className = "" }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-[0.8em] w-[0.8em] shrink-0 ${ROTATION[direction]} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="square"
    >
      <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}
