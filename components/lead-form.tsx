"use client";

import { useState } from "react";

const BUDGETS = ["Under $10k", "$10–25k", "$25–50k", "$50–100k", "$100k+"];

const inputClasses = "field95 w-full px-3 py-2 text-sm";

/**
 * "Request an intro" form on agency profiles. Submissions POST to /api/leads
 * (see app/api/leads/route.ts for where they go from there).
 */
export function LeadForm({
  agencySlug,
  agencyName,
}: {
  agencySlug: string;
  agencyName: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "intro", agencySlug, ...data }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-2 border-grass bg-[#ccffcc] p-5">
        <p className="font-comic text-base font-bold text-[#004400]">
          ✔ Request sent!
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-black">
          Thanks — we&apos;ll pass your brief to {agencyName} and you should
          hear back within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot — real users never see or fill this field */}
      <input
        type="text"
        name="company_website_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <input
        required
        name="name"
        placeholder="Your name"
        autoComplete="name"
        className={inputClasses}
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Work email"
        autoComplete="email"
        className={inputClasses}
      />
      <input
        name="company"
        placeholder="Company (optional)"
        autoComplete="organization"
        className={inputClasses}
      />
      <div className="relative">
        <select name="budget" defaultValue="" aria-label="Project budget" className={`${inputClasses} appearance-none pr-8`}>
          <option value="" disabled>
            Project budget
          </option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
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
        required
        name="message"
        rows={4}
        placeholder="What are you trying to automate or build?"
        className={inputClasses}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn95 btn95-grass w-full px-4 py-2.5 text-sm"
      >
        {status === "submitting" ? "Sending…" : "Request an intro"}
      </button>
      {status === "error" && (
        <p className="text-sm font-bold text-hot-deep">
          Something went wrong — please try again in a moment.
        </p>
      )}
      <p className="font-mono text-[11px] leading-relaxed text-face-darker">
        Free for buyers. We share your brief only with {agencyName}.
      </p>
    </form>
  );
}
