import type { NextConfig } from "next";

// Content-Security-Policy notes:
// - script-src / style-src need 'unsafe-inline' because Next.js App Router
//   injects inline hydration payload scripts on every page, and several
//   components (motion-driven cursor/scroll effects, chart colors) set
//   inline `style` attributes rendered in the initial HTML. A nonce-based
//   strict CSP is possible via middleware, but it forces every route to
//   render dynamically (loses static prerendering) — not a good trade-off
//   for this mostly-static brochure site. Everything else below is locked
//   down to 'self': no external scripts, no framing, no cross-origin fetch.
// - If Google Analytics (NEXT_PUBLIC_GA_ID) is wired in later, this policy
//   will need script-src/connect-src entries for googletagmanager.com and
//   google-analytics.com.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
