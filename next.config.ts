import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The tech-stack icons in public/icons are self-hosted, trusted SVGs.
    // next/image disables SVG optimization by default, so allow it explicitly
    // while sandboxing with a strict CSP.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
