import Image from "next/image";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import Arrow from "./Arrow";
import Sticker from "./Sticker";
import TextLink from "./TextLink";

type Shot = { src: string; alt: string; width: number; height: number };
type Action = { label: string; href: string };

type Props = {
  id: string;
  /** Coloured block the spread sits on: `surface-yellow`, `surface-ink`. */
  surface: string;
  title: string;
  /**
   * Title font size as a fraction of the container width, chosen so the word
   * spans the container when the width axis is fully open.
   */
  fit: number;
  sticker: ComponentProps<typeof Sticker>;
  body: string;
  note?: ReactNode;
  primary: Action;
  secondary?: Action;
  facts: { label: string; value: string }[];
  /** A wide lead image, then a detail shown beside the feature list. */
  shots: [Shot, Shot];
  features: { title: string; body: string }[];
};

/** Full-width spread for a headline project. */
export default function Flagship({
  id,
  surface,
  title,
  fit,
  sticker,
  body,
  note,
  primary,
  secondary,
  facts,
  shots,
  features,
}: Props) {
  const [lead, detail] = shots;

  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${surface} px-5 pb-20 pt-8 sm:px-8 md:pb-32 lg:px-10`}
    >
      <div className="fit relative">
        <h3
          id={`${id}-title`}
          className="display fit-title stretch"
          style={{ "--fit": fit } as CSSProperties}
        >
          {title}
        </h3>
        <Sticker {...sticker} />
      </div>

      <div className="mt-9 grid gap-x-8 gap-y-10 md:mt-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-[40ch] text-xl leading-snug md:text-2xl">{body}</p>
          {note && <p className="mt-6 text-lg">{note}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={primary.href} target="_blank" rel="noreferrer" className="btn">
              {primary.label}
              <Arrow direction="up-right" />
            </a>
            {secondary && <TextLink href={secondary.href}>{secondary.label}</TextLink>}
          </div>
        </div>
        <dl className="md:col-span-5 md:col-start-8">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="hairline grid grid-cols-[6.5rem_1fr] gap-x-4 border-t py-3 first:border-current"
            >
              <dt className="dim">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="unmask mt-14 border border-current md:mt-20">
        <Image
          src={lead.src}
          alt={lead.alt}
          width={lead.width}
          height={lead.height}
          sizes="100vw"
          className="h-auto w-full"
        />
      </figure>

      <div className="mt-8 grid items-start gap-x-8 gap-y-10 md:mt-10 md:grid-cols-12">
        <ul className="md:col-span-4">
          {features.map((feature) => (
            <li key={feature.title} className="hairline border-t py-4 first:border-current">
              <strong className="font-[750]">{feature.title}</strong> {feature.body}
            </li>
          ))}
        </ul>
        <figure className="border border-current md:col-span-8">
          <Image
            src={detail.src}
            alt={detail.alt}
            width={detail.width}
            height={detail.height}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </article>
  );
}
