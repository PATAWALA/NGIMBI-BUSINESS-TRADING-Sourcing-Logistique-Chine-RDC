"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  PackageSearch,
  Plane,
  ShieldCheck,
  Ship,
  Sparkles,
  Zap,
} from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { WHATSAPP_URL } from "@/lib/data";

const ROUTE = [
  { city: "Guangzhou", country: "Chine", note: "Entrepôt & contrôle qualité", icon: "🏭" },
  { city: "Nansha / Baiyun", country: "Chine", note: "Chargement maritime ou aérien", icon: "🚢" },
  { city: "Matadi", country: "RDC", note: "Dédouanement sécurisé", icon: "🛃" },
  { city: "Kinshasa · Lubumbashi · Goma", country: "RDC", note: "Livraison finale", icon: "📍" },
];

const TRUST = [
  { icon: ShieldCheck, label: "Zéro marchandise perdue" },
  { icon: Zap, label: "Réponse en < 24h" },
  { icon: Ship, label: "Maritime & Aérien" },
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-stone-50 pb-40 pt-32 md:pb-52 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-70" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-amber-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-52 h-[22rem] w-[22rem] rounded-full bg-amber-800/10 blur-[110px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-stone-50 to-transparent" />

      <div className="nbt-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="nbt-eyebrow">
                <Sparkles className="h-3 w-3" />
                Chine ➡️ RDC & Afrique
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold text-stone-600 backdrop-blur">
                🇨🇳 <Plane className="h-3 w-3 text-amber-700" /> 🇨🇩
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-balance font-display text-[2.6rem] font-black leading-[1.04] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.9rem]"
            >
              Importez depuis la Chine
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-br from-amber-600 to-amber-900 bg-clip-text text-transparent">
                  vers la RDC
                </span>
                <span className="absolute inset-x-0 bottom-1.5 z-0 h-3 rounded-full bg-amber-500/25" />
              </span>
              & l&apos;Afrique en toute sécurité.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-stone-600 sm:text-base"
            >
              <strong className="font-bold text-stone-800">
                NGIMBI BUSINESS TRADING
              </strong>{" "}
              est votre partenaire de confiance pour le{" "}
              <strong className="font-semibold text-amber-900">sourcing</strong>,
              l&apos;
              <strong className="font-semibold text-amber-900">
                achat & le contrôle qualité
              </strong>{" "}
              en Chine, puis l&apos;
              <strong className="font-semibold text-amber-900">
                expédition et le dédouanement
              </strong>{" "}
              jusqu&apos;à Kinshasa, Lubumbashi ou Goma.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#sourcing" className="nbt-btn-primary group">
                Lancer mon sourcing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#suivi" className="nbt-btn-ghost group">
                <PackageSearch className="h-4 w-4 text-amber-700" />
                Suivre mon colis
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-bold text-stone-700 underline decoration-amber-600/40 decoration-2 underline-offset-4 transition-colors hover:text-amber-800"
              >
                <MessageCircle className="h-4 w-4" />
                Parler à un conseiller
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-amber-900/10 pt-6"
            >
              {TRUST.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-[13px] font-semibold text-stone-600"
                >
                  <item.icon className="h-4 w-4 text-amber-700" />
                  {item.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-amber-600/15 via-transparent to-amber-900/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-900/10 bg-stone-900 p-7 shadow-soft-lg md:p-9">
              <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-60" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-amber-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-400">
                      Axe logistique principal
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold text-stone-50">
                      Chine ➡️ RDC
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
                    <Ship className="h-5 w-5 text-amber-400" />
                  </span>
                </div>

                <ol className="relative mt-8 space-y-6 pl-1">
                  <span className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-500/60 via-amber-500/25 to-transparent" />
                  {ROUTE.map((step, i) => (
                    <motion.li
                      key={step.city}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.11, duration: 0.5 }}
                      className="relative flex gap-4"
                    >
                      <span className="relative z-10 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-500/40 bg-stone-900 text-[11px]">
                        {step.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-bold leading-tight text-stone-100">
                          {step.city}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wider text-amber-500/80">
                          {step.country}
                        </span>
                        <span className="mt-1 block text-[12px] leading-snug text-stone-400">
                          {step.note}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </ol>

                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-stone-50/10 pt-6">
                  {[
                    { k: "35-45j", v: "Maritime" },
                    { k: "7-12j", v: "Aérien" },
                    { k: "100%", v: "Traçabilité" },
                  ].map((s) => (
                    <div key={s.v} className="text-center">
                      <p className="font-display text-base font-extrabold text-amber-400">
                        {s.k}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-amber-900/10 bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/15">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
              </span>
              <span>
                <span className="block text-[12px] font-extrabold text-stone-800">
                  Contrôle qualité sur place
                </span>
                <span className="block text-[11px] text-stone-500">
                  Guangzhou & Yiwu
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <SectionDivider variant="slant" className="text-stone-900" />
    </section>
  );
}