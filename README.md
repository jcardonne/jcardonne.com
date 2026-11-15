# jcardonne.com

Portfolio of Jean Cardonne. Next.js App Router and Tailwind CSS v4, set in the Archivo variable font, with stickers from [stick-it-up](https://github.com/Sam721166/stick-it-up).

## Develop

```bash
pnpm install
pnpm dev
```

`pnpm build`, `pnpm lint` and `pnpm typecheck` are the checks to run before pushing.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DISCORD_WEBHOOK_URL` | for the contact form | Discord webhook that receives each message. Without it `/api/contact` answers 503. |
| `TURNSTILE_SECRET_KEY` | no | Secret of an invisible [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) widget. When set, the contact route rejects messages without a valid token. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | with the secret | Public site key of the same widget, read at build time. |
| `GITHUB_TOKEN` | no | Raises the GitHub API rate limit for the live stats. |

## Where things live

- `src/i18n/dictionaries/` holds all copy, in English and French.
- `src/components/KineticName.tsx` drives the hero wordmark through the font's width and weight axes; the rest of the motion is CSS in `src/app/globals.css`.
- `src/lib/github.ts` reads the live stats, cached for an hour, with a snapshot fallback.
- `public/work/` holds project screenshots.
