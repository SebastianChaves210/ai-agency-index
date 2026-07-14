/**
 * Global site configuration.
 *
 * The canonical URL is resolved in this order:
 *  1. NEXT_PUBLIC_SITE_URL (set this once a custom domain exists)
 *  2. VERCEL_PROJECT_PRODUCTION_URL (provided automatically by Vercel)
 *  3. localhost fallback for development
 */
const resolvedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE = {
  name: "AI Agency Index",
  tagline: "Find a vetted AI agency you can actually trust",
  description:
    "The independent directory of vetted AI automation agencies and consultants. Compare specialists by service, industry, region, and budget — then request an intro directly.",
  url: resolvedUrl,
  contactEmail: "hello@aiagencyindex.com",
} as const;

/**
 * Monetization links. When Stripe payment links are configured, the pricing
 * buttons on /get-listed link straight to checkout; otherwise they fall back
 * to the application form on the same page.
 */
export const PAYMENT_LINKS = {
  featured: process.env.NEXT_PUBLIC_STRIPE_LINK_FEATURED ?? null,
  partner: process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER ?? null,
} as const;
