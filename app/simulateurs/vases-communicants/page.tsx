import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import VasesSimulator from "@/components/simulateurs/vases-communicants/VasesSimulator";

export const metadata: Metadata = {
  title: "Les vases communicants — PER, SCPI, assurance-vie",
  description:
    "Visualisez comment l'économie d'impôt du PER et les revenus de la SCPI reviennent réduire votre effort d'épargne réel, pendant que l'assurance-vie capitalise.",
};

export default function VasesCommunicantsPage() {
  return (
    <section className="relative overflow-hidden px-[6vw] py-[160px]">
      <div aria-hidden className="hero-blueprint" />
      <RevealOnScroll className="relative mb-12 max-w-[700px]">
        <p className="eyebrow">Ingénierie patrimoniale</p>
        <h1 className="mt-2.5 text-[clamp(30px,4vw,48px)] leading-[1.1] font-[450] text-ink">
          Les vases <em className="text-gold">communicants</em>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Un effort d&apos;épargne apparent n&apos;est jamais qu&apos;une façade. Renseignez vos versements PER, SCPI et
          assurance-vie — initiaux et programmés — pour voir comment l&apos;économie d&apos;impôt et les revenus générés
          viennent <b className="text-ink">remplir le même vase</b> que celui dans lequel vous puisez.
        </p>
      </RevealOnScroll>

      <div className="relative">
        <VasesSimulator />
      </div>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Document pédagogique et non contractuel, à visée d&apos;illustration du mécanisme. Les montants calculés ne
        constituent ni une simulation réglementaire ni un engagement de rendement ; ils doivent être recalculés avec vos
        données définitives avant toute mise en œuvre.
      </p>
    </section>
  );
}
