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
    <div className="mx-auto max-w-6xl px-6 pt-14">
      <header className="max-w-3xl">
        <p className="microlabel text-hot-deep">★ For agencies ★</p>
        <h1 className="wordart mt-4 text-4xl leading-tight sm:text-5xl">
          Be where buyers compare AI agencies.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-face-darker">
          {SITE.name} lists {STATS.agencies} agencies across{" "}
          {STATS.countries} countries. Buyers arrive with a project and a
          budget; profiles state minimum engagements up front, so the intros
          you receive are qualified before they reach you.
        </p>
      </header>

      {/* Pricing */}
      <section id="pricing" className="mt-14 scroll-mt-32">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col border-2 p-7 shadow-[5px_5px_0_var(--face-dark)] ${
                tier.highlight
                  ? "border-hot-deep bg-butter"
                  : "border-black bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl tracking-wide text-navy">
                  {tier.name}
                </h2>
                {tier.highlight && (
                  <span className="border border-black bg-hot-deep px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-sun">
                    <span className="blink">★</span> Most popular
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="font-display text-4xl text-black">
                  {tier.price}
                </span>
                <span className="ml-2 font-mono text-xs text-face-darker">
                  {tier.cadence}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-face-darker">
                {tier.blurb}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span aria-hidden className="font-bold text-grass">
                      ✔
                    </span>
                    <span className="text-black">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                className={`btn95 mt-8 px-4 py-2.5 text-sm ${
                  tier.highlight ? "btn95-hot" : ""
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-face-darker">
          Verification is independent of payment on every tier — a paid
          placement is labeled, never disguised.
        </p>
      </section>

      <div className="hr-rainbow mt-16" aria-hidden />

      {/* Apply */}
      <section id="apply" className="win-panel mt-12 scroll-mt-32">
        <div className="titlebar px-2 py-1">
          C:\AI-AGENCY-INDEX\APPLY\listing-application.exe
        </div>
        <div className="p-6 sm:p-9">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
              Apply for a listing
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-face-darker sm:text-base">
              Every listing — free or paid — starts with an application. We
              review each one by hand to keep the index worth searching.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
          Common questions
        </h2>
        <dl className="mt-6 divide-y divide-dotted divide-face-dark border-y-2 border-black">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-bold">
                <span aria-hidden className="text-hot-deep">
                  Q:{" "}
                </span>
                {faq.q}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-face-darker">
                <span aria-hidden className="font-bold text-grass">
                  A:{" "}
                </span>
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
