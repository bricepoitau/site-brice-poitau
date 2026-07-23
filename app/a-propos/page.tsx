import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "À propos",
  description: "Parcours et philosophie de conseil de Brice Poitau, ingénieur patrimonial.",
};

export default function AProposPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="max-w-[720px]">
        <p className="eyebrow">À propos</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Brice Poitau
        </h1>
      </RevealOnScroll>

      <div className="mt-14 grid grid-cols-1 gap-12 [@media(min-width:900px)]:grid-cols-[280px_1fr]">
        <RevealOnScroll delay={0.1}>
          <div className="flex aspect-[4/5] items-center justify-center rounded-[18px] border border-dashed border-line bg-cream-card text-center text-sm text-text-muted">
            [Photo à compléter par le client]
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-[450] text-ink">Parcours</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              [À COMPLÉTER PAR LE CLIENT — parcours professionnel, formation, expériences]
            </p>
          </div>
          <div>
            <h2 className="text-lg font-[450] text-ink">Philosophie de conseil</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              [À COMPLÉTER PAR LE CLIENT — vision de l&apos;accompagnement patrimonial, valeurs, méthode]
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
