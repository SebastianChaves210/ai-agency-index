import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENCIES } from "@/data/listings";
import {
  formatBudget,
  getAgency,
  getIndustry,
  getRegion,
  getService,
  initials,
  logoClasses,
  similarAgencies,
} from "@/lib/directory";
import { SITE } from "@/lib/site";
import { AgencyCard } from "@/components/agency-card";
import { TierBadge, VerifiedBadge } from "@/components/badges";
import { LeadForm } from "@/components/lead-form";

export function generateStaticParams() {
  return AGENCIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) return {};
  return {
    title: `${agency.name} — AI Agency Profile`,
    description: `${agency.tagline} Based in ${agency.city}, ${agency.country}. Minimum engagement ${formatBudget(agency.minBudget)}.`,
  };
}

function FactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dotted border-face-dark py-2.5 last:border-b-0">
      <dt className="font-mono text-xs text-face-darker">{label}</dt>
      <dd className="text-right text-sm font-bold">{value}</dd>
    </div>
  );
}

export default async function AgencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) notFound();

  const similar = similarAgencies(agency);
  const primaryService = getService(agency.services[0]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: agency.name,
    description: agency.tagline,
    url: `${SITE.url}/agency/${agency.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: agency.city,
      addressCountry: agency.country,
    },
    foundingDate: String(agency.founded),
    knowsAbout: agency.services
      .map((s) => getService(s)?.name)
      .filter(Boolean),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="font-mono text-xs font-bold">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="weblink">
              Directory
            </Link>
          </li>
          <li aria-hidden>»</li>
          {primaryService && (
            <>
              <li>
                <Link
                  href={`/services/${primaryService.slug}`}
                  className="weblink"
                >
                  {primaryService.name}
                </Link>
              </li>
              <li aria-hidden>»</li>
            </>
          )}
          <li aria-current="page" className="text-black">
            {agency.name}
          </li>
        </ol>
      </nav>

      {/* Profile header */}
      <header className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className={`flex h-16 w-16 shrink-0 items-center justify-center border-2 border-black font-display text-2xl shadow-[3px_3px_0_var(--face-dark)] ${logoClasses(
            agency.slug
          )}`}
          aria-hidden
        >
          {initials(agency.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="wordart text-3xl">{agency.name}</h1>
            <TierBadge tier={agency.tier} />
            {agency.verified && <VerifiedBadge />}
          </div>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-face-darker">
            {agency.tagline}
          </p>
          <p className="mt-2 font-mono text-xs text-face-darker">
            {agency.city}, {agency.country}
            {agency.remoteFriendly && " · Works remotely worldwide"}
          </p>
        </div>
        <a
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn95 shrink-0 px-4 py-2 text-sm"
        >
          Visit website ↗
        </a>
      </header>

      {/* Body */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <h2 className="microlabel inline-block bg-navy px-2 py-1 text-white">
            About
          </h2>
          <div className="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-black sm:text-base">
            {agency.description.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <h2 className="microlabel mt-10 inline-block bg-navy px-2 py-1 text-white">
            Specialties
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.specialties.map((s) => (
              <span
                key={s}
                className="border border-black bg-face px-2.5 py-1 font-mono text-xs font-bold text-black"
              >
                {s}
              </span>
            ))}
          </div>

          <h2 className="microlabel mt-10 inline-block bg-navy px-2 py-1 text-white">
            Services
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.services.map((slug) => {
              const s = getService(slug);
              if (!s) return null;
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="border-2 border-black bg-sun px-3 py-1 text-xs font-bold shadow-[2px_2px_0_var(--face-dark)] hover:bg-hot hover:text-white"
                >
                  {s.name}
                </Link>
              );
            })}
          </div>

          <h2 className="microlabel mt-10 inline-block bg-navy px-2 py-1 text-white">
            Industries
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.industries.map((slug) => {
              const i = getIndustry(slug);
              if (!i) return null;
              return (
                <Link
                  key={slug}
                  href={`/industries/${slug}`}
                  className="border-2 border-black bg-face px-3 py-1 text-xs font-bold shadow-[2px_2px_0_var(--face-dark)] hover:bg-sun"
                >
                  {i.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar — a stack of Win95 dialog boxes */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="win-panel">
            <h2 className="titlebar px-2 py-1">📊 At a glance</h2>
            <dl className="px-4 py-2">
              <FactRow
                label="Minimum engagement"
                value={formatBudget(agency.minBudget)}
              />
              <FactRow label="Hourly rate" value={agency.hourlyRate} />
              <FactRow label="Team size" value={agency.teamSize} />
              <FactRow label="Founded" value={agency.founded} />
              <FactRow
                label="Region"
                value={getRegion(agency.region)?.name ?? agency.region}
              />
              <FactRow
                label="Remote work"
                value={agency.remoteFriendly ? "Yes" : "On-site focused"}
              />
            </dl>
          </div>
          <div className="win-panel">
            <h2 className="titlebar px-2 py-1">✉ Work with {agency.name}</h2>
            <div className="p-4">
              <p className="mb-4 text-sm text-face-darker">
                Tell us about the project and we&apos;ll make the introduction.
              </p>
              <LeadForm agencySlug={agency.slug} agencyName={agency.name} />
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <>
          <div className="hr-rainbow mt-16" aria-hidden />
          <section className="mt-12">
            <h2 className="font-display text-2xl text-navy [text-shadow:2px_2px_0_#fff]">
              Similar agencies
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((a) => (
                <AgencyCard key={a.slug} agency={a} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
