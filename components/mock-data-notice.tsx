import { IS_MOCK_DATA } from "@/data/listings";

/**
 * Site-wide banner shown while IS_MOCK_DATA is true in data/listings.ts.
 * Disappears automatically once real listings are swapped in.
 */
export function MockDataNotice() {
  if (!IS_MOCK_DATA) return null;
  return (
    <div className="border-b border-line bg-cream">
      <p className="mx-auto max-w-6xl px-6 py-2 text-center text-xs text-ink-soft">
        Preview build — listings shown are clearly-labeled sample data while
        the live dataset is prepared.
      </p>
    </div>
  );
}
