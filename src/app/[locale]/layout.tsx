import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// One variable family carries the whole site: the width axis is the design's main instrument.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function RootLayout({
  children,
  params,
}: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
