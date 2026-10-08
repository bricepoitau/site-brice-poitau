"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import AnimatedNumber, { eur, eurPerMonth } from "@/components/ui/AnimatedNumber";
import { VASE_MAX, type VasesParams, type VasesResult } from "@/lib/simulateurs/vasesCommunicants";

interface VasesDiagramProps {
  params: VasesParams;
  result: VasesResult;
}

const EASE = [0.19, 1, 0.22, 1] as const;

/** Un "vase" : le niveau de liquide monte (ressort) selon le montant versé. */
function Vase({
  className,
  label,
  sublabel,
  amount,
  hint,
  level,
  delay,
}: {
  className: string;
  label: string;
  sublabel: string;
  amount: ReactNode;
  hint: ReactNode;
  level: number;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const pct = Math.round(Math.max(0.14, Math.min(1, level)) * 100);

  return (
    <motion.div
      ref={ref}
      className={`${className} relative min-h-[158px] overflow-hidden rounded-[18px] border border-ink/25 bg-white/50`}
      initial={reduce ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {/* Liquide */}
      <motion.div
        className="absolute inset-x-0 bottom-0 border-t-2 border-gold/60 bg-gradient-to-b from-gold-soft/45 to-gold/20"
        initial={reduce ? false : { height: "0%" }}
        animate={{ height: reduce || inView ? `${pct}%` : "0%" }}
        transition={{ type: "spring", stiffness: 70, damping: 18, delay: delay + 0.15 }}
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-x-0 -top-1 h-2 bg-gold-soft/50 blur-[3px]"
            animate={{ opacity: [0.35, 0.8, 0.35], y: [0, -1.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div>
          <p className="font-sans text-[15px] font-semibold text-ink">{label}</p>
          <p className="text-[11.5px] text-text-muted">{sublabel}</p>
        </div>
        <div>
          <p className="mt-6 font-serif text-xl font-[450] text-ink">{amount}</p>
          <p className="mt-0.5 text-xs text-ink-soft">{hint}</p>
        </div>
      </div>
    </motion.div>
  );
}

/** Flux animé entre deux blocs : un trait qui se dessine puis des billes qui circulent. */
function Connector({ label, vertical = false, delay = 0 }: { label: string; vertical?: boolean; delay?: number }) {
  const reduce = useReducedMotion();

  if (vertical) {
    return (
      <div className="relative flex h-[68px] items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-1/2 w-0.5 origin-top -translate-x-1/2 bg-gold/60"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay }}
        />
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(169,132,63,0.7)]"
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: delay + i * 1.1 }}
            />
          ))}
        <span className="relative z-10 rounded-full border border-gold/40 bg-cream px-3 py-1 text-[11px] font-semibold text-gold">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[64px] items-center justify-center px-2">
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-gold/60"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
      <span aria-hidden className="absolute top-1/2 right-0 -translate-y-1/2 text-sm leading-none text-gold">
        ▸
      </span>
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_rgba(169,132,63,0.7)]"
            animate={{ left: ["0%", "96%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: delay + i * 0.8 }}
          />
        ))}
      <span className="relative z-10 rounded-full border border-gold/40 bg-cream px-3 py-1 text-center text-[11px] leading-tight font-semibold text-gold">
        {label}
      </span>
    </div>
  );
}

