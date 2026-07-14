import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="8" fill="var(--pine)" />
      <path
        d="M16 7v18M9 10.5l14 11M23 10.5l-14 11"
        stroke="var(--paper)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/get-listed", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-[17px] font-semibold tracking-tight">
            {SITE.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:block"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-listed"
            className="rounded-lg bg-pine px-3.5 py-2 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
          >
            Get listed
          </Link>
        </nav>
      </div>
    </header>
  );
}
