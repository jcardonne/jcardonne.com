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
| `RESEND_API_KEY` | for the contact form | API key from [Resend](https://resend.com). Without it `/api/contact` answers 503. |
| `CONTACT_TO` | for the contact form | Address that receives the messages. |
| `CONTACT_FROM` | no | Sender on a domain verified in Resend. Defaults to Resend's test sender, which only delivers to the account owner. |
| `GITHUB_TOKEN` | no | Raises the GitHub API rate limit for the live stats. |

## Where things live

- `src/i18n/dictionaries/` holds all copy, in English and French.
- `src/components/KineticName.tsx` drives the hero wordmark through the font's width and weight axes; the rest of the motion is CSS in `src/app/globals.css`.
- `src/lib/github.ts` reads the live stats, cached for an hour, with a snapshot fallback.
- `public/work/` holds project screenshots.
