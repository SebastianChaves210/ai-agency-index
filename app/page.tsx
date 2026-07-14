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
      {/* Hero — center-aligned, as every homepage was in 2000 */}
      <section className="pb-4 pt-14 text-center sm:pt-16">
        <p className="microlabel text-hot-deep">
          ★ · ° The independent directory ° · ★
        </p>
        <h1 className="wordart mx-auto mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
          Find an AI agency you can actually trust.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-face-darker">
          Vetted AI automation agencies and consultants, compared on the things
          that matter — specialty, industry track record, minimum budget, and
          verification status.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#directory" className="btn95 btn95-hot px-5 py-2.5 text-sm">
            Browse the directory
          </a>
          <Link href="/get-listed" className="btn95 px-5 py-2.5 text-sm">
            List your agency
          </Link>
        </div>
        {/* Stats, hit-counter style */}
        <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6">
          {[
            { value: STATS.agencies, label: "Agencies listed" },
            { value: STATS.verified, label: "Independently verified" },
            { value: STATS.countries, label: "Countries covered" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="led inline-block text-2xl">
                {String(s.value).padStart(3, "0")}
              </dd>
              <dd className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-face-darker">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Sponsor slot — a paid Partner placement, always clearly labeled */}
      {sponsor && (
        <section className="mt-10">
          <Link
            href={`/agency/${sponsor.slug}`}
            className="group flex flex-col gap-4 border-2 border-hot-deep bg-butter p-5 shadow-[4px_4px_0_var(--face-dark)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:flex-row sm:items-center"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black font-display text-lg ${logoClasses(
                sponsor.slug
              )}`}
              aria-hidden
            >
              {initials(sponsor.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold text-link underline group-hover:text-hot">
                  {sponsor.name}
                </span>
                {sponsor.verified && <VerifiedBadge compact />}
              </span>
              <span className="mt-0.5 block text-sm text-face-darker">
                {sponsor.tagline}
              </span>
            </span>
            <span className="microlabel shrink-0 text-hot-deep">
              <span className="blink" aria-hidden>
                ★{" "}
              </span>
              Sponsor
              <span className="blink" aria-hidden>
                {" "}
                ★
              </span>
            </span>
          </Link>
        </section>
      )}

      {/* Directory */}
      <section id="directory" className="mt-16 scroll-mt-32">
        <div className="mb-6">
          <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
            Browse agencies
          </h2>
          <p className="mt-1 text-sm text-face-darker">
            Paid placements are always labeled. Verification is never for sale.
          </p>
        </div>
        <DirectoryExplorer />
      </section>

      <div className="hr-rainbow mt-16" aria-hidden />

      {/* Services */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
          Browse by service
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const count = agenciesForService(s.slug).length;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group border-2 border-black bg-white p-5 shadow-[4px_4px_0_var(--face-dark)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--face-dark)]"
              >
                <h3 className="text-[15px] font-bold leading-snug text-link underline group-hover:text-hot">
                  {s.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-face-darker">
                  {s.blurb}
                </p>
                <p className="microlabel mt-4 text-black">
                  ► {count} {count === 1 ? "agency" : "agencies"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Industries */}
      <section className="mt-16">
        <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
          Browse by industry
        </h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((i) => {
            const count = agenciesForIndustry(i.slug).length;
            return (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="border-2 border-black bg-face px-3.5 py-1.5 text-xs font-bold shadow-[2px_2px_0_var(--face-dark)] hover:bg-sun"
              >
                {i.name}
                <span className="ml-2 font-mono text-[10px]">[{count}]</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="hr-rainbow mt-16" aria-hidden />

      {/* How it works */}
      <section className="win-well mt-12 p-8 sm:p-10">
        <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_var(--face)]">
          How the directory works
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <p className="font-comic text-xl font-bold text-hot-deep">
                {item.step}.
              </p>
              <h3 className="mt-2 text-base font-bold text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-face-darker">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Agency CTA */}
      <section className="bg-starfield mt-16 border-2 border-black px-8 py-12 shadow-[4px_4px_0_var(--face-dark)] sm:px-12">
        <div className="max-w-2xl">
          <p className="microlabel text-lime95">For agencies</p>
          <h2 className="wordart-inverse mt-3 text-3xl leading-tight">
            Your next client is comparing agencies right now.
          </h2>
          <p className="mt-4 leading-relaxed text-[#ccccee]">
            A single engagement from the directory pays for years of a listing.
            Basic listings are free; Featured and Partner placements put you at
            the top of every relevant search. Example budgets on the index run
            from {formatBudget(5000)} to {formatBudget(80000)} per project.
          </p>
          <Link
            href="/get-listed"
            className="btn95 btn95-sun mt-7 px-5 py-2.5 text-sm"
          >
            See listing options
          </Link>
        </div>
      </section>
    </div>
  );
}
