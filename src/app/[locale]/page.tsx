import {
  Cloud,
  CodeXml,
  Crosshair,
  Download,
  GitBranch,
  GitMerge,
  GitPullRequest,
  ListChecks,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import Arrow from "@/components/Arrow";
import ContactForm from "@/components/ContactForm";
import Flagship from "@/components/Flagship";
import GithubMark from "@/components/GithubMark";
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

const KISSAKI_ICONS = [Crosshair, CodeXml, Cloud, ShieldCheck];
const GITCHEF_ICONS = [GitBranch, ListChecks, GitMerge, GitPullRequest];

type RowLink = { label: string; href: string; icon?: ReactNode };

type RowProps = {
  id: string;
  /** Colour the row takes on hover: `row-pink`, `row-lime` or `row-blue`. */
  tone: string;
  sticker: Pick<ComponentProps<typeof Sticker>, "name" | "rotate">;
  title: string;
  meta: string;
  body: string;
  links: RowLink[];
};

function ProjectRow({ id, tone, sticker, title, meta, body, links }: RowProps) {
  return (
    <li id={id} className={`row border-t border-ink ${tone}`}>
      <div className={`grid gap-x-8 gap-y-4 py-9 md:grid-cols-12 md:py-12 ${GUTTER}`}>
        <div className="relative md:col-span-5">
          <h3 className="display max-w-[80%] text-[clamp(2.4rem,5.2vw,4.75rem)]">{title}</h3>
          <Sticker
            {...sticker}
            className="-top-4 right-0 w-[clamp(4.5rem,8.5vw,7.5rem)] md:-top-5"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="dim">{meta}</p>
          <p className="mt-2 max-w-[48ch] text-lg leading-snug md:text-xl">{body}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} icon={link.icon}>
                  {link.label}
                </TextLink>
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
  const { hero, kissaki, gitchef, deceive, cleanyourtv, client, work } = dict;
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav locale={locale} dict={dict.nav} />

      <main id="main">
        <section className={`pb-20 pt-6 md:pb-28 md:pt-9 ${GUTTER}`}>
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
          </div>
          <div className="mt-9 grid items-end gap-x-8 gap-y-8 border-t border-ink pt-7 md:mt-12 md:grid-cols-12 md:pt-9">
            <p className="text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em] md:col-span-7">
              {hero.statement}
            </p>
            <div className="flex flex-col items-start gap-6 text-lg md:col-span-5 lg:col-span-4 lg:col-start-9">
              <p>{hero.offer}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
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

          <Flagship
            id="kissaki"
            surface="surface-ink"
            title={kissaki.title}
            fit={0.185}
            sticker={{
              name: "cosmic-eye",
              rotate: -10,
              className: "right-[3cqw] top-[4.5cqw] w-[12cqw]",
            }}
            body={kissaki.body}
            actions={
              <>
                <a href={kissaki.url} target="_blank" rel="noreferrer" className="btn">
                  {kissaki.visit}
                  <Arrow direction="up-right" />
                </a>
                <span className="dim">{kissaki.status}</span>
              </>
            }
            aside={
              <Image
                src="/work/nvidia-inception.png"
                alt={kissaki.inception}
                title={kissaki.inception}
                width={270}
                height={96}
                className="h-auto w-[135px] bg-white"
              />
            }
            shot={{ src: "/work/kissaki-home.webp", alt: kissaki.shot, width: 2880, height: 1800 }}
            features={kissaki.features.map((feature, i) => ({ ...feature, icon: KISSAKI_ICONS[i] }))}
          />

          <Flagship
            id="gitchef"
            surface="surface-yellow"
            title={gitchef.title}
            fit={0.17}
            sticker={{ name: "cat", rotate: 11, className: "right-[2cqw] top-[5cqw] w-[12cqw]" }}
            body={rich(gitchef.body, live)}
            actions={
              <>
                <a
                  href={`${GITCHEF}/releases/latest`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  <Download aria-hidden="true" strokeWidth={2.25} className="size-[1em]" />
                  {fill(gitchef.download, live)}
                </a>
                <TextLink href={GITCHEF} icon={<GithubMark />}>
                  {gitchef.repo}
                </TextLink>
              </>
            }
            shot={{ src: "/work/gitchef-graph.png", alt: gitchef.shot, width: 2880, height: 1800 }}
            features={gitchef.features.map((feature, i) => ({ ...feature, icon: GITCHEF_ICONS[i] }))}
          />

          <ul>
            <ProjectRow
              id="deceive"
              tone="row-pink"
              sticker={{ name: "eye-splat", rotate: -12 }}
              title={deceive.title}
              meta={deceive.meta}
              body={deceive.body}
              links={[
                {
                  label: deceive.download,
                  href: `${DECEIVE}/releases/latest`,
                  icon: <Download aria-hidden="true" strokeWidth={2.25} className="size-[1em]" />,
                },
                { label: deceive.repo, href: DECEIVE, icon: <GithubMark /> },
              ]}
            />
            <ProjectRow
              id="cleanyourtv"
              tone="row-lime"
              sticker={{ name: "sparkle-trio", rotate: 10 }}
              title={cleanyourtv.title}
              meta={cleanyourtv.meta}
              body={cleanyourtv.body}
              links={[
                {
                  label: cleanyourtv.pr,
                  href: "https://github.com/Gathin23/cleanyourtv/pull/154",
                  icon: <GitPullRequest aria-hidden="true" strokeWidth={2.25} className="size-[1em]" />,
                },
                { label: cleanyourtv.site, href: "https://cleanyour.tv" },
              ]}
            />
            <ProjectRow
              id="client-work"
              tone="row-blue"
              sticker={{ name: "cat-sit", rotate: -7 }}
              title={client.title}
              meta={client.meta}
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
          className={`surface-blue relative pb-24 pt-8 md:pb-32 ${GUTTER}`}
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
          <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <ContactForm dict={dict.contact} />
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <h3 className="font-[750]">{dict.contact.elsewhere}</h3>
              <p className="mt-3 text-lg">
                <TextLink href={GITHUB_URL} icon={<GithubMark />} className="font-normal">
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
        <a href="#main" className="text-link inline-flex items-center gap-[0.4em]">
          <span className="link">{dict.footer.top}</span>
          <Arrow direction="up" />
        </a>
      </footer>
    </>
  );
}
