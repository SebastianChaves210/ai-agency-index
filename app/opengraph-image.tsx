import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#143427",
          color: "#faf9f6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#faf9f6" />
            <path
              d="M16 7v18M9 10.5l14 11M23 10.5l-14 11"
              stroke="#143427"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontSize: 34, letterSpacing: -0.5 }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Find an AI agency you can actually trust.
          </div>
          <div style={{ fontSize: 30, color: "rgba(250,249,246,0.65)" }}>
            Vetted AI automation agencies &amp; consultants, compared honestly.
          </div>
        </div>
      </div>
    ),
    size
  );
}
