"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Sparkles, Tag } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { PRODUCTS, PREFILL_EVENT } from "@/lib/data";
import type { PrefillDetail } from "@/types";

export default function ProductCatalog() {
  function requestQuote(name: string, category: string) {
    const detail: PrefillDetail = {
      service: "sourcing",
      product: `Je souhaite importer : ${name} (catégorie : ${category}).`,
      category,
    };

    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    document
      .getElementById("sourcing")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="catalogue"
      className="relative scroll-mt-24 overflow-hidden bg-amber-950 pb-40 pt-24 md:pb-52 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />

      <div className="nbt-container relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">
              <Sparkles className="h-3 w-3" />
              Catalogue phares
            </span>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-stone-50 sm:text-4xl lg:text-[2.75rem]">
              Ce que nous acheminons
              <span className="block text-amber-500">le plus souvent</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
              Délais indicatifs depuis Guangzhou / Yiwu jusqu&apos;à Kinshasa,
              Lubumbashi ou Goma. Chaque projet fait l&apos;objet d&apos;une
              cotation personnalisée.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Groupage disponible
            </p>
            <p className="mt-1 font-display text-sm font-extrabold text-stone-100">
              Partagez un conteneur, réduisez vos coûts
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-amber-500/15 bg-stone-900/60 shadow-soft-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/25 to-transparent" />

                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-stone-950/70 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
                    <Icon className="h-3 w-3" />
                    {product.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-display text-[17px] font-extrabold leading-snug text-stone-50">
                    {product.name}
                  </h3>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {product.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-stone-50/5 px-2.5 py-1 text-[10.5px] font-semibold text-stone-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-5 space-y-2 border-t border-stone-50/10 pt-4 text-[12.5px]">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <dt className="sr-only">Délai</dt>
                      <dd>{product.delay}</dd>
                    </div>
                    <div className="flex items-center gap-2 text-stone-400">
                      <Tag className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <dt className="sr-only">Prix</dt>
                      <dd>{product.priceHint}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => requestQuote(product.name, product.category)}
                    className="group/btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-[13px] font-bold text-amber-300 transition-all duration-300 hover:border-amber-500/60 hover:bg-amber-500 hover:text-stone-950"
                  >
                    Demander une cotation
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-amber-500/20 bg-gradient-to-br from-amber-900/40 to-stone-900/40 p-7 backdrop-blur-sm md:p-9">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-xl font-extrabold text-stone-50 sm:text-2xl">
                Votre produit n&apos;est pas dans la liste&nbsp;?
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-stone-400">
                Nous sourçons absolument tout : de la pièce industrielle
                sur-mesure au conteneur complet de marchandises générales.
                Envoyez-nous simplement un lien ou une photo.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                requestQuote("Produit hors catalogue", "Sourcing personnalisé")
              }
              className="nbt-btn-primary shrink-0"
            >
              Décrire mon produit
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <SectionDivider variant="zigzag" className="text-stone-50" />
    </section>
  );
}