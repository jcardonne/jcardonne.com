import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { locale: Locale; dict: Dictionary["nav"] };

export default function Nav({ locale, dict }: Props) {
  const other: Locale = locale === "en" ? "fr" : "en";
  const links = [
    { href: "#work", label: dict.work },
    { href: "#services", label: dict.services },
    { href: "#in-public", label: dict.openSource },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <a
        href="#main"
        className="btn absolute left-4 top-2 -translate-y-24 focus-visible:translate-y-0"
      >
        {dict.skip}
      </a>
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Link href={`/${locale}`} className="font-[750] tracking-[-0.01em]">
          Jean Cardonne
        </Link>
        <nav aria-label={dict.label} className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link decoration-transparent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="link font-[650]">
            {dict.contact}
          </a>
          <Link
            href={`/${other}`}
            hrefLang={other}
            lang={other}
            aria-label={dict.switchLabel}
            className="link decoration-transparent uppercase"
          >
            {other}
          </Link>
        </nav>
      </div>
    </header>
  );
}
