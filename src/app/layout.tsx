import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ngimbibusiness.com"),
  title: {
    default: "NGIMBI BUSINESS TRADING — Sourcing & Logistique Chine ➡️ RDC",
    template: "%s · NGIMBI BUSINESS TRADING",
  },
  description:
    "Votre partenaire de confiance pour le sourcing, l'achat, le contrôle qualité et la logistique en Chine vers la RDC (Kinshasa, Lubumbashi, Goma) et l'Afrique.",
  keywords: [
    "sourcing Chine",
    "import Chine RDC",
    "fret maritime Kinshasa",
    "dédouanement Matadi",
    "Guangzhou Yiwu Kinshasa",
    "NGIMBI BUSINESS TRADING",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ngimbibusiness.com",
    siteName: "NGIMBI BUSINESS TRADING",
    title: "NGIMBI BUSINESS TRADING 🇨🇳✈️🇨🇩",
    description:
      "Sourcing, achat et logistique en Chine vers la RDC & l'Afrique.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3B2F2F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-amber-400"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}