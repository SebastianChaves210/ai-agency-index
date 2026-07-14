# AI Agency Index

The independent directory of vetted AI automation agencies & consultants.
Buyers compare specialists by service, industry, region, and budget, then
request intros directly. Agencies list free or pay for Featured/Partner
placement.

**Live:** deployed on Vercel · **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4

## Features

- Searchable, filterable directory (service / industry / region / budget)
- 24 sample agency profiles with full SSG pages and JSON-LD structured data
- Programmatic SEO category pages for every service and industry
- Monetization built in: Featured ($99/mo) and Partner ($249/mo) tiers,
  labeled sponsor slot, pricing page, Stripe-payment-link ready
- Lead capture (`/api/leads`) for intro requests and listing applications,
  with optional webhook forwarding
- Sitemap, robots, OpenGraph image, custom 404

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build + data validation
```

## Data

All listings live in **`data/listings.ts`** — a single typed file that drives
every page, filter, count, and sitemap entry. Current entries are clearly
labeled mock data. See **CLAUDE.md → "Swapping in real data"** for the exact
schema and swap procedure.

## Environment variables (all optional)

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (defaults to the Vercel production URL) |
| `NEXT_PUBLIC_STRIPE_LINK_FEATURED` | Stripe payment link for the Featured tier |
| `NEXT_PUBLIC_STRIPE_LINK_PARTNER` | Stripe payment link for the Partner tier |
| `LEADS_WEBHOOK_URL` | Forward every lead as JSON to this webhook |

## Deploy

Any Vercel deployment works out of the box — no database or env vars required
for the base site.

```bash
vercel --prod
```
