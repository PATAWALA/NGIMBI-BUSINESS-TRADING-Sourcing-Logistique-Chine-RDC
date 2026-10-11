"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Plane, Ship, X } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-amber-900/10 bg-stone-50/85 py-2 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent py-4",
        )}
      >
        <nav className="nbt-container flex items-center justify-between gap-4">
          <a href="#accueil" className="group flex shrink-0 items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-900/25 transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-lg font-black text-amber-50">
                N
              </span>
              <span className="absolute -bottom-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-stone-50 bg-stone-900">
                <Ship className="h-2.5 w-2.5 text-amber-400" />
              </span>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-extrabold tracking-tight text-stone-900">
                NGIMBI
              </span>
              <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.2em] text-amber-700">
                Business Trading
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-amber-900/10 bg-white/60 px-2 py-1.5 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative block rounded-full px-3.5 py-2 text-[13px] font-semibold text-stone-600 transition-colors hover:bg-amber-500/10 hover:text-amber-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-900/15 bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold text-amber-800 xl:inline-flex">
              🇨🇳 <Plane className="h-3 w-3" /> 🇨🇩
            </span>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nbt-btn-primary hidden !px-5 !py-2.5 !text-[13px] sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Ouvrir le menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-amber-900/15 bg-white/70 text-stone-800 transition-colors hover:bg-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative mx-4 mt-24 overflow-hidden rounded-3xl border border-amber-900/10 bg-stone-50 p-6 shadow-soft-lg"
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
                Navigation
              </p>
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-base font-bold text-stone-800 transition-colors hover:bg-amber-500/10 hover:text-amber-900"
                    >
                      {link.label}
                      <span className="text-amber-600">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nbt-btn-primary mt-5 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Discuter sur WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}