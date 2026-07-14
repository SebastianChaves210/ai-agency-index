import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-6 py-28">
      <p className="microlabel text-pine">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        That page isn&apos;t in the index.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        The listing may have been removed, or the address was mistyped. The
        directory itself is very much alive.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-pine px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
      >
        Back to the directory
      </Link>
    </div>
  );
}
