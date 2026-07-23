import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import IframeEmbed from "@/components/simulateurs/IframeEmbed";

export const metadata: Metadata = {
  title: "Une pierre deux coups — SCPI à crédit",
  description: "Mesurer l'effet de levier du crédit sur un investissement SCPI à crédit.",
};

export default function UnePierreDeuxCoupsPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-10 max-w-[640px]">
        <p className="eyebrow">SCPI & crédit</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Une pierre deux coups
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Mesurez l&apos;effet de levier du crédit sur un investissement SCPI à crédit combiné à un investissement
          SCPI au comptant.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <IframeEmbed src="/simulateurs/une-pierre-deux-coups.html" title="Simulateur une pierre deux coups" height={1600} />
      </RevealOnScroll>

      <p className="mx-auto mt-10 max-w-[720px] text-center text-xs leading-relaxed text-text-muted">
        Simulation à titre pédagogique, hors fiscalité et hors aléas de marché. Les performances passées ne
        préjugent pas des performances futures. Ne constitue pas un conseil en investissement personnalisé.
      </p>
    </section>
  );
}
