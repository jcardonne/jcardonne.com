import { AppWindow, Globe, Wrench } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import Sticker from "./Sticker";

const ICONS = [AppWindow, Globe, Wrench];

export default function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative border-t border-ink px-5 pb-24 pt-8 sm:px-8 md:pb-32 lg:px-10"
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

      <ul className="mt-14 grid gap-x-8 gap-y-10 border-t border-ink pt-8 md:mt-20 md:grid-cols-3">
        {dict.items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={item.title}>
              <Icon aria-hidden="true" strokeWidth={2} className="size-7" />
              <h3 className="display mt-4 text-[clamp(1.9rem,3vw,2.75rem)]">{item.title}</h3>
              <p className="mt-3 max-w-[36ch] text-lg leading-snug">{item.body}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-16 md:mt-20">
        <h3 className="font-[750]">{dict.processTitle}</h3>
        <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg">
          {dict.process.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span>
                <span className="font-[750] tabular-nums">{i + 1}.</span> {step}
              </span>
              {i < dict.process.length - 1 && (
                <span aria-hidden="true" className="dim">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
