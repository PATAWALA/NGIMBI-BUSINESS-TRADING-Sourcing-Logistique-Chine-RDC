import {
  ClipboardCheck,
  Warehouse,
  ShieldCheck,
  PackageCheck,
  Ship,
  Landmark,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { TrackingResult, TrackingStatus } from "@/types";
import { addDays, formatShortDate, hashCode } from "./utils";

interface StepTemplate {
  title: string;
  location: string;
  description: string;
  icon: LucideIcon;
}

const STEP_TEMPLATE: StepTemplate[] = [
  {
    title: "Commande confirmée",
    location: "Guangzhou, Chine",
    description:
      "Facture proforma validée, paiement fournisseur sécurisé et dossier ouvert chez NBT.",
    icon: ClipboardCheck,
  },
  {
    title: "Réception à l'entrepôt",
    location: "Entrepôt NBT — Guangzhou",
    description:
      "Marchandises réceptionnées, pesées, photographiées et référencées sous votre code client.",
    icon: Warehouse,
  },
  {
    title: "Contrôle qualité & emballage",
    location: "Guangzhou, Chine",
    description:
      "Inspection pièce par pièce, rapport photo/vidéo envoyé, emballage renforcé pour l'export.",
    icon: ShieldCheck,
  },
  {
    title: "Chargement & scellage",
    location: "Port de Nansha / Aéroport de Baiyun",
    description:
      "Conteneur scellé, documents export (BL / AWB, packing list, facture) établis.",
    icon: PackageCheck,
  },
  {
    title: "Transit international",
    location: "Océan Indien / Vol cargo",
    description:
      "Fret en cours — votre conseiller NBT suit activement l'acheminement chaque semaine.",
    icon: Ship,
  },
  {
    title: "Arrivée & dédouanement",
    location: "Matadi / Kinshasa, RDC",
    description:
      "Dédouanement sécurisé, transparent et conforme. Aucun frais caché.",
    icon: Landmark,
  },
  {
    title: "Livraison finale",
    location: "Destination client",
    description:
      "Remise en main propre contre signature, déchargement et vérification finale.",
    icon: Truck,
  },
];

const REFERENCE_PREFIX = ["NBT", "NGT", "IMP"];

function resolveDestination(code: string): string {
  if (code.includes("LUB")) return "Lubumbashi, RDC";
  if (code.includes("GOMA")) return "Goma, RDC";
  if (code.includes("BZV") || code.includes("BRAZZA")) return "Brazzaville, Congo";
  if (code.includes("BUK")) return "Bukavu, RDC";
  return "Kinshasa, RDC";
}

function resolveMode(code: string, hash: number): TrackingResult["mode"] {
  if (code.includes("AIR") || code.includes("EXP")) return "Fret aérien";
  return hash % 5 === 0 ? "Fret aérien" : "Fret maritime";
}

export function buildTracking(rawCode: string): TrackingResult {
  const code = rawCode.trim().toUpperCase();
  const h = hashCode(code);

  const currentIndex = h % STEP_TEMPLATE.length;
  const today = new Date();
  const startOffset = -1 * (currentIndex * 3 + 2);

  const steps = STEP_TEMPLATE.map((tpl, index) => {
    const isPast = index < currentIndex;
    const isCurrent = index === currentIndex;

    const status: TrackingStatus = isPast
      ? "done"
      : isCurrent
        ? "current"
        : "pending";

    const date = formatShortDate(addDays(today, startOffset + index * 3));

    return {
      ...tpl,
      status,
      date,
      location:
        index === 5 || index === 6
          ? resolveDestination(code)
          : tpl.location,
    };
  });

  const progress = Math.round(((currentIndex + 1) / steps.length) * 100);
  const eta = formatShortDate(addDays(today, (steps.length - currentIndex) * 3));

  const weight = `${(h % 880) + 120} kg`;
  const volume = `${((h % 45) + 3).toFixed(1)} m³`;

  return {
    code,
    reference: `${REFERENCE_PREFIX[h % REFERENCE_PREFIX.length]}-${(h % 9000) + 1000}-${
      code.includes("CD") ? "CD" : "CN"
    }`,
    origin: "Guangzhou / Yiwu, Chine",
    destination: resolveDestination(code),
    mode: resolveMode(code, h),
    weight,
    volume,
    eta,
    progress,
    steps,
  };
}

export const DEMO_CODES = ["NG-2026-CD", "TR-8892-CN", "NBT-LUB-4471"];