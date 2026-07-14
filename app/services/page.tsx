import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/listings";
import { agenciesForService } from "@/lib/directory";

export const metadata: Metadata = {
  title: "AI Agency Services",
  description:
    "Browse vetted AI agencies by service — workflow automation, chatbots, custom development, voice agents, computer vision, and more.",
};

export default function ServicesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <header className="max-w-3xl">
        <p className="microlabel text-pine">Services</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">
          Browse agencies by service
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Every listed agency declares a primary specialty. Pick the kind of
          work you need done and compare the teams that do it every day.
        </p>
      </header>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const count = agenciesForService(s.slug).length;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <h2 className="font-display text-xl font-semibold tracking-tight group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                {s.name}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.blurb}</p>
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
