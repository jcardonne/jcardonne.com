import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubStats } from "@/lib/github";
import { rich } from "@/lib/rich";
import { GITHUB_URL } from "@/lib/site";
import GithubMark from "./GithubMark";
import Sticker from "./Sticker";
import TextLink from "./TextLink";

type Props = { locale: Locale; dict: Dictionary["stats"]; stats: GithubStats };

export default function Stats({ locale, dict, stats }: Props) {
  const number = new Intl.NumberFormat(locale);

  return (
    <section
      id="in-public"
      aria-labelledby="in-public-title"
      className="relative border-t border-ink px-5 pb-24 pt-8 sm:px-8 md:pb-32 lg:px-10"
    >
      <Sticker
        name="curious-globe"
        rotate={9}
        className="right-[5%] top-6 w-[clamp(5rem,13vw,11.5rem)] md:right-[14%] md:top-12"
      />
      <h2 id="in-public-title" className="display text-[clamp(3rem,9.5vw,9.5rem)]">
        {dict.title}
      </h2>

      <p className="mt-12 max-w-[26ch] text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.025em] md:mt-16">
        {rich(
          dict.sentence,
          {
            commits: number.format(stats.commits),
            releases: number.format(stats.releases),
            repos: number.format(stats.repos),
          },
          "mark",
        )}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <TextLink href={GITHUB_URL} icon={<GithubMark />}>
          {dict.profile}
        </TextLink>
        <p className="dim">{stats.live ? dict.live : dict.snapshot}</p>
      </div>
    </section>
  );
}
