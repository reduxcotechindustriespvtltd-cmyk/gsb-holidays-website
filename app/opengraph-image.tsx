import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #071c19 0%, #0d3b36 100%)",
          color: "#f7f1e3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 6,
            borderRadius: 3,
            background: "#e8c27a",
            marginBottom: 36,
          }}
        />
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -1 }}>{SITE.name}</div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#f0dbab" }}>{SITE.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
