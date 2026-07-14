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
        <p className="microlabel text-hot-deep">★ Services ★</p>
        <h1 className="wordart mt-3 text-4xl leading-tight">
          Browse agencies by service
        </h1>
        <p className="mt-4 text-base leading-relaxed text-face-darker">
          Every listed agency declares a primary specialty. Pick the kind of
          work you need done and compare the teams that do it every day.
        </p>
      </header>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const count = agenciesForService(s.slug).length;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group border-2 border-black bg-white p-6 shadow-[4px_4px_0_var(--face-dark)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--face-dark)]"
            >
              <h2 className="text-lg font-bold leading-snug text-link underline group-hover:text-hot">
                {s.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-face-darker">
                {s.blurb}
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
