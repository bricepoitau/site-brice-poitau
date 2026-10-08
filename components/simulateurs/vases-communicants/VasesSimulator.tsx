"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import VasesForm from "./VasesForm";
import VasesDiagram from "./VasesDiagram";
import VasesCta from "./VasesCta";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedNumber, { eur, eurPerMonth } from "@/components/ui/AnimatedNumber";
import { DEFAULT_VASES_PARAMS, simulerVases } from "@/lib/simulateurs/vasesCommunicants";

const euros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(v)) + " €";

export default function VasesSimulator() {
  const [params, setParams] = useState(DEFAULT_VASES_PARAMS);
  const result = useMemo(() => simulerVases(params), [params]);
  const reduce = useReducedMotion();

  const levers = [
    {
      label: "Effort apparent",
      value: result.effortApparent,
      format: eurPerMonth,
      detail: "la somme des versements programmés, ce que vous ressentez",
      tone: "border-line bg-cream-card",
    },
    {
      label: "Économie d'impôt PER (année 1)",
      value: result.economieImpot,
      format: eur,
      detail: `soit ${euros(result.economieImpotMensuelle)}/mois lissés sur l'année`,
      tone: "border-gold/50 bg-[#FBF3DF]",
    },
    {
      label: "Revenus SCPI réinjectés",
      value: result.revenuScpiMensuel,
      format: eurPerMonth,
      detail: "chaque mois, en rythme de croisière",
      tone: "border-gold/50 bg-[#FBF3DF]",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <VasesForm params={params} onChange={setParams} />

      <div className="grid grid-cols-1 gap-4 [@media(min-width:760px)]:grid-cols-3">
        {levers.map((l, i) => (
          <motion.div
            key={l.label}
            className={`rounded-[18px] border p-6 ${l.tone}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: i * 0.1 }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <p className="text-xs font-semibold tracking-[.08em] text-text-muted uppercase">{l.label}</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-ink">
              <AnimatedNumber value={l.value} format={l.format} />
            </p>
            <p className="mt-1.5 text-xs text-text-muted">{l.detail}</p>
          </motion.div>
        ))}
      </div>

      <RevealOnScroll>
        <div className="flex flex-col gap-5 rounded-[18px] border border-gold bg-[#FBF3DF] p-6 [@media(min-width:900px)]:flex-row [@media(min-width:900px)]:items-center [@media(min-width:900px)]:justify-between [@media(min-width:900px)]:p-8">
          <div className="max-w-[720px]">
            <h2 className="font-serif text-lg font-[450] text-ink">Ce que change l&apos;ingénierie</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Un coût réellement ressenti proche de <b className="text-ink">{euros(result.effortReelAnnee1)}/mois</b> la
              première année finance en réalité <b className="text-ink">{euros(result.effortApparent)}/mois</b> de
              versements programmés
              {result.capitalInitialEngage > 0 && (
                <>
                  , plus <b className="text-ink">{euros(result.capitalInitialEngage)}</b> de capital initial engagé sur
                  PER, SCPI et assurance-vie
                </>
              )}
              . L&apos;économie d&apos;impôt et les revenus SCPI ne disparaissent pas — ils changent de vase.
            </p>
          </div>
          <div className="shrink-0">
            <Button href="/rdv" variant="primary">
              Faire le calcul pour mon cas →
            </Button>
          </div>
        </div>
      </RevealOnScroll>

      <VasesDiagram params={params} result={result} />

      <RevealOnScroll>
        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <h3 className="text-xs font-semibold tracking-[.08em] text-gold uppercase">
            Hypothèses à valider avec votre conseiller
          </h3>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-[13px] leading-relaxed text-text-muted">
            <li>
              Votre <b className="text-ink">tranche marginale d&apos;imposition</b> réelle sur l&apos;année du versement,
              et le plafond de déduction épargne-retraite disponible (plafond PER non utilisé des 3 années précédentes
              compris).
            </li>
            <li>
              Les <b className="text-ink">rendements SCPI et assurance-vie</b> retenus ici sont illustratifs — à remplacer
              par les supports effectivement sélectionnés, nets de frais de gestion.
            </li>
            <li>
              L&apos;économie d&apos;impôt du PER est <b className="text-ink">ponctuelle</b> (liée au versement de
              l&apos;année) ; la rendre récurrente suppose de renouveler l&apos;effort de versement chaque année.
            </li>
            <li>
              Le simulateur ne tient pas compte de la fiscalité de sortie (PER en rente ou capital, prélèvements sociaux
              sur les gains de l&apos;assurance-vie et de la SCPI).
            </li>
          </ul>
        </div>
      </RevealOnScroll>

      <VasesCta />
    </div>
  );
}
