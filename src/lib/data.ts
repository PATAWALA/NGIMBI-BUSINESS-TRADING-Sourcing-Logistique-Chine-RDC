import {
  Search,
  ShieldCheck,
  Ship,
  Smartphone,
  Car,
  Shirt,
  Factory,
  HardHat,
  Sparkles,
  Building2,
  Timer,
  BadgeDollarSign,
  PackageX,
  Container,
  Users,
} from "lucide-react";
import type { Product, ServiceOption, StatItem } from "@/types";

export const BRAND = {
  name: "NGIMBI BUSINESS TRADING",
  shortName: "NBT",
  slogan:
    "Votre partenaire de confiance pour le sourcing, l'achat et la logistique en Chine.",
  axis: "Chine ➡️ RDC (Kinshasa, Lubumbashi, Goma) & Afrique",
};

export const WHATSAPP_NUMBER = "243990000000";
export const PHONE_DISPLAY = "+243 990 000 000";
export const EMAIL = "contact@ngimbibusiness.com";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappWithText(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#suivi", label: "Suivi de colis" },
  { href: "#sourcing", label: "Sourcing" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#services", label: "Services" },
  { href: "#pourquoi-nous", label: "Pourquoi nous" },
];

export const PREFILL_EVENT = "nbt:prefill";

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "sourcing",
    title: "Recherche de fournisseurs & produits",
    short: "Sourcing",
    description:
      "Nous identifions, comparons et négocions pour vous les meilleurs fournisseurs chinois (1688, Alibaba, Yiwu, marchés locaux).",
    icon: Search,
    points: [
      "Vérification d'authenticité des usines",
      "Négociation de prix en mandarin",
      "Échantillons avant commande",
    ],
  },
  {
    id: "achat-controle",
    title: "Achat & Contrôle qualité sur place",
    short: "Achat & Contrôle",
    description:
      "Nous achetons en votre nom et inspectons physiquement chaque lot dans nos entrepôts de Guangzhou et Yiwu.",
    icon: ShieldCheck,
    points: [
      "Inspection pièce par pièce",
      "Rapport photo & vidéo détaillé",
      "Emballage renforcé export",
    ],
  },
  {
    id: "fret-dedouanement",
    title: "Expédition & Dédouanement sécurisé",
    short: "Fret & Dédouanement",
    description:
      "Fret maritime ou aérien, groupage, conteneur complet et dédouanement transparent jusqu'à votre ville.",
    icon: Ship,
    points: [
      "Maritime (FCL / LCL) & aérien",
      "Dédouanement Matadi / Kinshasa",
      "Livraison door-to-door",
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "electronique",
    name: "Électronique & Accessoires",
    category: "Électronique",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    delay: "35 – 45 jours (maritime)",
    priceHint: "À partir de 0,80 $ / pièce",
    tags: ["Téléphones", "Accessoires", "TV & Audio", "Éclairage LED"],
    icon: Smartphone,
  },
  {
    id: "pieces-auto",
    name: "Pièces Auto & Moto",
    category: "Automobile",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    delay: "40 – 55 jours (maritime)",
    priceHint: "Cotation sur référence exacte",
    tags: ["Filtres", "Freinage", "Suspension", "Pneumatiques"],
    icon: Car,
  },
  {
    id: "textile",
    name: "Textile & Habillement",
    category: "Textile",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    delay: "30 – 40 jours (maritime)",
    priceHint: "À partir de 1,20 $ / unité",
    tags: ["Prêt-à-porter", "Chaussures", "Sacs", "Uniformes"],
    icon: Shirt,
  },
  {
    id: "machines",
    name: "Machines Industrielles",
    category: "Industrie",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    delay: "50 – 70 jours (maritime FCL)",
    priceHint: "Cotation projet sur-mesure",
    tags: ["Agro-alimentaire", "BTP", "Plastique", "Emballage"],
    icon: Factory,
  },
  {
    id: "materiaux",
    name: "Matériaux de Construction",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    delay: "45 – 60 jours (maritime FCL)",
    priceHint: "Tarif au conteneur",
    tags: ["Carrelage", "Sanitaire", "Fer & Acier", "Menuiserie"],
    icon: HardHat,
  },
  {
    id: "cosmetiques",
    name: "Cosmétiques & Soins",
    category: "Beauté",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    delay: "25 – 35 jours (aérien possible)",
    priceHint: "À partir de 0,60 $ / pièce",
    tags: ["Soins peau", "Maquillage", "Parfums", "Cheveux"],
    icon: Sparkles,
  },
];

export const STATS: StatItem[] = [
  {
    id: "bureaux",
    value: 2,
    label: "Bureaux en Chine",
    description: "Guangzhou & Yiwu — présence physique permanente sur les marchés.",
    icon: Building2,
  },
  {
    id: "reponse",
    value: 24,
    suffix: "h",
    prefix: "< ",
    label: "Délai de réponse",
    description: "Devis et cotations détaillées sous 24 heures ouvrées.",
    icon: Timer,
  },
  {
    id: "transparence",
    value: 100,
    suffix: "%",
    label: "Transparence des coûts",
    description: "Facture détaillée : produit, fret, taxes. Zéro frais caché.",
    icon: BadgeDollarSign,
  },
  {
    id: "zero-perte",
    value: 0,
    label: "Marchandise perdue",
    description: "Traçabilité totale et assurance sur chaque expédition.",
    icon: PackageX,
  },
];

export const EXTRA_STATS = [
  { id: "conteneurs", value: 450, suffix: "+", label: "Conteneurs expédiés", icon: Container },
  { id: "clients", value: 1200, suffix: "+", label: "Clients accompagnés", icon: Users },
  { id: "villes", value: 12, suffix: "+", label: "Villes desservies", icon: Building2 },
  { id: "experience", value: 8, suffix: " ans", label: "D'expertise Chine–Afrique", icon: ShieldCheck },
];

export const DESTINATION_CITIES = [
  "Kinshasa (RDC)",
  "Lubumbashi (RDC)",
  "Goma (RDC)",
  "Bukavu (RDC)",
  "Matadi (RDC)",
  "Kolwezi (RDC)",
  "Mbuji-Mayi (RDC)",
  "Brazzaville (Congo)",
  "Pointe-Noire (Congo)",
  "Bujumbura (Burundi)",
  "Kigali (Rwanda)",
  "Autre ville / à préciser",
];

export const COVERAGE = {
  china: ["Guangzhou", "Yiwu", "Shenzhen", "Ningbo", "Foshan"],
  africa: ["Kinshasa", "Lubumbashi", "Goma", "Matadi", "Brazzaville"],
};

export const TRACKING_DEMO_CODES = ["NG-2026-CD", "TR-8892-CN", "NBT-LUB-4471"];