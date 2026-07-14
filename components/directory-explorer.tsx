"use client";

import { useMemo, useState } from "react";
import {
  AGENCIES,
  INDUSTRIES,
  REGIONS,
  SERVICES,
  type IndustrySlug,
  type RegionSlug,
  type ServiceSlug,
} from "@/data/listings";
import { getIndustry, getService, sortAgencies } from "@/lib/directory";
import { AgencyCard } from "@/components/agency-card";

const BUDGET_OPTIONS = [
  { value: "", label: "Any budget" },
  { value: "10000", label: "Up to $10k" },
  { value: "25000", label: "Up to $25k" },
  { value: "50000", label: "Up to $50k" },
  { value: "100000", label: "Up to $100k" },
] as const;

function Select({
  value,
  onChange,
  children,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-line bg-surface pl-3 pr-8 text-sm text-ink transition-colors hover:border-line-strong"
      >
        {children}
      </select>
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-faint"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M2.5 4.5L6 8l3.5-3.5" />
      </svg>
    </div>
  );
}

export function DirectoryExplorer() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");
  const [budget, setBudget] = useState("");

  const hasFilters =
    query.trim() !== "" || service !== "" || industry !== "" || region !== "" || budget !== "";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = AGENCIES.filter((a) => {
      if (service && !a.services.includes(service as ServiceSlug)) return false;
      if (industry && !a.industries.includes(industry as IndustrySlug)) return false;
      if (region && a.region !== (region as RegionSlug)) return false;
      if (budget && a.minBudget > Number(budget)) return false;
      if (q) {
        const haystack = [
          a.name,
          a.tagline,
          a.city,
          a.country,
          ...a.specialties,
          ...a.services.map((s) => getService(s)?.name ?? ""),
          ...a.industries.map((i) => getIndustry(i)?.name ?? ""),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    return sortAgencies(filtered);
  }, [query, service, industry, region, budget]);

  function clearAll() {
    setQuery("");
    setService("");
    setIndustry("");
    setRegion("");
    setBudget("");
  }

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_repeat(4,minmax(0,11rem))]">
        <div className="relative">
          <svg
            viewBox="0 0 16 16"
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agencies, specialties, locations…"
            className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-line-strong"
          />
        </div>
        <Select label="Filter by service" value={service} onChange={setService}>
          <option value="">All services</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </Select>
        <Select label="Filter by industry" value={industry} onChange={setIndustry}>
          <option value="">All industries</option>
          {INDUSTRIES.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </Select>
        <Select label="Filter by region" value={region} onChange={setRegion}>
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </Select>
        <Select label="Filter by minimum budget" value={budget} onChange={setBudget}>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-6 flex items-baseline justify-between">
        <p className="text-sm text-ink-soft">
          {results.length} {results.length === 1 ? "agency" : "agencies"}
          {hasFilters ? " match your filters" : " listed"}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-sm font-medium text-pine underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <AgencyCard key={a.slug} agency={a} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold">No matches</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
            No agencies fit that combination yet. Try widening the budget or
            clearing a filter.
          </p>
          <button
            onClick={clearAll}
            className="mt-5 rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-line-strong"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
