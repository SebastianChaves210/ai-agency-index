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
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0">
      <dt className="text-sm text-ink-faint">{label}</dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
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
      <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              Directory
            </Link>
          </li>
          <li aria-hidden>/</li>
          {primaryService && (
            <>
              <li>
                <Link
                  href={`/services/${primaryService.slug}`}
                  className="hover:text-ink"
                >
                  {primaryService.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
            </>
          )}
          <li aria-current="page" className="text-ink">
            {agency.name}
          </li>
        </ol>
      </nav>

      {/* Profile header */}
      <header className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl font-display text-2xl font-semibold ${logoClasses(
            agency.slug
          )}`}
          aria-hidden
        >
          {initials(agency.name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {agency.name}
            </h1>
            <TierBadge tier={agency.tier} />
            {agency.verified && <VerifiedBadge />}
          </div>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {agency.tagline}
          </p>
          <p className="mt-2 text-sm text-ink-faint">
            {agency.city}, {agency.country}
            {agency.remoteFriendly && " · Works remotely worldwide"}
          </p>
        </div>
        <a
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="shrink-0 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-line-strong"
        >
          Visit website ↗
        </a>
      </header>

      {/* Body */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          <h2 className="microlabel text-ink-faint">About</h2>
          <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-ink-soft">
            {agency.description.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <h2 className="microlabel mt-10 text-ink-faint">Specialties</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>

          <h2 className="microlabel mt-10 text-ink-faint">Services</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.services.map((slug) => {
              const s = getService(slug);
              if (!s) return null;
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="rounded-full border border-pine/25 bg-pine-soft px-3 py-1 text-sm text-pine-deep transition-colors hover:border-pine/50"
                >
                  {s.name}
                </Link>
              );
            })}
          </div>

          <h2 className="microlabel mt-10 text-ink-faint">Industries</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {agency.industries.map((slug) => {
              const i = getIndustry(slug);
              if (!i) return null;
              return (
                <Link
                  key={slug}
                  href={`/industries/${slug}`}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft transition-colors hover:border-line-strong"
                >
                  {i.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="microlabel text-ink-faint">At a glance</h2>
            <dl className="mt-3">
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
          <div className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Work with {agency.name}
            </h2>
            <p className="mb-4 mt-1 text-sm text-ink-soft">
              Tell us about the project and we&apos;ll make the introduction.
            </p>
            <LeadForm agencySlug={agency.slug} agencyName={agency.name} />
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Similar agencies
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((a) => (
              <AgencyCard key={a.slug} agency={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
