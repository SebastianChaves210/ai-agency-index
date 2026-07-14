import type { Tier } from "@/data/listings";

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 border border-black bg-grass px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white"
      title="Independently verified by AI Agency Index"
    >
      <span aria-hidden>✔</span>
      {compact ? <span className="sr-only">Verified</span> : "Verified"}
    </span>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "free") return null;
  const label = tier === "partner" ? "Partner" : "Featured";
  return (
    <span
      className={`inline-flex items-center gap-1 border border-black px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
        tier === "partner"
          ? "bg-hot-deep text-sun"
          : "bg-sun text-hot-deep"
      }`}
    >
      <span aria-hidden>★</span>
      {label}
    </span>
  );
}
