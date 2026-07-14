import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/data/listings";
import { agenciesForIndustry } from "@/lib/directory";

export const metadata: Metadata = {
  title: "AI Agencies by Industry",
  description:
    "Browse vetted AI agencies by the industries they serve — healthcare, legal, finance, e-commerce, manufacturing, logistics, and more.",
};

export default function IndustriesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <header className="max-w-3xl">
        <p className="microlabel text-pine">Industries</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">
          Browse agencies by industry
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Domain knowledge is half the project. These agencies have shipped AI
          systems inside your industry&apos;s constraints, not just adjacent to
          them.
        </p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {INDUSTRIES.map((i) => {
          const count = agenciesForIndustry(i.slug).length;
          return (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <h2 className="font-display text-xl font-semibold tracking-tight group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                {i.name}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{i.blurb}</p>
              <p className="microlabel mt-4 text-ink-faint">
                {count} {count === 1 ? "agency" : "agencies"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
