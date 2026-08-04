"use client";

import { useMemo, useState } from "react";
import ScpiForm from "./ScpiForm";
import ScpiChart from "./ScpiChart";
import DonutRepartition from "@/components/ui/DonutRepartition";
import { DEFAULT_SCPI_PARAMS, simulerScpi } from "@/lib/simulateurs/scpi";

const euros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function ScpiSimulator() {
  const [params, setParams] = useState(DEFAULT_SCPI_PARAMS);
  const result = useMemo(() => simulerScpi(params), [params]);

  const aPhaseDeRente = params.dureeTotaleAnnees > params.dureeVersementsAnnees;

  return (
    <div className="grid grid-cols-1 gap-8 [@media(min-width:900px)]:grid-cols-[320px_1fr]">
      <ScpiForm params={params} onChange={setParams} />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] bg-line [@media(min-width:560px)]:grid-cols-2">
          <div className="bg-ink p-6">
            <p className="text-xs tracking-[.08em] text-[#C7C1B0] uppercase">Patrimoine immobilier final</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-white">{euros(result.patrimoineFinal)}</p>
          </div>
          <div className="bg-[#3A2F16] p-6">
            <p className="text-xs tracking-[.08em] text-gold-soft uppercase">Loyer mensuel {aPhaseDeRente ? "viager" : "final"}</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-white">
              {euros(result.loyerMensuelViager)}
              <span className="ml-1.5 text-base text-gold-soft">/mois{aPhaseDeRente ? " — à vie" : ""}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 [@media(min-width:640px)]:grid-cols-2">
          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="text-xs text-text-muted">Versement initial</p>
            <p className="mt-1.5 text-xl font-semibold text-ink">{euros(params.versementInitial)}</p>
            <p className="mt-3 text-xs text-text-muted">Loyer perçu immédiatement</p>
            <p className="mt-1 text-base font-semibold text-gold">
              {euros(result.loyerInitialAnnuel)}/an
              <span className="ml-1 font-normal text-text-muted">
                (soit {euros(result.loyerInitialMensuel)}/mois)
              </span>
            </p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="text-xs text-text-muted">Versement programmé</p>
            <p className="mt-1.5 text-xl font-semibold text-ink">{euros(params.versementMensuel)}/mois</p>
            <p className="mt-3 text-xs text-text-muted">Loyer perçu à terme</p>
            <p className="mt-1 text-base font-semibold text-gold">
              {euros(result.loyerProgrammeMensuelATerme)}/mois
              <span className="ml-1 font-normal text-text-muted">
                pendant {params.dureeVersementsAnnees} ans
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <p className="text-xs text-text-muted">Total des loyers perçus</p>
          <p className="mt-1.5 font-serif text-2xl font-[450] text-ink">{euros(result.totalLoyersPercus)}</p>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            {aPhaseDeRente
              ? `Ce loyer de ${euros(result.loyerMensuelViager)}/mois continue à vie, sans nouvel effort de votre part, tant que vous détenez vos parts.`
              : "Total cumulé sur la durée de simulation, versements et rente confondus."}
          </p>
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <p className="mb-3 text-sm font-semibold text-ink">Évolution des loyers perçus</p>
          <ScpiChart serie={result.serie} dureeVersementsAnnees={params.dureeVersementsAnnees} />
        </div>

        <DonutRepartition
          title="Répartition"
          centerLabel="Capital final"
          centerValue={euros(result.patrimoineFinal)}
          items={[
            { label: "Sommes investies", value: result.patrimoineFinal, color: "var(--ink)" },
            { label: "Loyers cumulés", value: result.totalLoyersPercus, color: "var(--gold)" },
          ]}
        />
      </div>
    </div>
  );
}
