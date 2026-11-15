import type { ReactNode } from "react";
import Arrow from "./Arrow";

type Props = {
  href: string;
  children: ReactNode;
  /** Leading icon that names the destination, e.g. the GitHub mark. */
  icon?: ReactNode;
  className?: string;
};

/** Underlined text link followed by an arrow: up-right when it leaves the site, right when it stays. */
export default function TextLink({ href, children, icon, className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`text-link inline-flex items-center gap-[0.4em] font-[650] ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {icon}
      <span className="link">{children}</span>
      <Arrow direction={external ? "up-right" : "right"} />
    </a>
  );
}
