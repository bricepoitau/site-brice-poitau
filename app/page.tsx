import Link from "next/link";
import Hero from "@/components/home/Hero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SimulatorCard from "@/components/simulateurs/SimulatorCard";
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
            Visualisez l&apos;impact de chaque stratégie avant de vous engager
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
        <RevealOnScroll className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl bg-ink p-9 text-[#EDE7D9] [@media(min-width:900px)]:grid-cols-2 [@media(min-width:900px)]:p-[60px]">
          <div>
            <p className="eyebrow text-gold-soft">Ressources</p>
            <h2 className="mt-3 text-2xl font-[450] text-white [@media(min-width:900px)]:text-[32px]">
              Une éducation financière gratuite, sans jargon
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#C7C1B0]">
              Des guides pédagogiques rédigés pour comprendre — pas pour vendre. Fiscalité, transmission,
              placements : de quoi prendre des décisions éclairées avant même votre premier rendez-vous.
            </p>
            <Link
              href="/ressources"
              className="mt-6.5 inline-flex w-fit items-center gap-2 rounded-full bg-gold-soft px-5 py-3 text-[13px] font-medium text-ink transition-[gap] duration-300 hover:gap-3"
            >
              Explorer les ressources →
            </Link>
          </div>
          <div className="flex flex-col">
            {["Nos partenaires & habilitations", "Diplômes & certifications"].map((item, i) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-white/10 py-5 transition-[padding] duration-300 hover:pl-2.5"
              >
                <span className="font-serif text-[13px] text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[15px] text-[#EDE7D9]">{item}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <section className="px-[6vw] pb-[140px] text-center">
        <RevealOnScroll>
          <p className="eyebrow">Prochaine étape</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-[720px] text-[clamp(30px,4vw,52px)] leading-[1.2] font-[450] text-ink">
            Un premier échange, sans engagement, pour clarifier votre situation patrimoniale.
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
