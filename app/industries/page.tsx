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
        <p className="microlabel text-hot-deep">★ Industries ★</p>
        <h1 className="wordart mt-3 text-4xl leading-tight">
          Browse agencies by industry
        </h1>
        <p className="mt-4 text-base leading-relaxed text-face-darker">
          Domain knowledge is half the project. These agencies have shipped AI
          systems inside your industry&apos;s constraints, not just adjacent to
          them.
        </p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {INDUSTRIES.map((i) => {
          const count = agenciesForIndustry(i.slug).length;
          return (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group border-2 border-black bg-white p-6 shadow-[4px_4px_0_var(--face-dark)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--face-dark)]"
            >
              <h2 className="text-lg font-bold leading-snug text-link underline group-hover:text-hot">
                {i.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-face-darker">
                {i.blurb}
              </p>
              <p className="microlabel mt-4 text-black">
                ► {count} {count === 1 ? "agency" : "agencies"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
