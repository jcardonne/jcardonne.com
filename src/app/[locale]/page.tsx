import Image from "next/image";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";
import Arrow from "@/components/Arrow";
import ContactForm from "@/components/ContactForm";
import KineticName from "@/components/KineticName";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Sticker from "@/components/Sticker";
import TextLink from "@/components/TextLink";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGithubStats } from "@/lib/github";
import { fill, rich } from "@/lib/rich";
import { GITHUB_URL, GITHUB_USER, SITE_NAME, SITE_URL } from "@/lib/site";

const GITCHEF = `${GITHUB_URL}/gitchef`;
const DECEIVE = `${GITHUB_URL}/deceive-mac`;
const GUTTER = "px-5 sm:px-8 lg:px-10";

type RowProps = {
  id: string;
  /** Colour the row takes on hover: `row-pink`, `row-lime` or `row-blue`. */
  tone: string;
  sticker: Pick<ComponentProps<typeof Sticker>, "name" | "rotate">;
  title: string;
  type: string;
  stack?: string;
  body: string;
  links: { label: string; href: string }[];
};

function ProjectRow({ id, tone, sticker, title, type, stack, body, links }: RowProps) {
  return (
    <li id={id} className={`row border-t border-ink ${tone}`}>
      <div className={`grid gap-x-8 gap-y-5 py-9 md:grid-cols-12 md:py-14 ${GUTTER}`}>
        <div className="relative md:col-span-5">
          <h3 className="display max-w-[80%] text-[clamp(2.4rem,5.2vw,4.75rem)]">{title}</h3>
          <Sticker
            {...sticker}
            className="-top-4 right-0 w-[clamp(4.5rem,8.5vw,7.5rem)] md:-top-5"
          />
        </div>
        <p className="max-w-[44ch] text-lg leading-snug md:col-span-4 md:text-xl">{body}</p>
        <div className="flex flex-col items-start gap-4 md:col-span-3">
          <p className="dim">
            {type}
            {stack && (
              <>
                <br />
                {stack}
              </>
            )}
          </p>
          <ul className="flex flex-col items-start gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href}>{link.label}</TextLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const stats = await getGithubStats();
  const number = new Intl.NumberFormat(locale);
  const { hero, gitchef, deceive, cleanyourtv, client, work } = dict;
  const live = {
    version: stats.latestVersion,
    releases: number.format(stats.releases),
    commits: number.format(stats.commits),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Product builder",
    description: dict.meta.description,
    sameAs: [GITHUB_URL],
  };

  const facts = [
    { label: work.type, value: gitchef.type },
    { label: work.stack, value: gitchef.stack },
    { label: work.role, value: gitchef.role },
    { label: work.license, value: gitchef.license },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav locale={locale} dict={dict.nav} />

      <main id="main">
        <section className={`pb-20 pt-6 md:pb-32 md:pt-9 ${GUTTER}`}>
          {/* Sticker boxes are in cqw so they keep their place on the letters at every width. */}
          <div className="fit relative">
            <KineticName />
            <Sticker
              name="star-burst"
              rotate={14}
              className="right-[1cqw] top-[-2.5cqw] w-[19cqw]"
            />
            <Sticker
              name="yellow-cat"
              rotate={-9}
              className="left-[38cqw] top-[19.5cqw] w-[13cqw]"
            />
            <Sticker name="sparkles" rotate={6} className="left-[-1.5cqw] top-[34cqw] w-[8.5cqw]" />
          </div>
          <div className="mt-9 grid gap-x-8 gap-y-10 border-t border-ink pt-7 md:mt-12 md:grid-cols-12 md:pt-9">
            <p className="text-[clamp(1.7rem,3.5vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.025em] md:col-span-8">
              {hero.statement} {rich(hero.proof, live, "mark")}
            </p>
            <div className="flex flex-col items-start gap-5 text-lg md:col-span-4 lg:col-span-3 lg:col-start-10">
              <p>{hero.offer}</p>
              <p className="dim">{hero.based}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href="#contact" className="btn">
                  {hero.primary}
                  <Arrow />
                </a>
                <a href="#work" className="link font-[650]">
                  {hero.secondary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" aria-labelledby="work-title" className="border-t border-ink">
          <h2 id="work-title" className="sr-only">
            {work.title}
          </h2>

          <article
            id="gitchef"
            aria-labelledby="gitchef-title"
            className={`surface-yellow pb-20 pt-8 md:pb-32 ${GUTTER}`}
          >
            <div className="fit relative">
              <h3 id="gitchef-title" className="display fit-gitchef stretch">
                {gitchef.title}
              </h3>
              <Sticker name="cat" rotate={11} className="right-[2cqw] top-[8cqw] w-[13cqw]" />
            </div>

            <div className="mt-9 grid gap-x-8 gap-y-10 md:mt-14 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="max-w-[40ch] text-xl leading-snug md:text-2xl">{gitchef.body}</p>
                <p className="mt-6 text-lg">{rich(gitchef.pace, live)}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a
                    href={`${GITCHEF}/releases/latest`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                  >
                    {fill(gitchef.download, live)}
                    <Arrow direction="up-right" />
                  </a>
                  <TextLink href={GITCHEF}>{gitchef.repo}</TextLink>
                </div>
              </div>
              <dl className="md:col-span-5 md:col-start-8">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[6.5rem_1fr] gap-x-4 border-t border-hair py-3 first:border-ink"
                  >
                    <dt className="dim">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="unmask mt-14 border border-ink md:mt-20">
              <Image
                src="/work/gitchef-graph.png"
                alt={gitchef.shots.graph}
                width={2880}
                height={1800}
                sizes="100vw"
                className="h-auto w-full"
              />
            </figure>

            <div className="mt-8 grid gap-x-8 gap-y-10 md:mt-10 md:grid-cols-12">
              <ul className="md:col-span-4">
                {gitchef.features.map((feature) => (
                  <li key={feature.title} className="border-t border-hair py-4 first:border-ink">
                    <strong className="font-[750]">{feature.title}</strong> {feature.body}
                  </li>
                ))}
              </ul>
              <figure className="border border-ink md:col-span-8">
                <Image
                  src="/work/gitchef-staging.png"
                  alt={gitchef.shots.staging}
                  width={2880}
                  height={1800}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            </div>
          </article>

          <ul>
            <ProjectRow
              id="deceive"
              tone="row-pink"
              sticker={{ name: "eye-splat", rotate: -12 }}
              title={deceive.title}
              type={deceive.type}
              stack={deceive.stack}
              body={deceive.body}
              links={[
                { label: deceive.download, href: `${DECEIVE}/releases/latest` },
                { label: deceive.repo, href: DECEIVE },
              ]}
            />
            <ProjectRow
              id="cleanyourtv"
              tone="row-lime"
              sticker={{ name: "sparkle-trio", rotate: 10 }}
              title={cleanyourtv.title}
              type={cleanyourtv.type}
              stack={cleanyourtv.stack}
              body={cleanyourtv.body}
              links={[
                { label: cleanyourtv.pr, href: "https://github.com/Gathin23/cleanyourtv/pull/154" },
                { label: cleanyourtv.site, href: "https://cleanyour.tv" },
              ]}
            />
            <ProjectRow
              id="client-work"
              tone="row-blue"
              sticker={{ name: "cat-sit", rotate: -7 }}
              title={client.title}
              type={client.type}
              body={client.body}
              links={[{ label: client.cta, href: "#contact" }]}
            />
          </ul>
        </section>

        <Services dict={dict.services} />
        <Stats locale={locale} dict={dict.stats} stats={stats} />

        <section
          id="contact"
          aria-labelledby="contact-title"
          className={`surface-blue relative pb-24 pt-8 md:pb-36 ${GUTTER}`}
        >
          <Sticker
            name="coffee"
            rotate={12}
            className="right-[4%] top-8 w-[clamp(5.5rem,16vw,14rem)] md:right-[10%] md:top-16"
          />
          <h2
            id="contact-title"
            className="display max-w-[13ch] text-[clamp(3.25rem,11vw,11rem)] text-balance"
          >
            {dict.contact.title}
          </h2>
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-12">
            <div className="md:col-span-7">
              <ContactForm dict={dict.contact} />
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <h3 className="font-[750]">{dict.contact.elsewhere}</h3>
              <p className="mt-3 text-lg">
                <TextLink href={GITHUB_URL} className="font-normal">
                  github.com/{GITHUB_USER}
                </TextLink>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-ink py-6 text-paper ${GUTTER}`}
      >
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
        <p>{dict.footer.colophon}</p>
        <a href="#main" className="text-link inline-flex items-baseline gap-[0.35em]">
          <span className="link">{dict.footer.top}</span>
          <Arrow direction="up" />
        </a>
      </footer>
    </>
  );
}
