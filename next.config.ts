import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Plusieurs domaines autorisés pour ne jamais être bloqué
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
    // Formats modernes = chargement plus rapide
    formats: ["image/avif", "image/webp"],
    // Cache les images optimisées pendant 60 jours
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },
};

export default nextConfig;