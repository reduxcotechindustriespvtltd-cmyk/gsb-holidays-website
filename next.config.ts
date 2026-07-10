import type { NextConfig } from "next";

// Parsed at config-eval time so a missing/malformed CRM_API_URL (e.g. local
// dev without it set) never breaks the build — package/gallery images just
// fall back to the static Unsplash URLs in that case (see lib/cms.ts).
function crmRemotePattern() {
  if (!process.env.CRM_API_URL) return null;
  try {
    const { protocol, hostname, port } = new URL(process.env.CRM_API_URL);
    return {
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
      port,
      pathname: "/api/public/files/**",
    };
  } catch {
    return null;
  }
}

const crmPattern = crmRemotePattern();

// Next 16 blocks image optimization from local-network hosts by default
// (SSRF hardening) — only relevant in local dev, where the CRM legitimately
// runs on localhost. A real deployment's CRM_API_URL points at a public/
// internal domain, not a literal loopback address, so this stays off there.
const isLocalCrm = crmPattern?.hostname === "localhost" || crmPattern?.hostname === "127.0.0.1";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(crmPattern ? [crmPattern] : []),
    ],
    ...(isLocalCrm ? { dangerouslyAllowLocalIP: true } : {}),
  },
};

export default nextConfig;
