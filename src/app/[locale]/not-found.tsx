import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col justify-center px-5 sm:px-8 lg:px-10">
      <h1 className="display text-[clamp(4rem,17vw,17rem)]">404</h1>
      <p className="mt-8 border-t border-ink pt-6 text-2xl font-medium tracking-[-0.02em]">
        This page does not exist. Cette page n&apos;existe pas.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href="/en" className="btn">
          Back to the homepage
        </Link>
        <Link href="/fr" lang="fr" className="link font-[650]">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
