import Link from "next/link";
import { INDUSTRIES, SERVICES, SPONSOR_SLUG } from "@/data/listings";
import {
  agenciesForIndustry,
  agenciesForService,
  formatBudget,
  getAgency,
  initials,
  logoClasses,
  STATS,
} from "@/lib/directory";
import { DirectoryExplorer } from "@/components/directory-explorer";
import { VerifiedBadge } from "@/components/badges";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Compare specialists",
    body: "Filter by the service you need, your industry, region, and budget. Every profile states minimum engagement and rates up front — no “contact us for pricing”.",
  },
  {
    step: "02",
    title: "Check the vetting",
    body: "Verified agencies have been screened by our team: real client references, a working portfolio, and a live delivery team — not a landing page and a reseller license.",
  },
  {
    step: "03",
    title: "Request an intro",
    body: "Send your brief through the profile page. It goes straight to the agency's delivery lead, and using the directory is free for buyers.",
  },
];

export default function HomePage() {
  const sponsor = SPONSOR_SLUG ? getAgency(SPONSOR_SLUG) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pb-4 pt-16 sm:pt-20">
        <p className="microlabel text-pine">The independent directory</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-[3.4rem]">
          Find an AI agency you can actually trust.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Vetted AI automation agencies and consultants, compared on the things
          that matter — specialty, industry track record, minimum budget, and
          verification status.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#directory"
            className="rounded-lg bg-pine px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
          >
            Browse the directory
          </a>
          <Link
            href="/get-listed"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-line-strong"
          >
            List your agency
          </Link>
        </div>
        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6">
          {[
            { value: STATS.agencies, label: "Agencies listed" },
            { value: STATS.verified, label: "Independently verified" },
            { value: STATS.countries, label: "Countries covered" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold">{s.value}</dd>
              <dd className="mt-1 text-xs text-ink-faint">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Sponsor slot — a paid Partner placement, always clearly labeled */}
      {sponsor && (
        <section className="mt-10">
          <Link
            href={`/agency/${sponsor.slug}`}
            className="group flex flex-col gap-4 rounded-xl border border-gold/30 bg-gold-soft/50 p-5 transition-colors hover:border-gold/60 sm:flex-row sm:items-center"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-display text-lg font-semibold ${logoClasses(
                sponsor.slug
              )}`}
              aria-hidden
            >
              {initials(sponsor.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-display text-lg font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                  {sponsor.name}
                </span>
                {sponsor.verified && <VerifiedBadge compact />}
              </span>
              <span className="mt-0.5 block text-sm text-ink-soft">
                {sponsor.tagline}
              </span>
            </span>
            <span className="microlabel shrink-0 text-gold">Sponsor</span>
          </Link>
        </section>
      )}

      {/* Directory */}
      <section id="directory" className="mt-16 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Browse agencies
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Paid placements are always labeled. Verification is never for sale.
            </p>
          </div>
        </div>
        <DirectoryExplorer />
      </section>

      {/* Services */}
      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Browse by service
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const count = agenciesForService(s.slug).length;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <h3 className="font-display text-base font-semibold leading-snug tracking-tight group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                  {s.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {s.blurb}
                </p>
                <p className="microlabel mt-4 text-ink-faint">
                  {count} {count === 1 ? "agency" : "agencies"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Industries */}
      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Browse by industry
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((i) => {
            const count = agenciesForIndustry(i.slug).length;
            return (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-line-strong"
              >
                {i.name}
                <span className="ml-2 text-xs text-ink-faint">{count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-20 rounded-2xl border border-line bg-cream/60 p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          How the directory works
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <p className="microlabel text-pine">{item.step}</p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Agency CTA */}
      <section className="mt-20 overflow-hidden rounded-2xl bg-pine-deep px-8 py-12 text-paper sm:px-12">
        <div className="max-w-2xl">
          <p className="microlabel text-paper/50">For agencies</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight">
            Your next client is comparing agencies right now.
          </h2>
          <p className="mt-4 leading-relaxed text-paper/70">
            A single engagement from the directory pays for years of a listing.
            Basic listings are free; Featured and Partner placements put you at
            the top of every relevant search. Example budgets on the index run
            from {formatBudget(5000)} to {formatBudget(80000)} per project.
          </p>
          <Link
            href="/get-listed"
            className="mt-7 inline-block rounded-lg bg-paper px-5 py-2.5 text-sm font-medium text-pine-deep transition-colors hover:bg-cream"
          >
            See listing options
          </Link>
        </div>
      </section>
    </div>
  );
}
