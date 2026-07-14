"use client";

import { useState } from "react";

const inputClasses = "field95 w-full px-3 py-2 text-sm";

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
      <div className="border-2 border-grass bg-[#ccffcc] p-6">
        <p className="font-comic text-lg font-bold text-[#004400]">
          ✔ Application received!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-black">
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
          className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-black"
          fill="currentColor"
        >
          <path d="M1.5 3.5h9L6 9z" />
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
        className="btn95 btn95-hot w-full px-4 py-2.5 text-sm sm:w-auto sm:px-6"
      >
        {status === "submitting" ? "Submitting…" : "Apply for a listing"}
      </button>
      {status === "error" && (
        <p className="text-sm font-bold text-hot-deep">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}
