import type { ReactNode } from "react";

/**
 * Fills `{name}` placeholders in a sentence and sets the filled values in a
 * heavier weight. `valueClass` adds to that emphasis, e.g. a highlighter mark.
 */
export function rich(
  template: string,
  values: Record<string, string>,
  valueClass = "",
): ReactNode[] {
  return template.split(/(\{\w+\})/).map((part, i) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    if (key === undefined || !(key in values)) return part;
    return (
      <strong key={i} className={`font-[800] tabular-nums ${valueClass}`}>
        {values[key]}
      </strong>
    );
  });
}

/** Same substitution, as plain text. */
export const fill = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
