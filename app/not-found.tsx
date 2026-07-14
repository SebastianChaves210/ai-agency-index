import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <p className="wordart text-7xl">404</p>
      <h1 className="mt-6 font-comic text-2xl font-bold text-black">
        That page isn&apos;t in the index.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-face-darker">
        The listing may have been removed, or the address was mistyped. The
        directory itself is very much alive.
      </p>
      <div className="stripes mt-8 h-2 w-48 max-w-full" aria-hidden />
      <Link href="/" className="btn95 btn95-hot mt-8 px-5 py-2.5 text-sm">
        Back to the directory
      </Link>
    </div>
  );
}
