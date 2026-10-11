"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { SERVICE_OPTIONS } from "@/lib/data";

const PILLARS = [
  {
    step: "01",
    title: "Sourcing",
    subtitle: "Trouver le bon fournisseur",
    description:
      "Nous épluchons 1688, Alibaba, Taobao et les marchés physiques de Guangzhou et Yiwu pour dénicher le meilleur rapport qualité/prix.",
  },
  {
    step: "02",
    title: "Contrôle Qualité",
    subtitle: "Vérifier avant d'expédier",
    description:
      "Chaque lot est inspecté dans nos entrepôts. Photos, vidéos et rapport détaillé vous sont transmis avant le chargement.",
  },
  {
    step: "03",
    title: "Expédition & Dédouanement",
    subtitle: "Livrer en toute sérénité",
    description:
      "Fret maritime (FCL/LCL) ou aérien, documents export conformes, dédouanement à Matadi / Kinshasa et livraison door-to-door.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-stone-50 pb-40 pt-24 md:pb-52 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
      <div className="pointer-events-none absolute -right-32 top-32 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />

      <div className="nbt-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="nbt-eyebrow">
            <ShieldCheck className="h-3 w-3" />
            Nos services &amp; garanties
          </span>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-[2.75rem]">
            Trois piliers,
            <span className="text-amber-800"> une chaîne maîtrisée</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            De la recherche du fournisseur jusqu&apos;à la remise de la
            marchandise dans votre entrepôt, nous gardons le contrôle à chaque
            étape.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const service = SERVICE_OPTIONS[i];
            const Icon = service.icon;

            return (
              <motion.article
                key={pillar.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-amber-900/10 bg-white/85 p-7 shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-600/30 hover:shadow-soft-lg md:p-8"
              >
                <span className="pointer-events-none absolute -right-3 -top-6 font-display text-[7rem] font-black leading-none text-amber-900/[0.05] transition-colors duration-500 group-hover:text-amber-700/[0.09]">
                  {pillar.step}
                </span>

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-900/20 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-amber-50" />
                </span>

                <div className="relative mt-6 flex-1">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-amber-700">
                    {pillar.subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-stone-600">
                    {pillar.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-amber-900/10 pt-5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[13px] font-medium text-stone-700"
                      >
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15">
                          <Check className="h-2.5 w-2.5 text-emerald-600" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#sourcing"
                  className="relative mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-amber-800 transition-colors hover:text-amber-900"
                >
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-amber-900/10 bg-stone-900 p-7 shadow-soft-lg md:p-9"
        >
          <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-50" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-stone-50 sm:text-xl">
                  Garantie NGIMBI : Fiabilité, Sécurité, Rapidité
                </h3>
                <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-stone-400">
                  Chaque dossier est suivi de bout en bout, avec traçabilité
                  photo/vidéo, documents conformes et devis détaillé sans frais
                  cachés.
                </p>
              </div>
            </div>

            <a href="#sourcing" className="nbt-btn-primary shrink-0">
              Démarrer mon projet
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <SectionDivider variant="slant" className="text-stone-900" />
    </section>
  );
}