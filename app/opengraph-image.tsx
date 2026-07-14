import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

/* Starfield positions for the OG card — deterministic, drawn as dots */
const STARS = [
  [60, 90], [180, 300], [120, 520], [320, 160], [420, 540], [560, 80],
  [700, 480], [820, 130], [940, 560], [1050, 90], [1120, 340], [880, 300],
  [260, 430], [640, 260], [1010, 470],
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000033",
          padding: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "6px solid #c0c0c0",
            background: "#000033",
            padding: 56,
            position: "relative",
          }}
        >
          {STARS.map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: i % 3 === 0 ? 6 : 4,
                height: i % 3 === 0 ? 6 : 4,
                borderRadius: 9999,
                background: i % 4 === 0 ? "#ffff99" : "#ffffff",
                opacity: 0.9,
              }}
            />
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "#ffff00",
                border: "4px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000080",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              *
            </div>
            <div style={{ fontSize: 34, color: "#ffffff", fontWeight: 700 }}>
              {SITE.name}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.05,
                maxWidth: 980,
                color: "#ffff00",
                fontWeight: 700,
              }}
            >
              Find an AI agency you can actually trust.
            </div>
            <div style={{ fontSize: 28, color: "#99ccff" }}>
              Vetted AI automation agencies &amp; consultants, compared honestly.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#c0c0c0",
              border: "3px solid #000",
              padding: "10px 20px",
              color: "#000080",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <div>THE INDEPENDENT DIRECTORY</div>
            <div>BEST VIEWED WITH ANY BROWSER</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
