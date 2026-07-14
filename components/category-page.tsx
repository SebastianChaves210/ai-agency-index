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
      <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink">
              Directory
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {title}
          </li>
        </ol>
      </nav>

      <header className="mt-8 max-w-3xl">
        <p className="microlabel text-pine">{kicker}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{blurb}</p>
        <p className="microlabel mt-6 text-ink-faint">
          {agencies.length} {agencies.length === 1 ? "agency" : "agencies"} listed
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agencies.map((a) => (
          <AgencyCard key={a.slug} agency={a} />
        ))}
      </div>

      <section className="mt-20 border-t border-line pt-8">
        <h2 className="microlabel text-ink-faint">{otherHeading}</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {otherLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-line-strong"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
