"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Simulateurs", href: "/simulateurs" },
  { label: "Ressources", href: "/ressources" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line bg-cream/75 px-[6vw] py-[22px] backdrop-blur-md">
      <Link href="/" className="font-serif text-xl font-semibold tracking-[.01em] text-ink">
        Brice Poitau <span className="text-gold">Conseils</span>
      </Link>

      <nav className="hidden [@media(min-width:900px)]:block">
        <ul className="flex gap-[34px] text-sm text-ink-soft">
          {navItems.map((item) => (
            <li key={item.href} className="group relative">
              <Link href={item.href}>{item.label}</Link>
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-[width] duration-300 ease-out group-hover:w-full" />
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden [@media(min-width:900px)]:block">
        <Button href="/rdv" variant="pill">
          Prendre RDV →
        </Button>
      </div>

      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col gap-1.5 [@media(min-width:900px)]:hidden"
      >
        <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
        <span className={`h-px w-6 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-6 border-b border-line bg-cream px-[6vw] py-8 [@media(min-width:900px)]:hidden">
          <ul className="flex flex-col gap-5 text-base text-ink-soft">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/rdv" variant="pill" className="w-fit">
            Prendre RDV →
          </Button>
        </div>
      )}
    </header>
  );
}
