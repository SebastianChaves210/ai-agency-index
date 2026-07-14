import {
  AGENCIES,
  INDUSTRIES,
  REGIONS,
  SERVICES,
  type Agency,
  type IndustrySlug,
  type RegionSlug,
  type ServiceSlug,
} from "@/data/listings";

/** Paid tiers sort above free listings; verified sorts above unverified within a tier. */
const TIER_RANK: Record<Agency["tier"], number> = {
  partner: 0,
  featured: 1,
  free: 2,
};

export function sortAgencies(list: Agency[]): Agency[] {
  return [...list].sort((a, b) => {
    if (TIER_RANK[a.tier] !== TIER_RANK[b.tier]) {
      return TIER_RANK[a.tier] - TIER_RANK[b.tier];
    }
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function getAgency(slug: string): Agency | undefined {
  return AGENCIES.find((a) => a.slug === slug);
}

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getRegion(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

export function agenciesForService(slug: ServiceSlug): Agency[] {
  return sortAgencies(AGENCIES.filter((a) => a.services.includes(slug)));
}

export function agenciesForIndustry(slug: IndustrySlug): Agency[] {
  return sortAgencies(AGENCIES.filter((a) => a.industries.includes(slug)));
}

export function agenciesForRegion(slug: RegionSlug): Agency[] {
  return sortAgencies(AGENCIES.filter((a) => a.region === slug));
}

/** Same primary service first, then any shared service, excluding the agency itself. */
export function similarAgencies(agency: Agency, count = 3): Agency[] {
  const pool = AGENCIES.filter(
    (a) =>
      a.slug !== agency.slug &&
      a.services.some((s) => agency.services.includes(s))
  );
  const primary = agency.services[0];
  return sortAgencies(pool)
    .sort((a, b) => {
      const aPrimary = a.services[0] === primary ? 0 : 1;
      const bPrimary = b.services[0] === primary ? 0 : 1;
      return aPrimary - bPrimary;
    })
    .slice(0, count);
}

export function formatBudget(minBudget: number): string {
  if (minBudget >= 1000) {
    const k = minBudget / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k+`;
  }
  return `$${minBudget}+`;
}

/** Two-letter monogram used for the agency logo block ("Beacon & Loom AI" → "BL"). */
export function initials(name: string): string {
  const words = name
    .split(/\s+/)
    .filter((w) => /^[a-z0-9]/i.test(w));
  const first = words[0]?.[0] ?? "?";
  const second = words[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

/** Deterministic saturated web-safe background for logo monograms, keyed off the slug. */
const LOGO_PALETTE = [
  "bg-[#000080] text-[#ffff00]",
  "bg-[#cc0000] text-[#ffffff]",
  "bg-[#008000] text-[#ffff99]",
  "bg-[#660099] text-[#ffccff]",
  "bg-[#008080] text-[#ccffff]",
  "bg-[#804000] text-[#ffcc66]",
];

export function logoClasses(slug: string): string {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return LOGO_PALETTE[hash % LOGO_PALETTE.length];
}

export const STATS = {
  agencies: AGENCIES.length,
  verified: AGENCIES.filter((a) => a.verified).length,
  services: SERVICES.length,
  countries: new Set(AGENCIES.map((a) => a.country)).size,
};
