"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  Link2,
  MapPin,
  MessageCircle,
  Package,
  RotateCcw,
  Send,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import {
  DESTINATION_CITIES,
  PREFILL_EVENT,
  SERVICE_OPTIONS,
  whatsappWithText,
} from "@/lib/data";
import type { PrefillDetail, ServiceKey, SourcingFormState } from "@/types";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 3;

const INITIAL_STATE: SourcingFormState = {
  service: "",
  product: "",
  link: "",
  quantity: "",
  budget: "",
  city: "",
  name: "",
  phone: "",
  notes: "",
};

export default function SourcingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SourcingFormState>(INITIAL_STATE);
  const [copied, setCopied] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);

  useEffect(() => {
    function onPrefill(event: Event) {
      const detail = (event as CustomEvent<PrefillDetail>).detail;
      if (!detail) return;

      setForm((prev) => ({
        ...prev,
        service: detail.service ?? prev.service ?? "sourcing",
        product: detail.product ?? prev.product,
        notes: detail.category
          ? `Catégorie souhaitée : ${detail.category}.`
          : prev.notes,
      }));
      setBrief(null);
      setStep(2);
    }

    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  function update<K extends keyof SourcingFormState>(
    key: K,
    value: SourcingFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(form.service);
    if (step === 2)
      return form.product.trim().length > 2 || form.link.trim().length > 5;
    if (step === 3) return Boolean(form.city);
    return false;
  }, [step, form]);

  function next() {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function buildBrief(): string {
    const service = SERVICE_OPTIONS.find((s) => s.id === form.service);

    const lines = [
      "🚀 *NOUVELLE DEMANDE — NGIMBI BUSINESS TRADING*",
      "",
      `👤 *Client :* ${form.name.trim() || "—"}`,
      `📞 *Contact :* ${form.phone.trim() || "—"}`,
      `🧩 *Service :* ${service ? service.title : "—"}`,
      "",
      "📦 *INFORMATIONS PRODUIT*",
      `• Description : ${form.product.trim() || "—"}`,
      `• Lien fournisseur : ${form.link.trim() || "—"}`,
      `• Quantité : ${form.quantity.trim() || "—"}`,
      `• Budget estimé : ${form.budget.trim() || "—"}`,
      "",
      `📍 *DESTINATION :* ${form.city || "—"}`,
    ];

    if (form.notes.trim()) {
      lines.push("", `📝 *Notes :* ${form.notes.trim()}`);
    }

    lines.push(
      "",
      "—",
      "Merci de me transmettre une cotation détaillée :",
      "produit + fret (maritime/aérien) + dédouanement + délai estimé.",
    );

    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      next();
      return;
    }
    setBrief(buildBrief());
  }

  async function copyBrief() {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard indisponible */
    }
  }

  function reset() {
    setForm(INITIAL_STATE);
    setBrief(null);
    setStep(1);
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <section
      id="sourcing"
      className="relative scroll-mt-24 overflow-hidden bg-stone-100 pb-40 pt-24 md:pb-52 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />

      <div className="nbt-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="nbt-eyebrow">
            <Sparkles className="h-3 w-3" />
            Simulateur de sourcing
          </span>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.75rem]">
            Décrivez votre projet,
            <br className="hidden sm:block" /> nous générons votre brief.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            3 étapes, 60 secondes. Collez un lien 1688 / Alibaba, indiquez votre
            quantité et votre ville — votre demande part directement sur
            WhatsApp, prête à être traitée.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-[2rem] border border-amber-900/10 bg-white/90 shadow-soft-lg backdrop-blur-xl">
            <div className="h-1.5 w-full bg-stone-200/70">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-700"
              />
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-amber-900/10 px-6 py-5 md:px-8">
              <div className="flex items-center gap-2 sm:gap-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-black transition-all duration-300",
                        step > n &&
                          "bg-emerald-500 text-white shadow-md shadow-emerald-500/30",
                        step === n &&
                          "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50 shadow-glow",
                        step < n && "bg-stone-200 text-stone-500",
                      )}
                    >
                      {step > n ? <Check className="h-4 w-4" /> : n}
                    </span>
                    {n < 3 && (
                      <span
                        className={cn(
                          "hidden h-px w-8 transition-colors sm:block md:w-14",
                          step > n ? "bg-emerald-500/60" : "bg-stone-200",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                Étape {Math.min(step, TOTAL_STEPS)} / {TOTAL_STEPS}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.32 }}
                  >
                    <FormHeading
                      eyebrow="Étape 1"
                      title="Quel service vous intéresse ?"
                      subtitle="Sélectionnez le pilier qui correspond à votre besoin."
                    />

                    <div className="mt-6 grid gap-3.5">
                      {SERVICE_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const active = form.service === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              update("service", option.id as ServiceKey)
                            }
                            className={cn(
                              "group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                              active
                                ? "border-amber-600/50 bg-amber-500/10 shadow-glow"
                                : "border-amber-900/10 bg-white hover:-translate-y-0.5 hover:border-amber-600/30 hover:shadow-soft",
                            )}
                          >
                            <span
                              className={cn(
                                "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                                active
                                  ? "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50"
                                  : "bg-amber-500/10 text-amber-800",
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2">
                                <span className="font-display text-[15px] font-extrabold text-stone-900">
                                  {option.title}
                                </span>
                              </span>
                              <span className="mt-1 block text-[13px] leading-relaxed text-stone-600">
                                {option.description}
                              </span>
                              <span className="mt-3 flex flex-wrap gap-1.5">
                                {option.points.map((point) => (
                                  <span
                                    key={point}
                                    className="rounded-full bg-stone-900/5 px-2.5 py-1 text-[10.5px] font-semibold text-stone-600"
                                  >
                                    {point}
                                  </span>
                                ))}
                              </span>
                            </span>

                            <span
                              className={cn(
                                "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all",
                                active
                                  ? "border-amber-600 bg-amber-600"
                                  : "border-stone-300 group-hover:border-amber-600/50",
                              )}
                            >
                              {active && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.32 }}
                  >
                    <FormHeading
                      eyebrow="Étape 2"
                      title="Parlez-nous de votre produit"
                      subtitle="Collez un lien 1688, Alibaba, Taobao… ou décrivez simplement le produit."
                    />

                    <div className="mt-6 space-y-5">
                      <div>
                        <label htmlFor="link" className="nbt-label">
                          <span className="inline-flex items-center gap-1.5">
                            <Link2 className="h-3.5 w-3.5 text-amber-700" />
                            Lien fournisseur (optionnel)
                          </span>
                        </label>
                        <input
                          id="link"
                          type="url"
                          value={form.link}
                          onChange={(e) => update("link", e.target.value)}
                          placeholder="https://detail.1688.com/offer/..."
                          className="nbt-input font-mono text-[13px]"
                        />
                        <p className="mt-1.5 text-[11.5px] text-stone-500">
                          💡 Pas de lien ? Décrivez le produit ci-dessous ou
                          envoyez-nous une photo sur WhatsApp.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="product" className="nbt-label">
                          <span className="inline-flex items-center gap-1.5">
                            <Package className="h-3.5 w-3.5 text-amber-700" />
                            Description du produit *
                          </span>
                        </label>
                        <textarea
                          id="product"
                          rows={3}
                          value={form.product}
                          onChange={(e) => update("product", e.target.value)}
                          placeholder="Ex : 500 paires de chaussures de sport homme, tailles 40-45, semelle caoutchouc, marque neutre…"
                          className="nbt-input resize-none"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="quantity" className="nbt-label">
                            <span className="inline-flex items-center gap-1.5">
                              <ClipboardList className="h-3.5 w-3.5 text-amber-700" />
                              Quantité souhaitée
                            </span>
                          </label>
                          <input
                            id="quantity"
                            value={form.quantity}
                            onChange={(e) =>
                              update("quantity", e.target.value)
                            }
                            placeholder="Ex : 500 pièces / 1 conteneur 20'"
                            className="nbt-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="budget" className="nbt-label">
                            <span className="inline-flex items-center gap-1.5">
                              <Wallet className="h-3.5 w-3.5 text-amber-700" />
                              Budget estimé
                            </span>
                          </label>
                          <input
                            id="budget"
                            value={form.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            placeholder="Ex : 8 000 USD (produit + fret)"
                            className="nbt-input"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.32 }}
                  >
                    <FormHeading
                      eyebrow="Étape 3"
                      title="Où devons-nous livrer ?"
                      subtitle="Votre ville de destination et vos coordonnées pour la cotation."
                    />

                    <div className="mt-6 space-y-5">
                      <div>
                        <label htmlFor="city" className="nbt-label">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-amber-700" />
                            Ville de destination *
                          </span>
                        </label>
                        <select
                          id="city"
                          value={form.city}
                          onChange={(e) => update("city", e.target.value)}
                          className="nbt-input appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                          }}
                        >
                          <option value="">— Sélectionnez une ville —</option>
                          {DESTINATION_CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="nbt-label">
                            <span className="inline-flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-amber-700" />
                              Votre nom / entreprise
                            </span>
                          </label>
                          <input
                            id="name"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Ex : Ets Kabila Import"
                            className="nbt-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="nbt-label">
                            <span className="inline-flex items-center gap-1.5">
                              <MessageCircle className="h-3.5 w-3.5 text-amber-700" />
                              Téléphone / WhatsApp
                            </span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+243 8XX XXX XXX"
                            className="nbt-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="notes" className="nbt-label">
                          Notes complémentaires
                        </label>
                        <textarea
                          id="notes"
                          rows={2}
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          placeholder="Ex : besoin avant fin du mois, préférence fret aérien, logo personnalisé…"
                          className="nbt-input resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-amber-900/10 pt-6">
                <button
                  type="button"
                  onClick={prev}
                  disabled={step === 1}
                  className={cn(
                    "nbt-btn-ghost !py-3 !text-[13px]",
                    step === 1 && "pointer-events-none opacity-0",
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="submit"
                    disabled={!canContinue}
                    className={cn(
                      "nbt-btn-primary !py-3 !text-[13px]",
                      !canContinue && "cursor-not-allowed opacity-45",
                    )}
                  >
                    Continuer
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canContinue}
                    className={cn(
                      "nbt-btn-primary !py-3 !text-[13px]",
                      !canContinue && "cursor-not-allowed opacity-45",
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    Générer mon brief
                  </button>
                )}
              </div>
            </form>

            <AnimatePresence>
              {brief && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden border-t border-amber-900/10 bg-gradient-to-br from-amber-950/[0.04] to-transparent"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="inline-flex items-center gap-2 font-display text-lg font-extrabold text-stone-900">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        Votre brief est prêt&nbsp;!
                      </h3>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 text-[12px] font-bold text-stone-500 transition-colors hover:text-amber-800"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Recommencer
                      </button>
                    </div>

                    <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-amber-900/10 bg-stone-900 p-5 font-mono text-[12.5px] leading-relaxed text-stone-300">
                      {brief}
                    </pre>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={whatsappWithText(brief)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nbt-btn-primary"
                      >
                        <Send className="h-4 w-4" />
                        Envoyer sur WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={copyBrief}
                        className="nbt-btn-ghost"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-600" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copier le brief
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <SectionDivider variant="curve" className="text-amber-950" />
    </section>
  );
}

function FormHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-700">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">
        {title}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-stone-600">
        {subtitle}
      </p>
    </div>
  );
}