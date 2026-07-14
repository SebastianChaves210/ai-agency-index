"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-line-strong focus:border-pine";

/**
 * Listing application on /get-listed. Submissions POST to /api/leads with
 * kind "listing" (see app/api/leads/route.ts).
 */
export function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "listing", ...data }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-pine/25 bg-pine-soft p-6">
        <p className="font-display text-lg font-semibold text-pine-deep">
          Application received
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We review every application by hand. Expect a decision — and your
          verification checklist — within three business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        name="company_website_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <input required name="agencyName" placeholder="Agency name" className={inputClasses} />
        <input
          required
          type="url"
          name="website"
          placeholder="Website (https://…)"
          className={inputClasses}
        />
        <input required name="name" placeholder="Contact name" autoComplete="name" className={inputClasses} />
        <input
          required
          type="email"
          name="email"
          placeholder="Work email"
          autoComplete="email"
          className={inputClasses}
        />
      </div>
      <div className="relative">
        <select name="tier" defaultValue="featured" aria-label="Listing tier" className={`${inputClasses} appearance-none pr-8`}>
          <option value="basic">Basic — free</option>
          <option value="featured">Featured — $99/mo</option>
          <option value="partner">Partner — $249/mo</option>
        </select>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-faint"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </div>
      <textarea
        name="message"
        rows={3}
        placeholder="Anything we should know? (services, industries, notable work)"
        className={inputClasses}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-pine px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-pine-deep disabled:opacity-60 sm:w-auto sm:px-6"
      >
        {status === "submitting" ? "Submitting…" : "Apply for a listing"}
      </button>
      {status === "error" && (
        <p className="text-sm text-[#a03d2e]">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
