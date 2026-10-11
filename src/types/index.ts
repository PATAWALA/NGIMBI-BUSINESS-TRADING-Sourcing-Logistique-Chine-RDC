import type { LucideIcon } from "lucide-react";

export type ServiceKey = "sourcing" | "achat-controle" | "fret-dedouanement";

export interface ServiceOption {
  id: ServiceKey;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

export type TrackingStatus = "done" | "current" | "pending";

export interface TrackingStep {
  title: string;
  location: string;
  description: string;
  icon: LucideIcon;
  date: string;
  status: TrackingStatus;
}

export interface TrackingResult {
  code: string;
  reference: string;
  origin: string;
  destination: string;
  mode: "Fret maritime" | "Fret aérien" | "Express aérien";
  weight: string;
  volume: string;
  eta: string;
  progress: number;
  steps: TrackingStep[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  delay: string;
  priceHint: string;
  tags: string[];
  icon: LucideIcon;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface SourcingFormState {
  service: ServiceKey | "";
  product: string;
  link: string;
  quantity: string;
  budget: string;
  city: string;
  name: string;
  phone: string;
  notes: string;
}

export interface PrefillDetail {
  service?: ServiceKey;
  product?: string;
  category?: string;
}