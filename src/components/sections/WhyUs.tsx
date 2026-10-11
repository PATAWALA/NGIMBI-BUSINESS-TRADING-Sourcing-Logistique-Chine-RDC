"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { STATS, EXTRA_STATS } from "@/lib/data";
import type { StatItem } from "@/types";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-stone-900/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-500/40 md:p-7"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-amber-500/25 bg-amber-500/10">
        <Icon className="h-5 w-5 text-amber-400" />
      </span>

      <p className="relative mt-6 font-display text-4xl font-black leading-none tracking-tight text-stone-50 sm:text-[2.75rem]">
        <AnimatedCounter
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
        />
      </p>

      <p className="relative mt-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-amber-400">
        {stat.label}
      </p>

      <p className="relative mt-3 text-[13.5px] leading-relaxed text-stone-400">
        {stat.description}
      </p>
    </motion.article>
  );
}

export default function WhyUs() {
  return (
    <section
      id="pourquoi-nous"
      className="relative scroll-mt-24 overflow-hidden bg-stone-900 pb-40 pt-24 md:pb-52 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-amber-600/15 blur-[130px]" />

      <div className="nbt-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">
            <Sparkles className="h-3 w-3" />
            Pourquoi nous choisir
          </span>
          <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-stone-50 sm:text-4xl lg:text-[2.75rem]">
            Des chiffres qui parlent
            <span className="block text-amber-500">mieux que des promesses</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
            Présence réelle sur le terrain en Chine, communication transparente
            et engagement total sur chaque expédition.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-gradient-to-br from-amber-900/30 to-stone-900/40 backdrop-blur-sm"
        >
          <div className="grid divide-y divide-stone-50/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {EXTRA_STATS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-stone-50/10 p-6 md:border-l md:p-7 [&:first-child]:md:border-l-0"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500/10">
                    <Icon className="h-4 w-4 text-amber-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-extrabold leading-none text-stone-50">
                      <AnimatedCounter value={item.value} suffix={item.suffix} />
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-semibold uppercase tracking-wider text-stone-400">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Présence physique",
              body: "Nos équipes sont installées à Guangzhou et Yiwu. Nous voyons les usines, nous touchons les produits, nous négocions en direct.",
            },
            {
              title: "Communication transparente",
              body: "Photos et vidéos à chaque étape clé. Rapports de contrôle qualité. Devis détaillé poste par poste.",
            },
            {
              title: "Responsabilité totale",
              body: "De la commande à la remise finale, un seul interlocuteur gère votre dossier. Aucun maillon abandonné.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="rounded-2xl border border-stone-50/10 bg-stone-50/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-amber-500/30 hover:bg-amber-500/[0.04]"
            >
              <h3 className="font-display text-[15px] font-extrabold text-stone-100">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-stone-400">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <SectionDivider variant="slant" flip className="text-stone-900" />
    </section>
  );
}