"use client";

import { useMemo, useState } from "react";
import PrelevementSourceForm from "./PrelevementSourceForm";
import {
  DEFAULT_PRELEVEMENT_SOURCE_PARAMS,
  simulerPrelevementSource,
} from "@/lib/simulateurs/prelevementSource";

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function PrelevementSourceSimulator() {
  const [params, setParams] = useState(DEFAULT_PRELEVEMENT_SOURCE_PARAMS);
  const [salaireManuel, setSalaireManuel] = useState<string>("");
  const result = useMemo(() => simulerPrelevementSource(params), [params]);

  const salaireBase = result.revenuAvant / 12;
  const salaireUtilise = salaireManuel !== "" ? Number(salaireManuel) || 0 : salaireBase;
  const prelevMensuel = (salaireUtilise * result.taux) / 100;
  const netApresPas = salaireUtilise - prelevMensuel;

  return (
    <div className="grid grid-cols-1 gap-8 [@media(min-width:900px)]:grid-cols-[340px_1fr]">
      <PrelevementSourceForm params={params} onChange={setParams} />

      <div className="flex flex-col gap-6">
        <div className="rounded-[18px] border border-line bg-ink p-7 text-white">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs text-white/60">Taux de prélèvement à la source estimé</p>
              <p className="mt-1 font-serif text-4xl font-[450]">
                {result.taux.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %
              </p>
            </div>
            <span className="text-xs text-white/60">Tranche marginale (TMI) : {result.tmi} %</span>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-soft transition-[width] duration-300"
              style={{ width: `${Math.min(100, result.taux * 2)}%` }}
            />
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-5 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Parts fiscales</span>
              <b className="text-white">
                {result.parts.toLocaleString("fr-FR")} part{result.parts > 1 ? "s" : ""}
              </b>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Revenu imposable après abattement</span>
              <b className="text-white">{formatEuros(result.revenuApres)}</b>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Impôt brut (barème + plafonnement du QF)</span>
              <b className="text-white">{formatEuros(result.impotBrut)}</b>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Décote</span>
              <b className="text-white">− {formatEuros(result.decote)}</b>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Contribution hauts revenus (CEHR)</span>
              <b className="text-white">{formatEuros(result.cehr)}</b>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Impôt net annuel estimé</span>
              <b className="text-white">{formatEuros(result.impotNet)}</b>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-serif text-lg font-[450] text-ink">Prélèvement mensuel</p>
            <span className="text-xs text-text-muted">Appliqué à un salaire net imposable mensuel</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 [@media(min-width:560px)]:grid-cols-3">
            <div>
              <label className="text-xs text-text-muted" htmlFor="salMensuel">
                Salaire net imposable mensuel
              </label>
              <input
                id="salMensuel"
                type="number"
                min={0}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-soft"
                placeholder={formatEuros(Math.round(salaireBase))}
                value={salaireManuel}
                onChange={(e) => setSalaireManuel(e.target.value)}
              />
            </div>
            <div className="rounded-lg border border-line bg-white p-3.5">
              <p className="text-xs text-text-muted">Prélèvement estimé / mois</p>
              <p className="mt-1 text-right font-semibold text-ink">{formatEuros(prelevMensuel)}</p>
            </div>
            <div className="rounded-lg border border-line bg-white p-3.5">
              <p className="text-xs text-text-muted">Net perçu après PAS / mois</p>
              <p className="mt-1 text-right font-semibold text-gold">{formatEuros(netApresPas)}</p>
            </div>
          </div>
          {salaireManuel !== "" && (
            <button
              type="button"
              onClick={() => setSalaireManuel("")}
              className="mt-3 text-xs font-medium text-text-muted underline underline-offset-2 hover:text-gold"
            >
              ↺ Reprendre le revenu annuel / 12
            </button>
          )}
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <p className="font-serif text-lg font-[450] text-ink">Suggestions</p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">
            Ce taux dit « <b className="text-ink">taux du foyer</b> » est communiqué à tous les employeurs du
            foyer. Pour ne pas dévoiler votre situation personnelle (revenus du conjoint, autres revenus…), vous
            pouvez opter sur impots.gouv.fr pour un <b className="text-ink">taux individualisé</b> ou un{" "}
            <b className="text-ink">taux neutre</b>.
            <br />
            <br />
            Le taux réel appliqué par vos employeurs est celui calculé chaque année par l&apos;administration sur
            vos revenus <b className="text-ink">N-2</b> puis actualisé en{" "}
            <b className="text-ink">septembre</b> sur les revenus <b className="text-ink">N-1</b> — cette
            simulation donne une estimation « à jour », pas le taux officiel figé sur votre bulletin de paie.
            <br />
            <br />
            En cas de changement de situation en cours d&apos;année (naissance, mariage, divorce, variation de
            revenus de plus de 10 %), vous pouvez signaler le changement sur impots.gouv.fr pour faire recalculer
            votre taux sans attendre la déclaration annuelle.
          </p>
        </div>
      </div>
    </div>
  );
}
