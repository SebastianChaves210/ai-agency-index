import Link from "next/link";
import type { Agency } from "@/data/listings";
import { formatBudget, getService, initials, logoClasses } from "@/lib/directory";
import { TierBadge, VerifiedBadge } from "@/components/badges";

export function AgencyCard({ agency }: { agency: Agency }) {
  const paid = agency.tier !== "free";
  return (
    <Link
      href={`/agency/${agency.slug}`}
      className={`group flex h-full flex-col rounded-xl border p-5 transition-colors ${
        paid
          ? "border-gold/25 bg-gold-soft/40 hover:border-gold/50"
          : "border-line bg-surface hover:border-line-strong"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-base font-semibold ${logoClasses(
            agency.slug
          )}`}
          aria-hidden
        >
          {initials(agency.name)}
        </span>
        <span className="flex items-center gap-2 pt-0.5">
          <TierBadge tier={agency.tier} />
          {agency.verified && <VerifiedBadge compact />}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
        {agency.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {agency.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {agency.services.slice(0, 2).map((slug) => (
          <span
            key={slug}
            className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs text-ink-soft"
          >
            {getService(slug)?.name}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs text-ink-faint">
        <span className="whitespace-nowrap">
          {agency.city}, {agency.country}
        </span>
        <span className="whitespace-nowrap">
          <span aria-hidden>· </span>From {formatBudget(agency.minBudget)}
        </span>
        <span className="whitespace-nowrap">
          <span aria-hidden>· </span>
          {agency.teamSize} people
        </span>
      </div>
    </Link>
  );
}
