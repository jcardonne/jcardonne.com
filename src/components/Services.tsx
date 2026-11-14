import type { Dictionary } from "@/i18n/dictionaries";
import Sticker from "./Sticker";

export default function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative border-t border-ink px-5 pb-24 pt-8 sm:px-8 md:pb-36 lg:px-10"
    >
      <Sticker
        name="peace-hand"
        rotate={-10}
        className="right-[5%] top-[4.5rem] w-[clamp(5.5rem,15vw,13rem)] md:right-[12%] md:top-14"
      />
      <h2
        id="services-title"
        className="display max-w-[14ch] text-[clamp(3rem,9.5vw,9.5rem)] text-balance"
      >
        {dict.title}
      </h2>

      <dl className="mt-14 md:mt-24">
        {dict.items.map((item) => (
          <div
            key={item.title}
            className="grid gap-x-8 gap-y-3 border-t border-ink py-7 md:grid-cols-12 md:py-9"
          >
            <dt className="display text-[clamp(1.9rem,3.6vw,3.25rem)] md:col-span-5">
              {item.title}
            </dt>
            <dd className="max-w-[46ch] text-xl leading-snug md:col-span-6 md:col-start-7 md:text-2xl">
              {item.body}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-20 grid gap-x-8 gap-y-6 md:mt-28 md:grid-cols-12">
        <h3 className="text-xl font-[750] tracking-[-0.01em] md:col-span-5">
          {dict.processTitle}
        </h3>
        <ol className="md:col-span-6 md:col-start-7">
          {dict.process.map((step, i) => (
            <li
              key={step}
              className="grid grid-cols-[2ch_1fr] gap-x-4 border-t border-hair py-4 text-lg first:border-ink"
            >
              <span className="font-[750] tabular-nums">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
