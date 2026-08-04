import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ScpiSimulator from "@/components/simulateurs/scpi/ScpiSimulator";

export const metadata: Metadata = {
  title: "Simulateur SCPI",
  description: "Estimer les revenus locatifs potentiels et le rendement net d'une stratégie SCPI.",
};

export default function ScpiPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-12 max-w-[640px]">
        <p className="eyebrow">Immobilier & revenus</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Simulateur SCPI
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Ajustez le versement initial, les versements programmés et l&apos;horizon pour visualiser la
          constitution de votre patrimoine SCPI et le loyer viager qui en découle.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <ScpiSimulator />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Simulation à titre pédagogique, hors fiscalité et hors aléas de marché. Le taux de distribution n&apos;est
        pas garanti et les performances passées ne préjugent pas des performances futures. Ne constitue pas un
        conseil en investissement personnalisé.
      </p>
    </section>
  );
}
