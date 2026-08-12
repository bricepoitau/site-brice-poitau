import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PerSimulator from "@/components/simulateurs/per/PerSimulator";

export const metadata: Metadata = {
  title: "Simulateur PER — Gain fiscal",
  description:
    "Estimez votre économie d'impôt grâce au Plan d'Épargne Retraite : impôt avant/après versement, changement de tranche, exemples chiffrés.",
};

export default function PerPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-12 max-w-[640px]">
        <p className="eyebrow">Retraite & fiscalité</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Simulateur PER — Gain fiscal
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Estimez l&apos;économie d&apos;impôt générée par un versement sur votre Plan d&apos;Épargne Retraite,
          selon votre revenu, votre situation familiale et le plafond de déduction disponible.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <PerSimulator />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Barème IR 2026 (revenus 2025) — calcul indicatif, hors décote et contributions exceptionnelles. Ne
        constitue pas un conseil fiscal personnalisé. Les sommes versées sur un PER sont bloquées jusqu&apos;à la
        retraite, sauf cas de déblocage anticipé prévus par la loi.
      </p>
    </section>
  );
}
