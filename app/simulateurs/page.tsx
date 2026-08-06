import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SimulatorCard from "@/components/simulateurs/SimulatorCard";
import { simulateurs } from "@/lib/simulateurs/catalogue";

export const metadata: Metadata = {
  title: "Simulateurs financiers",
  description:
    "Assurance vie, SCPI, PER, comparateur de contrats, acheter ou louer, SCPI à crédit, prélèvement à la source, budget mensuel : des simulateurs pour visualiser l'impact de chaque stratégie patrimoniale.",
};

export default function SimulateursPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-14 max-w-[640px]">
        <p className="eyebrow">Outils de simulation</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Tous les simulateurs
        </h1>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-5.5 [@media(min-width:900px)]:grid-cols-3">
        {simulateurs.map((sim, i) => (
          <RevealOnScroll key={sim.title} delay={(i % 3) * 0.1}>
            <SimulatorCard {...sim} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
