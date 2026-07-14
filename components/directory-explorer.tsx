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
        className="field95 h-10 w-full appearance-none pl-3 pr-8 text-sm"
      >
        {children}
      </select>
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-black"
        fill="currentColor"
      >
        <path d="M1.5 3.5h9L6 9z" />
      </svg>
    </div>
  );
}

/* Decorative Win95 window buttons — pure chrome, hidden from AT */
function WindowButtons() {
  return (
    <span className="hidden gap-1 sm:flex" aria-hidden>
      {["–", "□", "×"].map((glyph) => (
        <span
          key={glyph}
          className="btn95 h-4 w-4 text-[9px] leading-none shadow-none"
        >
          {glyph}
        </span>
      ))}
    </span>
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
      {/* Filter controls dressed as a Win95 dialog */}
      <div className="win-panel">
        <div className="titlebar flex items-center justify-between px-2 py-1">
          <span>🔎 Search the Index</span>
          <WindowButtons />
        </div>
        <div className="grid gap-2 p-3 lg:grid-cols-[1fr_repeat(4,minmax(0,11rem))]">
          <div className="relative">
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agencies, specialties, locations…"
              className="field95 h-10 w-full pl-9 pr-3 text-sm"
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
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <p className="font-mono text-xs font-bold uppercase tracking-wider">
          ► {results.length} {results.length === 1 ? "agency" : "agencies"}
          {hasFilters ? " match your filters" : " listed"}
        </p>
        {hasFilters && (
          <button onClick={clearAll} className="btn95 px-2.5 py-1 text-xs">
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
        <div className="win-well mt-4 px-6 py-16 text-center">
          <p className="font-comic text-lg font-bold">No matches :-(</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-face-darker">
            No agencies fit that combination yet. Try widening the budget or
            clearing a filter.
          </p>
          <button onClick={clearAll} className="btn95 mt-5 px-4 py-2 text-sm">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
