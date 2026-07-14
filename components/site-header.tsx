import Link from "next/link";
import { SITE } from "@/lib/site";
import { STATS } from "@/lib/directory";

export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        fill="var(--sun)"
        stroke="#000"
        strokeWidth="2"
      />
      <path
        d="M16 7v18M9 10.5l14 11M23 10.5l-14 11"
        stroke="var(--navy)"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/get-listed", label: "Pricing" },
];

const TICKER = [
  "Welcome, web surfer",
  `${STATS.agencies} vetted AI agencies listed`,
  `${STATS.verified} independently verified`,
  "Paid placement is always labeled",
  "Verification is never for sale",
  "Free for buyers",
  "Get your agency listed today",
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-black">
      {/* Window-title-bar chrome */}
      <div className="titlebar">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:px-6">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 text-white"
          >
            <Logo />
            <span className="truncate font-display text-xl tracking-wide [text-shadow:2px_2px_0_#000]">
              {SITE.name}
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="btn95 hidden px-3 py-1.5 text-xs sm:inline-flex"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-listed"
              className="btn95 btn95-hot px-3 py-1.5 text-xs"
            >
              Get listed
            </Link>
          </nav>
        </div>
      </div>

      {/* Scrolling ticker — CSS marquee, pauses on hover, stops with reduced motion */}
      <div className="marquee border-t-2 border-black bg-sun" aria-hidden>
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="marquee-track py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black"
          >
            {TICKER.map((item) => (
              <span key={item} className="mr-10">
                ★ {item}
              </span>
            ))}
          </p>
        ))}
      </div>
    </header>
  );
}
