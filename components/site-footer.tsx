import Link from "next/link";
import { INDUSTRIES, IS_MOCK_DATA, SERVICES } from "@/data/listings";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-paper">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            The independent directory of vetted AI automation agencies and
            consultants. Compare specialists, then request an intro directly.
          </p>
        </div>
        <div>
          <p className="microlabel text-paper/40">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="transition-colors hover:text-paper"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="microlabel text-paper/40">Industries</p>
          <ul className="mt-4 space-y-2 text-sm">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="transition-colors hover:text-paper"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="microlabel text-paper/40">For agencies</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/get-listed"
                className="transition-colors hover:text-paper"
              >
                Get listed
              </Link>
            </li>
            <li>
              <Link
                href="/get-listed#pricing"
                className="transition-colors hover:text-paper"
              >
                Pricing
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="transition-colors hover:text-paper"
              >
                {SITE.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          {IS_MOCK_DATA && (
            <p>Listings shown are sample data pending the live dataset.</p>
          )}
        </div>
      </div>
    </footer>
  );
}
