import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MockDataNotice } from "@/components/mock-data-notice";
import { SITE } from "@/lib/site";
import "./globals.css";

/*
 * No webfonts on purpose: the Y2K skin runs entirely on web-safe system
 * stacks (Verdana / Impact / Comic Sans MS / Courier New), declared in
 * globals.css. Zero font bytes shipped — very 2000, very fast.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <MockDataNotice />
        <main className="flex-1 px-2 py-4 sm:px-4 sm:py-6">
          {/* The whole site lives inside one chunky "window" on the starfield */}
          <div className="win-frame mx-auto w-full max-w-6xl bg-face pb-16 shadow-[8px_8px_0_rgba(0,0,0,0.55)]">
            {children}
          </div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
