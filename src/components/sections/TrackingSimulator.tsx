"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  PackageSearch,
  ScanLine,
  Ship,
  Weight,
} from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { DEMO_CODES, buildTracking } from "@/lib/tracking";
import type { TrackingResult } from "@/types";
import { cn } from "@/lib/utils";

export default function TrackingSimulator() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = code.trim();

    if (clean.length < 4) {
      setError("Entrez un numéro de suivi valide (min. 4 caractères).");
      setResult(null);
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 1200));

    setResult(buildTracking(clean));
    setLoading(false);
  }

  function handleDemo(demo: string) {
    setCode(demo);
    setError(null);
  }

  return (
    <section
      id="suivi"
      className="relative scroll-mt-24 overflow-hidden bg-stone-900 pb-40 pt-24 md:pb-52 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-amber-600/15 blur-[130px]" />

      <div className="nbt-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">
            <ScanLine className="h-3 w-3" />
            Suivi en temps réel
          </span>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-stone-50 sm:text-4xl lg:text-[2.75rem]">
            Où en est mon colis&nbsp;?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
            Saisissez votre numéro de suivi NBT pour visualiser chaque étape :
            entrepôt de Guangzhou, chargement, transit international et
            dédouanement à Kinshasa / Matadi.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-3 rounded-[1.75rem] border border-amber-900/30 bg-stone-800/60 p-3 shadow-soft-lg backdrop-blur-xl sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" />
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError(null);
                }}
                placeholder="NG-2026-CD"
                aria-label="Numéro de suivi"
                className="w-full rounded-2xl border border-transparent bg-stone-900/70 py-3.5 pl-12 pr-4 font-mono text-sm font-bold uppercase tracking-widest text-amber-300 placeholder-stone-600 outline-none transition-all focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/15"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="nbt-btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Recherche…
                </>
              ) : (
                <>
                  Suivre
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Essayer :
            </span>
            {DEMO_CODES.map((demo) => (
              <button
                key={demo}
                type="button"
                onClick={() => handleDemo(demo)}
                className="rounded-full border border-stone-50/10 bg-stone-50/5 px-3 py-1.5 font-mono text-[11px] font-bold text-stone-300 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
              >
                {demo}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-[13px] font-semibold text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-[1.75rem] border border-amber-900/25 bg-stone-800/40 p-8"
              >
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-14 animate-pulse rounded-2xl bg-stone-50/5"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key={result.code}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[1.75rem] border border-amber-900/25 bg-stone-800/50 shadow-soft-lg backdrop-blur-xl"
              >
                <div className="border-b border-stone-50/10 bg-gradient-to-br from-amber-900/25 to-transparent p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">
                        Référence interne
                      </p>
                      <p className="mt-1.5 font-mono text-lg font-black tracking-wider text-stone-50">
                        {result.code}
                      </p>
                      <p className="mt-1 text-[12px] text-stone-400">
                        Dossier {result.reference}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-1.5 sm:items-end">
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold text-amber-300">
                        <Ship className="h-3.5 w-3.5" />
                        {result.mode}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-stone-400">
                        <Calendar className="h-3.5 w-3.5" />
                        ETA estimée : {result.eta}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <MetaBox
                      icon={<MapPin className="h-3.5 w-3.5" />}
                      label="Destination"
                      value={result.destination}
                    />
                    <MetaBox
                      icon={<Weight className="h-3.5 w-3.5" />}
                      label="Poids / Volume"
                      value={`${result.weight} · ${result.volume}`}
                    />
                    <MetaBox
                      icon={<Clock className="h-3.5 w-3.5" />}
                      label="Progression"
                      value={`${result.progress}%`}
                    />
                  </div>

                  <div className="mt-6">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-stone-50/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.progress}%` }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-700"
                      />
                    </div>
                  </div>
                </div>

                <ol className="relative p-6 md:p-7">
                  <span className="absolute left-[2.4rem] top-9 bottom-9 w-px bg-stone-50/10 md:left-[2.65rem]" />

                  {result.steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <motion.li
                        key={step.title}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                        className="relative flex gap-4 py-3.5"
                      >
                        <span
                          className={cn(
                            "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-all",
                            step.status === "done" &&
                              "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
                            step.status === "current" &&
                              "border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-[0_0_0_5px_rgba(245,158,11,0.10)]",
                            step.status === "pending" &&
                              "border-stone-50/10 bg-stone-900/60 text-stone-600",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {step.status === "current" && (
                            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-amber-400" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span
                              className={cn(
                                "font-display text-[14.5px] font-bold",
                                step.status === "pending"
                                  ? "text-stone-500"
                                  : "text-stone-100",
                              )}
                            >
                              {step.title}
                            </span>
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                step.status === "done" &&
                                  "bg-emerald-500/10 text-emerald-400",
                                step.status === "current" &&
                                  "bg-amber-500/15 text-amber-300",
                                step.status === "pending" &&
                                  "bg-stone-50/5 text-stone-500",
                              )}
                            >
                              {step.status === "done"
                                ? "Terminé"
                                : step.status === "current"
                                  ? "En cours"
                                  : "À venir"}
                            </span>
                          </span>

                          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-stone-500">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {step.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {step.date}
                            </span>
                          </span>

                          <span className="mt-1.5 block text-[12.5px] leading-relaxed text-stone-400">
                            {step.description}
                          </span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ol>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-50/10 bg-stone-900/40 px-6 py-4 md:px-7">
                  <p className="inline-flex items-center gap-2 text-[12px] text-stone-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Suivi mis à jour automatiquement toutes les 24h
                  </p>
                  <a
                    href="#sourcing"
                    className="text-[12.5px] font-bold text-amber-400 underline decoration-amber-500/40 decoration-2 underline-offset-4 transition-colors hover:text-amber-300"
                  >
                    Une nouvelle importation ? →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <SectionDivider variant="wave" className="text-stone-100" />
    </section>
  );
}

function MetaBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-50/10 bg-stone-900/50 px-4 py-3">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
        {icon}
        {label}
      </p>
      <p className="mt-1 truncate text-[13px] font-bold text-stone-100">
        {value}
      </p>
    </div>
  );
}