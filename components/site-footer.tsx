import Link from "next/link";
import { INDUSTRIES, IS_MOCK_DATA, SERVICES } from "@/data/listings";
import { STATS } from "@/lib/directory";
import { SITE } from "@/lib/site";

/* 88×31 buttons — standard-issue footer hardware of the early web */
const BADGES = [
  {
    top: "Best viewed with",
    bottom: "ANY browser",
    className: "border-face-dark bg-face text-black",
  },
  {
    top: "Resolution",
    bottom: "800 × 600",
    className: "border-royal bg-navy text-sun",
  },
  {
    top: "Made with",
    bottom: "NOTEPAD.EXE",
    className: "border-face-dark bg-black text-lime95",
  },
  {
    top: "Y2K",
    bottom: "Compliant ✔",
    className: "border-sun bg-hot-deep text-sun",
  },
];

export function SiteFooter() {
  // Deterministic, proudly fake hit counter — same "visitor" on every build.
  const visitorCount = String(31337 + STATS.agencies * 421).padStart(7, "0");

  return (
    <footer className="text-[#aaaacc]">
      <div className="hr-rainbow" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg tracking-wide text-sun [text-shadow:2px_2px_0_#000]">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            The independent directory of vetted AI automation agencies and
            consultants. Compare specialists, then request an intro directly.
          </p>
        </div>
        <div>
          <p className="microlabel text-lime95">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="weblink-dark">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="microlabel text-lime95">Industries</p>
          <ul className="mt-4 space-y-2 text-sm">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="weblink-dark">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="microlabel text-lime95">For agencies</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/get-listed" className="weblink-dark">
                Get listed
              </Link>
            </li>
            <li>
              <Link href="/get-listed#pricing" className="weblink-dark">
                Pricing
              </Link>
            </li>
            <li>
              <a href={`mailto:${SITE.contactEmail}`} className="weblink-dark">
                {SITE.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Badge wall + hit counter */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((b) => (
            <span key={b.bottom} className={`badge31 ${b.className}`}>
              <span>{b.top}</span>
              <span>{b.bottom}</span>
            </span>
          ))}
        </div>
        <p className="text-center font-mono text-xs">
          You are visitor number{" "}
          <span className="led text-sm" title="(not really)">
            {visitorCount}
          </span>
        </p>
        <p className="text-center font-comic text-xs">
          Established 2026 on the information superhighway ✶ This site is
          Netscape-friendly
        </p>
      </div>

      <div className="border-t border-[#333366]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
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
