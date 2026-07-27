import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AcheterLouerSimulator from "@/components/simulateurs/acheter-louer/AcheterLouerSimulator";

export const metadata: Metadata = {
  title: "Acheter ou louer",
  description: "Arbitrer entre acquisition et location selon votre horizon et votre capacité d'épargne.",
};

export default function AcheterLouerPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-10 max-w-[640px]">
        <p className="eyebrow">Immobilier & arbitrage</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Acheter ou louer
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Arbitrez entre acquisition et location selon votre horizon et votre capacité d&apos;épargne, dans les 10
          plus grandes villes françaises.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <AcheterLouerSimulator />
      </RevealOnScroll>
    </section>
  );
}
