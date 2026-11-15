import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import Sticker from "./Sticker";

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
  body: ReactNode;
  /** Buttons and links under the description. */
  actions: ReactNode;
  /** Optional mark shown beside the description, e.g. a programme badge. */
  aside?: ReactNode;
  shot: { src: string; alt: string; width: number; height: number };
  features: { icon: LucideIcon; title: string; body: string }[];
};

/** Full-width spread for a headline project: name, one paragraph, one image, four features. */
export default function Flagship({
  id,
  surface,
  title,
  fit,
  sticker,
  body,
  actions,
  aside,
  shot,
  features,
}: Props) {
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

      <div className="mt-9 grid items-end gap-x-8 gap-y-8 md:mt-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="max-w-[42ch] text-xl leading-snug md:text-2xl">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>
        </div>
        {aside && <div className="md:col-span-4 md:col-start-9 md:justify-self-end">{aside}</div>}
      </div>

      <figure className="unmask mt-12 border border-current md:mt-16">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="100vw"
          className="h-auto w-full"
        />
      </figure>

      <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title: name, body: text }) => (
          <li key={name}>
            <Icon aria-hidden="true" strokeWidth={2} className="size-6" />
            <h4 className="mt-3 font-[750]">{name}</h4>
            <p className="dim mt-1">{text}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
