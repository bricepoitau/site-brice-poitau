import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-line bg-cream-card">
            <Image
              src="/images/brice-poitau.jpg"
              alt="Brice Poitau"
              fill
              className="object-cover"
              sizes="280px"
              priority
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-[450] text-ink">Parcours</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              Ingénieur et rugbyman de haut niveau, j&apos;ai grandi dans l&apos;exigence d&apos;un double parcours.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              C&apos;est cette exigence qui structure aujourd&apos;hui ma façon de conseiller : rigueur dans
              l&apos;analyse, disponibilité dans l&apos;accompagnement.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
              C&apos;est pour cette raison que j&apos;exerce en indépendance : pour garder la liberté de
              recommander ce qui sert vraiment mes clients, et construire avec chacun d&apos;eux une relation de
              proximité, dans la durée.
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
            <a
              href="https://www.finzzle-groupe.com/finzzact-philanthropie/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-[13px] font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(169,132,63,0.55)] transition-[background-color,color,gap] duration-300 ease-out hover:gap-3 hover:bg-ink hover:text-white"
            >
              Découvrir FinzzAct →
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
