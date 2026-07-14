import Link from "next/link";
import type { Agency } from "@/data/listings";
import { AgencyCard } from "@/components/agency-card";
import { SITE } from "@/lib/site";

/**
 * Shared layout for /services/[slug] and /industries/[slug] category pages.
 * Emits ItemList structured data for the listed agencies.
 */
export function CategoryPage({
  kicker,
  title,
  blurb,
  agencies,
  otherHeading,
  otherLinks,
}: {
  kicker: string;
  title: string;
  blurb: string;
  agencies: Agency[];
  otherHeading: string;
  otherLinks: { href: string; label: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    numberOfItems: agencies.length,
    itemListElement: agencies.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${SITE.url}/agency/${a.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="font-mono text-xs font-bold">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="weblink">
              Directory
            </Link>
          </li>
          <li aria-hidden>»</li>
          <li aria-current="page" className="text-black">
            {title}
          </li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="microlabel text-hot-deep">★ {kicker} ★</p>
        <h1 className="wordart mt-3 text-4xl leading-tight">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-face-darker">{blurb}</p>
        <p className="microlabel mt-6 text-black">
          ► {agencies.length} {agencies.length === 1 ? "agency" : "agencies"} listed
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agencies.map((a) => (
          <AgencyCard key={a.slug} agency={a} />
        ))}
      </div>

      <div className="hr-rainbow mt-16" aria-hidden />

      <section className="mt-8">
        <h2 className="microlabel inline-block bg-navy px-2 py-1 text-white">
          {otherHeading}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {otherLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-2 border-black bg-face px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0_var(--face-dark)] hover:bg-sun"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
