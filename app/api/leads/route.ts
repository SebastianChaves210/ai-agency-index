import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Receives two kinds of submissions:
 *  - kind "intro"   → a buyer requesting an intro to an agency (from /agency/[slug])
 *  - kind "listing" → an agency applying to be listed (from /get-listed)
 *
 * Current behavior: leads are logged to the server console (visible in
 * Vercel → Project → Logs) and optionally forwarded to LEADS_WEBHOOK_URL
 * if that env var is set (e.g. a Zapier/Make webhook, Slack incoming
 * webhook, or your own endpoint).
 *
 * To upgrade later: replace the forwarding block with an email provider
 * (e.g. Resend) or a database insert. Keep the honeypot check.
 */

const MAX_FIELD_LENGTH = 2000;

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success, store nothing.
  if (clean(body.company_website_hp)) {
    return NextResponse.json({ ok: true });
  }

  const kind = clean(body.kind);
  const email = clean(body.email);
  const name = clean(body.name);

  if (!["intro", "listing"].includes(kind)) {
    return NextResponse.json({ ok: false, error: "Unknown kind" }, { status: 400 });
  }
  if (!name || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required" },
      { status: 400 }
    );
  }

  const lead = {
    kind,
    name,
    email,
    company: clean(body.company),
    agencySlug: clean(body.agencySlug),
    agencyName: clean(body.agencyName),
    website: clean(body.website),
    tier: clean(body.tier),
    budget: clean(body.budget),
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  };

  // Always log — retrievable from Vercel runtime logs.
  console.log("[LEAD]", JSON.stringify(lead));

  // Optional forwarding to any webhook (Zapier, Make, Slack, custom).
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("[LEAD] webhook forward failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
