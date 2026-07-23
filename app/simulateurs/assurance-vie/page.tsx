import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AssuranceVieSimulator from "@/components/simulateurs/assurance-vie/AssuranceVieSimulator";

export const metadata: Metadata = {
  title: "Simulateur Assurance Vie",
  description:
    "Projetez l'encours, les versements et la puissance des intérêts composés de votre contrat d'assurance vie dans le temps.",
};

export default function AssuranceViePage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-12 max-w-[640px]">
        <p className="eyebrow">Épargne & capitalisation</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Simulateur Assurance Vie
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Ajustez le capital initial, les versements et l&apos;horizon de placement pour visualiser la trajectoire
          de votre épargne et l&apos;effet des intérêts composés.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <AssuranceVieSimulator />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Simulation à titre pédagogique, hors fiscalité et hors aléas de marché. Les performances passées ne
        préjugent pas des performances futures. Ne constitue pas un conseil en investissement personnalisé.
      </p>
    </section>
  );
}
