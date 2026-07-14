import Link from "next/link";
import type { Agency } from "@/data/listings";
import { formatBudget, getService, initials, logoClasses } from "@/lib/directory";
import { TierBadge, VerifiedBadge } from "@/components/badges";

export function AgencyCard({ agency }: { agency: Agency }) {
  const paid = agency.tier !== "free";
  return (
    <Link
      href={`/agency/${agency.slug}`}
      className={`group flex h-full flex-col border-2 p-4 shadow-[4px_4px_0_var(--face-dark)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--face-dark)] ${
        paid ? "border-hot-deep bg-butter" : "border-black bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center border-2 border-black font-display text-base ${logoClasses(
            agency.slug
          )}`}
          aria-hidden
        >
          {initials(agency.name)}
        </span>
        <span className="flex items-center gap-1.5 pt-0.5">
          <TierBadge tier={agency.tier} />
          {agency.verified && <VerifiedBadge compact />}
        </span>
      </div>

      <h3 className="mt-4 text-[15px] font-bold leading-snug text-link underline group-hover:text-hot">
        {agency.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-face-darker">
        {agency.tagline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {agency.services.slice(0, 2).map((slug) => (
          <span
            key={slug}
            className="border border-black bg-face px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-black"
          >
            {getService(slug)?.name}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 font-mono text-[11px] text-face-darker">
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
