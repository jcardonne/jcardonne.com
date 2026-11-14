import { ImageResponse } from "next/og";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Jean Cardonne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#0a0a0a",
          backgroundColor: "#ffd03b",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 190,
            fontWeight: 700,
            letterSpacing: -6,
            lineHeight: 0.86,
          }}
        >
          <div style={{ display: "flex" }}>JEAN</div>
          <div style={{ display: "flex" }}>CARDONNE</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "3px solid #0a0a0a",
            paddingTop: 28,
            fontSize: 40,
          }}
        >
          <div style={{ display: "flex" }}>{dict.hero.statement}</div>
          <div style={{ display: "flex", width: 34, height: 34, backgroundColor: "#4d3dfd" }} />
        </div>
      </div>
    ),
    size,
  );
}
