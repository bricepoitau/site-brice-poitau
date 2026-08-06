import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MonBudgetTool from "@/components/simulateurs/mon-budget/MonBudgetTool";

export const metadata: Metadata = {
  title: "Mon budget mensuel",
  description:
    "Saisissez votre budget manuellement en ligne, ou téléchargez l'outil complet pour importer votre relevé bancaire sur votre ordinateur et visualiser votre reste à vivre.",
};

export default function MonBudgetPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-12 max-w-[640px]">
        <p className="eyebrow">Budget & pilotage</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Mon tableau de charges
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Visualisez votre reste à vivre en saisissant votre budget directement ci-dessous, ou téléchargez
          l&apos;outil complet pour importer et classer automatiquement votre relevé bancaire — <b>sur votre
          ordinateur uniquement</b>, sans jamais transmettre vos données.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <MonBudgetTool />
      </RevealOnScroll>
    </section>
  );
}
