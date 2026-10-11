"use client";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ship,
} from "lucide-react";
import {
  BRAND,
  COVERAGE,
  EMAIL,
  NAV_LINKS,
  PHONE_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-stone-900 pb-10 pt-20 text-stone-400 md:pt-28">
      <div className="pointer-events-none absolute inset-0 grid-pattern-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-amber-600/10 blur-[130px]" />

      <div className="nbt-container relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <a href="#accueil" className="group flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-900/30 transition-transform duration-300 group-hover:scale-105">
                <span className="font-display text-lg font-black text-amber-50">
                  N
                </span>
                <span className="absolute -bottom-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-stone-900 bg-amber-500">
                  <Ship className="h-2.5 w-2.5 text-stone-900" />
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-display text-[15px] font-extrabold tracking-tight text-stone-50">
                  NGIMBI
                </span>
                <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-500">
                  Business Trading
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed">
              {BRAND.slogan}
            </p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-[11px] font-bold text-amber-400">
              🇨🇳 Chine ➡️ 🇨🇩 RDC &amp; Afrique
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nbt-btn-primary mt-6 !px-5 !py-2.5 !text-[13px]"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter sur WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              Navigation
            </h3>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors hover:text-amber-400"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              Villes couvertes
            </h3>

            <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              🇨🇳 Chine
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {COVERAGE.china.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-stone-50/10 bg-stone-50/5 px-2.5 py-1 text-[11px] font-semibold text-stone-300"
                >
                  {city}
                </li>
              ))}
            </ul>

            <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500">
              🌍 Afrique
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {COVERAGE.africa.map((city) => (
                <li
                  key={city}
                  className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300"
                >
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              Contact
            </h3>

            <ul className="mt-5 space-y-4 text-[13.5px]">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-amber-400"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500/10">
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block font-semibold text-stone-200 group-hover:text-amber-400">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 transition-colors hover:text-amber-400"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-500/10">
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Téléphone
                    </span>
                    <span className="mt-0.5 block font-semibold text-stone-200 group-hover:text-amber-400">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-start gap-3 transition-colors hover:text-amber-400"
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-stone-50/5">
                    <Mail className="h-3.5 w-3.5 text-stone-300" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Email
                    </span>
                    <span className="mt-0.5 block font-semibold text-stone-200 group-hover:text-amber-400">
                      {EMAIL}
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-stone-50/5">
                  <MapPin className="h-3.5 w-3.5 text-stone-300" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Bureaux
                  </span>
                  <span className="mt-0.5 block font-semibold text-stone-200">
                    Guangzhou · Yiwu (Chine)
                  </span>
                  <span className="block font-semibold text-stone-200">
                    Kinshasa · Lubumbashi (RDC)
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-50/10 pt-8 sm:flex-row">
          <p className="text-center text-[12px] text-stone-500 sm:text-left">
            © {year}{" "}
            <span className="font-bold text-stone-400">{BRAND.name}</span>. Tous
            droits réservés.
          </p>

          <p className="text-center text-[12px] text-stone-500 sm:text-right">
            Fiabilité · Sécurité · Rapidité —{" "}
            <span className="font-semibold text-amber-500">
              Chine ➡️ RDC &amp; Afrique
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}