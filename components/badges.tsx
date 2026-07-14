import type { Tier } from "@/data/listings";

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-pine"
      title="Independently verified by AI Agency Index"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className="h-3.5 w-3.5 shrink-0"
        fill="currentColor"
      >
        <path d="M8 0l1.9 1.4 2.3-.3 1 2.1 2.1 1-.3 2.3L16 8l-1.4 1.9.3 2.3-2.1 1-1 2.1-2.3-.3L8 16l-1.9-1.4-2.3.3-1-2.1-2.1-1 .3-2.3L0 8l1.4-1.9-.3-2.3 2.1-1 1-2.1 2.3.3L8 0z" />
        <path
          d="M4.8 8.2l2.1 2.1 4.3-4.6"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && <span className="microlabel">Verified</span>}
    </span>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "free") return null;
  const label = tier === "partner" ? "Partner" : "Featured";
  return (
    <span className="microlabel inline-flex items-center rounded-full border border-gold/30 bg-gold-soft px-2 py-0.5 text-gold">
      {label}
    </span>
  );
}
