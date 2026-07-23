import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import IframeEmbed from "@/components/simulateurs/IframeEmbed";

export const metadata: Metadata = {
  title: "Comparateur de contrats",
  description: "Comparer plusieurs contrats d'assurance vie sur la base des frais réels et de leur impact sur la performance long terme.",
};

export default function ComparateurContratsPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-10 max-w-[640px]">
        <p className="eyebrow">Frais & contrats</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Comparateur de contrats
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Comparez plusieurs contrats sur la base des frais réels et de leur impact sur la performance à long
          terme.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <IframeEmbed src="/simulateurs/comparateur-contrats.html" title="Simulateur comparateur de contrats" />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Simulation à titre pédagogique, hors fiscalité et hors aléas de marché. Les performances passées ne
        préjugent pas des performances futures. Ne constitue pas un conseil en investissement personnalisé.
      </p>
    </section>
  );
}
