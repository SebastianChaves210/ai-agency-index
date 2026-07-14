import type { Metadata } from "next";
import { PAYMENT_LINKS, SITE } from "@/lib/site";
import { STATS } from "@/lib/directory";
import { ApplyForm } from "@/components/apply-form";

export const metadata: Metadata = {
  title: "Get Listed — Pricing for Agencies",
  description:
    "List your AI agency where buyers are already comparing. Free basic listings; Featured and Partner placements from $99/month.",
};

type TierCard = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
};

const TIERS: TierCard[] = [
  {
    name: "Basic",
    price: "$0",
    cadence: "free forever",
    blurb: "A complete profile in the directory, discoverable in every relevant search.",
    features: [
      "Full agency profile page",
      "Listed in search, service & industry pages",
      "Intro requests delivered to your inbox",
      "Eligible for independent verification",
    ],
    cta: "Apply free",
    href: "#apply",
    highlight: false,
  },
  {
    name: "Featured",
    price: "$99",
    cadence: "per month",
    blurb: "Priority placement above all basic listings in every search you match.",
    features: [
      "Everything in Basic",
      "Sorted above basic listings site-wide",
      "Highlighted card with Featured badge",
      "Fast-tracked verification review",
      "Cancel anytime — listing reverts to Basic",
    ],
    cta: "Start Featured",
    href: PAYMENT_LINKS.featured ?? "#apply",
    highlight: true,
  },
  {
    name: "Partner",
    price: "$249",
    cadence: "per month",
    blurb: "Top-of-directory placement plus the home-page sponsor slot rotation.",
    features: [
      "Everything in Featured",
      "Top placement in every matching search",
      "Home-page sponsor slot rotation",
      "Priority lead routing",
      "Quarterly performance report",
    ],
    cta: "Become a Partner",
    href: PAYMENT_LINKS.partner ?? "#apply",
    highlight: false,
  },
];

const FAQS = [
  {
    q: "How does verification work?",
    a: "We check three things by hand: verifiable client references, a portfolio of shipped work, and a real delivery team. Verification is available on every tier, including Basic, and it cannot be bought — paying affects placement, never the badge.",
  },
  {
    q: "What do leads cost?",
    a: "Nothing per lead. Intro requests submitted through your profile are included with every listing tier and are forwarded to you directly.",
  },
  {
    q: "Can I upgrade or cancel later?",
    a: "Yes. Featured and Partner are month-to-month. If you cancel, your listing simply reverts to Basic — you never disappear from the directory.",
  },
  {
    q: "How long does the application review take?",
    a: "We review every application by hand and reply within three business days with a decision and, if accepted, your verification checklist.",
  },
];

export default function GetListedPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16">
      <header className="max-w-3xl">
        <p className="microlabel text-pine">For agencies</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Be where buyers compare AI agencies.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          {SITE.name} lists {STATS.agencies} agencies across{" "}
          {STATS.countries} countries. Buyers arrive with a project and a
          budget; profiles state minimum engagements up front, so the intros
          you receive are qualified before they reach you.
        </p>
      </header>

      {/* Pricing */}
      <section id="pricing" className="mt-14 scroll-mt-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-7 ${
                tier.highlight
                  ? "border-pine bg-pine-soft/60 shadow-[0_1px_0_var(--pine)]"
                  : "border-line bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  {tier.name}
                </h2>
                {tier.highlight && (
                  <span className="microlabel rounded-full bg-pine px-2.5 py-1 text-paper">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="font-display text-4xl font-semibold">
                  {tier.price}
                </span>
                <span className="ml-2 text-sm text-ink-faint">{tier.cadence}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {tier.blurb}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-pine"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                    <span className="text-ink-soft">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                className={`mt-8 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                  tier.highlight
                    ? "bg-pine text-paper hover:bg-pine-deep"
                    : "border border-line bg-paper hover:border-line-strong"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-faint">
          Verification is independent of payment on every tier — a paid
          placement is labeled, never disguised.
        </p>
      </section>

      {/* Apply */}
      <section id="apply" className="mt-20 scroll-mt-24 rounded-2xl border border-line bg-surface p-8 sm:p-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Apply for a listing
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Every listing — free or paid — starts with an application. We
            review each one by hand to keep the index worth searching.
          </p>
        </div>
        <div className="mt-8 max-w-2xl">
          <ApplyForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Common questions
        </h2>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-medium">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
