import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GithubStats } from "@/lib/github";
import { rich } from "@/lib/rich";
import { GITHUB_URL } from "@/lib/site";
import Sticker from "./Sticker";
import TextLink from "./TextLink";

type Props = { locale: Locale; dict: Dictionary["stats"]; stats: GithubStats };

export default function Stats({ locale, dict, stats }: Props) {
  const number = new Intl.NumberFormat(locale);
  const percent = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" });
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  const languages = list.format(
    stats.languages.map((language) => `${percent.format(language.share)} ${language.name}`),
  );

  return (
    <section
      id="in-public"
      aria-labelledby="in-public-title"
      className="relative border-t border-ink px-5 pb-24 pt-8 sm:px-8 md:pb-36 lg:px-10"
    >
      <Sticker
        name="curious-globe"
        rotate={9}
        className="right-[5%] top-6 w-[clamp(5rem,13vw,11.5rem)] md:right-[14%] md:top-12"
      />
      <h2 id="in-public-title" className="display text-[clamp(3rem,9.5vw,9.5rem)]">
        {dict.title}
      </h2>

      <p className="mt-12 max-w-[30ch] text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[1.06] tracking-[-0.025em] md:mt-20">
        {rich(dict.sentence, {
          commits: number.format(stats.commits),
          releases: number.format(stats.releases),
          date: date.format(new Date(stats.latestReleaseAt)),
          repos: number.format(stats.repos),
          stars: number.format(stats.stars),
          followers: number.format(stats.followers),
        })}
      </p>

      <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-ink pt-6 md:mt-20 md:grid-cols-12">
        <p className="text-xl md:col-span-6 md:text-2xl">
          {rich(dict.languages, { list: languages })}
        </p>
        <div className="flex flex-col items-start gap-4 md:col-span-5 md:col-start-8">
          <p className="dim">{stats.live ? dict.live : dict.snapshot}</p>
          <TextLink href={GITHUB_URL}>{dict.profile}</TextLink>
        </div>
      </div>
    </section>
  );
}
