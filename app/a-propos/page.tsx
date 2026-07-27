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
              J&apos;ai mené mes études d&apos;ingénieur en parallèle d&apos;une carrière de sportif de haut niveau.
              Les contingences propres à cette double vie m&apos;ont poussé à chercher, pour la suite, un métier
              porteur de sens — un métier où je pourrais être réellement utile, et où je pourrais construire une
              hyper-expertise plutôt que de rester en surface. J&apos;avais appris à réfléchir avec rigueur. Il me
              restait à monter ma propre structure, pour exercer ce métier à ma manière.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-[450] text-ink">Philosophie de conseil</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              Je me distingue par mon sens du conseil, mon expertise, et ma manière indépendante de le délivrer —
              en architecture ouverte, sans être lié à un produit ou un assureur en particulier. Cette
              indépendance, je la mets au service de la pédagogie : expliquer avant de recommander, pour que
              chaque décision soit comprise, et non simplement suivie.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-[450] text-ink">Formation &amp; engagement</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              Ingénieur diplômé de l&apos;ENSMAC. Mécène du programme FinzzAct, je reverse une partie de ma
              rémunération à la Fondation Epic, qui sélectionne et soutient des associations engagées pour
              l&apos;enfance, la jeunesse et l&apos;environnement.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
