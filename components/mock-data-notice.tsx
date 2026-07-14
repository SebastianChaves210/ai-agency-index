import { IS_MOCK_DATA } from "@/data/listings";

/**
 * Site-wide banner shown while IS_MOCK_DATA is true in data/listings.ts.
 * Disappears automatically once real listings are swapped in.
 */
export function MockDataNotice() {
  if (!IS_MOCK_DATA) return null;
  return (
    <div className="border-b-2 border-black bg-butter">
      <div className="stripes h-2" aria-hidden />
      <p className="mx-auto max-w-6xl px-6 py-1.5 text-center font-comic text-xs font-bold text-black">
        🚧 Preview build — listings shown are clearly-labeled sample data while
        the live dataset is prepared. 🚧
      </p>
      <div className="stripes h-2" aria-hidden />
    </div>
  );
}
