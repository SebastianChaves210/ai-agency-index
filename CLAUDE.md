@AGENTS.md

# AI Agency Index

A production directory website listing vetted AI automation agencies & consultants.
Buyers filter by service / industry / region / budget and request intros; agencies
pay for Featured/Partner placement. Monetization surfaces: tier badges, priority
sorting, home-page sponsor slot, pricing page at `/get-listed`, lead capture at
`/api/leads`.

**Stack:** Next.js (App Router) + TypeScript + Tailwind v4. No database — all
listings are static data compiled at build time. Deployed on Vercel.

## Commands

```bash
npm run dev     # local dev server
npm run build   # production build (also the data validator — type errors fail it)
npm run lint    # eslint
```

## Key paths

| Path | What it is |
|---|---|
| `data/listings.ts` | **The single source of truth for all listings** (see below) |
| `lib/directory.ts` | Derived helpers: sorting, filtering, stats, formatting |
| `lib/site.ts` | Site name/URL config + Stripe payment-link env plumbing |
| `app/agency/[slug]/` | Agency profile pages (SSG from data file) |
| `app/services/`, `app/industries/` | Programmatic SEO category pages |
| `app/get-listed/` | Pricing tiers + listing application form |
| `app/api/leads/route.ts` | Lead capture endpoint (intro requests + listing applications) |

## Swapping in real data

Everything on the site — profiles, categories, filters, counts, sitemap,
structured data — derives from **one file: `data/listings.ts`**. If the user
says something like "plug in the real data", do this:

1. **Replace the `AGENCIES` array** in `data/listings.ts` with the real
   entries. Each entry must conform to the `Agency` interface defined in that
   same file (every field is documented inline). Field format:

   | Field | Type | Rules |
   |---|---|---|
   | `slug` | string | unique, lowercase, hyphenated; becomes `/agency/<slug>` |
   | `name` | string | display name |
   | `tagline` | string | one sentence, ≤ ~110 chars; shown on cards |
   | `description` | string | 2 short paragraphs separated by `"\n\n"` |
   | `services` | string[] | 1–3 slugs from the `SERVICES` taxonomy; first = primary |
   | `industries` | string[] | 1–3 slugs from the `INDUSTRIES` taxonomy |
   | `specialties` | string[] | 3–5 short freeform capability chips |
   | `city`, `country` | string | display location |
   | `region` | string | one slug from `REGIONS` |
   | `remoteFriendly` | boolean | |
   | `minBudget` | number | minimum project size in USD (drives budget filter) |
   | `hourlyRate` | string | display string, e.g. `"$150–220/hr"` |
   | `teamSize` | string | display string, e.g. `"11–25"` |
   | `founded` | number | year |
   | `website` | string | full `https://` URL (mock entries use example.com) |
   | `tier` | `"free" \| "featured" \| "partner"` | drives placement + card styling |
   | `verified` | boolean | shows the Verified badge |

2. **Set `IS_MOCK_DATA = false`** at the top of `data/listings.ts`. This
   removes the site-wide "sample data" banner and the footer disclaimer
   automatically.

3. **Set `SPONSOR_SLUG`** to the slug of a real partner-tier agency, or `null`
   to hide the home-page sponsor slot.

4. **Only if the taxonomy needs to change:** edit `SERVICES` / `INDUSTRIES` /
   `REGIONS` in the same file. Category pages, filters, footer links, and the
   sitemap all regenerate from them — no other file needs touching. Keep slugs
   stable once live (they are URLs).

5. **Validate:** run `npm run build`. TypeScript enforces the schema (bad
   service slugs, missing fields, wrong types all fail the build). Then spot
   check `/`, one `/agency/<slug>`, and one category page.

If the real data arrives as JSON/CSV, map columns to the fields above and
generate the array — do not create a parallel data source; `data/listings.ts`
stays the only origin. If a field is missing from the source data, make a
sensible display default (e.g. `remoteFriendly: true`, `hourlyRate: "On request"`)
rather than changing the schema.

## Configuration (env vars — all optional)

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL once a custom domain exists (falls back to Vercel's production URL) |
| `NEXT_PUBLIC_STRIPE_LINK_FEATURED` | Stripe payment link for the $99/mo Featured tier; pricing button links to checkout when set |
| `NEXT_PUBLIC_STRIPE_LINK_PARTNER` | Same for the $249/mo Partner tier |
| `LEADS_WEBHOOK_URL` | If set, every lead is POSTed there as JSON (Zapier/Make/Slack/custom). Leads are always also logged to Vercel runtime logs with the `[LEAD]` prefix |

## Conventions

- Deliberate early-web / Y2K aesthetic — a 2026 site wearing a 2000 skin:
  starfield tile background, Win95-style chrome (`.win-panel`, `.win-well`,
  `.btn95`, `.field95`, `.titlebar` in `app/globals.css`), web-safe font
  stacks only (Verdana / Impact / Comic Sans MS / Courier New — no webfonts),
  classic blue underlined links (`.weblink` / `.weblink-dark`), `microlabel`
  utility for uppercase mono meta-labels. Marquee, blink, rainbow rules, and
  the visitor counter are all faked with modern CSS/SVG (`.marquee`, `.blink`,
  `.hr-rainbow`, `.led`) and respect `prefers-reduced-motion` — never use
  deprecated tags, table layouts, frames, or autoplay audio.
- Paid placement is always visibly labeled (Featured/Partner/Sponsor badges);
  verification is presented as independent of payment — keep it that way.
- All listing-derived pages are static (SSG); only `/api/leads` is dynamic.
