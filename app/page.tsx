import Link from "next/link";
import Hero from "@/components/home/Hero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SimulatorCard from "@/components/simulateurs/SimulatorCard";
import RessourcesTeaser from "@/components/home/RessourcesTeaser";
import Button from "@/components/ui/Button";
import { simulateurs } from "@/lib/simulateurs/catalogue";

const apercu = simulateurs.filter((s) =>
  ["Assurance Vie", "Comparateur de contrats", "Une pierre deux coups"].includes(s.title)
);

const habilitations = [
  "Immatriculé ORIAS n°25004012",
  "Mandataire d'intermédiaire en assurance et en opérations de banque",
  "Agent lié de prestataire de services d'investissement",
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="simulateurs" className="px-[6vw] py-[120px]">
        <RevealOnScroll className="mb-14 max-w-[640px]">
          <p className="eyebrow">Outils de simulation</p>
          <h2 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
            Visualisez l&apos;impact de chaque stratégie pour en comprendre tout l&apos;intérêt
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5.5 [@media(min-width:900px)]:grid-cols-3">
          {apercu.map((sim, i) => (
            <RevealOnScroll key={sim.title} delay={i * 0.1}>
              <SimulatorCard {...sim} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-10">
          <Link
            href="/simulateurs"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-gold"
          >
            Voir tous les simulateurs →
          </Link>
        </RevealOnScroll>
      </section>

      <section className="px-[6vw] pb-[120px]">
        <RevealOnScroll className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[18px] border border-line bg-cream-card px-8 py-8 text-center text-[13px] text-text-muted">
          {habilitations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </RevealOnScroll>
      </section>

      <section id="ressources" className="px-[6vw] pb-[120px]">
        <RessourcesTeaser />
      </section>

      <section className="px-[6vw] pb-[140px] text-center">
        <RevealOnScroll>
          <p className="eyebrow">Prochaine étape</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[720px] text-[clamp(30px,4vw,52px)] leading-[1.2] font-[450] text-ink">
            Un rendez-vous découverte pour clarifier votre situation patrimoniale et construire, ensemble, votre
            stratégie.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2} className="mt-7.5 flex justify-center">
          <Button href="/rdv" variant="primary">
            Prendre rendez-vous →
          </Button>
        </RevealOnScroll>
      </section>
    </>
  );
}