export default function VasesDiagram({ params, result }: VasesDiagramProps) {
  // Changer la clé relance toutes les animations (bouton « Rejouer »).
  const [run, setRun] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-6 [@media(min-width:900px)]:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl font-[450] text-ink">Le circuit : d&apos;où vient l&apos;effort, où il revient</h2>
        <motion.button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          whileTap={{ scale: 0.95, rotate: -4 }}
          className="rounded-full border border-gold px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-gold hover:text-ink"
        >
          ↻ Rejouer l&apos;animation
        </motion.button>
      </div>

      <div key={run} className="vases-grid">
        <Vase
          className="vg-per"
          label="PER"
          sublabel="plan d'épargne retraite"
          level={result.totalPerAnnee1 / VASE_MAX.per}
          delay={0}
          amount={
            <>
              <AnimatedNumber value={params.perInitial} format={eur} />
              {params.perProgramme > 0 && (
                <span className="text-sm text-text-muted"> + {eurPerMonth(params.perProgramme)}</span>
              )}
            </>
          }
          hint={
            <>
              économie d&apos;impôt ≈ <AnimatedNumber value={result.economieImpotMensuelle} format={eurPerMonth} />
            </>
          }
        />

        <Vase
          className="vg-scpi"
          label="SCPI"
          sublabel="rendement distribué"
          level={result.capitalScpiAnnee1 / VASE_MAX.scpi}
          delay={0.12}
          amount={
            <>
              <AnimatedNumber value={params.scpiInitial} format={eur} />
              {params.scpiProgramme > 0 && (
                <span className="text-sm text-text-muted"> + {eurPerMonth(params.scpiProgramme)}</span>
              )}
            </>
          }
          hint={
            <>
              revenu ≈ <AnimatedNumber value={result.revenuScpiMensuel} format={eurPerMonth} />
            </>
          }
        />

        {/* Mobile : un seul flux pour les deux retours ; desktop : un flux par vase */}
        <div className="vg-c12 [@media(min-width:900px)]:hidden">
          <Connector vertical label="économie d'impôt + revenus réinjectés" delay={0.3} />
        </div>
        <div className="vg-c1">
          <Connector label="économie d'impôt" delay={0.3} />
        </div>
        <div className="vg-c2">
          <Connector label="revenus réinjectés" delay={0.45} />
        </div>

        {/* Résultat : effort réel */}
        <motion.div
          className="vg-eff relative overflow-hidden rounded-[18px] border border-ink bg-ink p-6 text-white [@media(min-width:900px)]:p-8"
          initial={reduce ? false : { opacity: 0, x: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        >
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-14 -right-14 h-52 w-52 rounded-full border border-gold-soft/30"
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <p className="eyebrow text-gold-soft">Effort réel</p>
          <p className="mt-2 text-[13px] text-[#C7C1B0]">
            Ce qu&apos;il en coûte vraiment, pour un effort apparent de{" "}
            <b className="text-white">
              <AnimatedNumber value={result.effortApparent} format={eurPerMonth} />
            </b>
          </p>

          <p className="mt-7 text-xs text-[#C7C1B0]">Année 1</p>
          <p className="font-serif text-4xl font-[450] text-gold-soft [@media(min-width:900px)]:text-5xl">
            <AnimatedNumber value={result.effortReelAnnee1} format={eurPerMonth} />
          </p>

          <div className="my-5 h-px bg-white/15" />

          <p className="text-xs text-[#C7C1B0]">En régime (après l&apos;année 1)</p>
          <p className="font-serif text-3xl font-[450] text-white">
            <AnimatedNumber value={result.effortRegime} format={eurPerMonth} />
          </p>

          <p className="mt-6 text-xs leading-relaxed text-[#C7C1B0]">
            L&apos;effort apparent est remboursé en retour par l&apos;économie d&apos;impôt du PER et les revenus de la
            SCPI.
          </p>
        </motion.div>

        <Vase
          className="vg-av"
          label="Assurance-vie"
          sublabel="poche de rentabilité"
          level={result.avVerseAnnee1 / VASE_MAX.av}
          delay={0.24}
          amount={
            <>
              <AnimatedNumber value={params.avInitial} format={eur} />
              {params.avProgramme > 0 && (
                <span className="text-sm text-text-muted"> + {eurPerMonth(params.avProgramme)}</span>
              )}
            </>
          }
          hint="capitalise dans le temps"
        />

        <div className="vg-c3">
          <div className="[@media(min-width:900px)]:hidden">
            <Connector vertical label="capitalise" delay={0.55} />
          </div>
          <div className="hidden h-full [@media(min-width:900px)]:block">
            <Connector label="capitalise" delay={0.55} />
          </div>
        </div>

        <motion.div
          className="vg-avc flex flex-col justify-center rounded-[18px] border border-ink/25 bg-white/50 p-6"
          initial={reduce ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          <p className="text-[15px] font-semibold text-ink">Capital assurance-vie projeté</p>
          <p className="text-[11.5px] text-text-muted">
            à {params.horizon} an{params.horizon > 1 ? "s" : ""}
          </p>
          <p className="mt-3 font-serif text-3xl font-[450] text-ink">
            <AnimatedNumber value={result.capitalAvHorizon} format={eur} />
          </p>
          <p className="mt-1 text-xs text-ink-soft">vs {eur(result.avVerseTotal)} versés</p>
        </motion.div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-text-muted">
        Lecture : les versements remplissent chaque véhicule ; l&apos;économie d&apos;impôt du PER et les revenus
        distribués par la SCPI reviennent remplir le vase « effort réel » (flux dorés) — c&apos;est ce retour qui
        transforme l&apos;effort apparent. L&apos;assurance-vie, elle, capitalise dans le temps.
      </p>
    </div>
  );
}
