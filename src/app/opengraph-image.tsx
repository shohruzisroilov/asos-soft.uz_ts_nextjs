import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

/** Dynamically generated social share image (Open Graph + Twitter). */
export default function OpengraphImage() {
  const logoPath = path.join(process.cwd(), "public/logo-black.png");
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logoBase64}
              alt=""
              style={{
                width: "60%",
                height: "60%",
                objectFit: "contain",
              }}
            />
          </div>
          <div style={{ fontSize: 40, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Building Digital Solutions That Grow Your Business
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", maxWidth: 820 }}>
            Web · Mobile · CRM · ERP · AI · Automation · UI/UX
          </div>
        </div>

        {/* Footer URL */}
        <div style={{ fontSize: 26, color: "#a1a1aa" }}>asossoft.com</div>
      </div>
    ),
    { ...size }
  );
}

