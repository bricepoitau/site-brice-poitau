import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PrelevementSourceSimulator from "@/components/simulateurs/prelevement-source/PrelevementSourceSimulator";

export const metadata: Metadata = {
  title: "Simulateur Prélèvement à la source",
  description:
    "Estimez votre taux de prélèvement à la source et le montant retenu chaque mois, selon votre situation familiale et vos revenus.",
};

export default function PrelevementSourcePage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-12 max-w-[640px]">
        <p className="eyebrow">Fiscalité</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Prélèvement à la source 2026
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Estimez votre taux de prélèvement à la source et le montant retenu chaque mois, à partir du barème de
          l&apos;impôt sur les revenus 2025 (imposition 2026), du nombre de parts et de votre situation familiale.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <PrelevementSourceSimulator />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Simulation indicative basée sur le barème 2026 (revenus 2025), hors réductions et crédits d&apos;impôt,
        hors cas particuliers. À confirmer avec votre avis d&apos;imposition ou le simulateur officiel
        impots.gouv.fr. Ne constitue pas un conseil fiscal personnalisé.
      </p>
    </section>
  );
}
