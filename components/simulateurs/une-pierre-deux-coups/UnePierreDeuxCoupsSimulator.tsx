"use client";

import { Fragment, useMemo, useState } from "react";
import UnePierreDeuxCoupsForm from "./UnePierreDeuxCoupsForm";
import UnePierreDeuxCoupsChart from "./UnePierreDeuxCoupsChart";
import {
  DEFAULT_UNE_PIERRE_DEUX_COUPS_PARAMS,
  simulerUnePierreDeuxCoups,
} from "@/lib/simulateurs/unePierreDeuxCoups";

const euros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function UnePierreDeuxCoupsSimulator() {
  const [params, setParams] = useState(DEFAULT_UNE_PIERRE_DEUX_COUPS_PARAMS);
  const result = useMemo(() => simulerUnePierreDeuxCoups(params), [params]);

  const annee1 = result.serie[0];
  const derniereAnnee = result.serie[result.serie.length - 1];
  const anneeReference = result.serie[Math.min(params.dureeCredit, params.horizonAnnees) - 1];
  const couverturePct =
    anneeReference.mensualite > 0
      ? ((anneeReference.mensualite - anneeReference.effortAvecComptant) / anneeReference.mensualite) * 100
      : 100;

  let insightTone: "ok" | "warn" | "bad";
  let insightMessage: string;
  if (result.autofinancementAnnee) {
    insightTone = "ok";
    insightMessage = `Autofinancement atteint à l'an ${result.autofinancementAnnee} — à partir de cette année, les revenus SCPI combinés couvrent intégralement la mensualité de crédit. L'effort net devient positif : le client perçoit un revenu net mensuel de ${euros(-anneeReference.effortAvecComptant)} en fin de crédit, pour un patrimoine net constitué de ${euros(derniereAnnee.patrimoineNet)} à l'horizon de la simulation.`;
  } else if (couverturePct >= 60) {
    insightTone = "warn";
    insightMessage = `Les revenus SCPI couvrent ${couverturePct.toFixed(0)} % de la mensualité en fin de crédit. L'effort net résiduel est de ${euros(anneeReference.effortAvecComptant)}/mois. Pour atteindre l'autofinancement, augmentez le versement initial ou le rendement cible.`;
  } else {
    insightTone = "bad";
    insightMessage = `Couverture à ${couverturePct.toFixed(0)} % en fin de crédit. Ajustez les paramètres (montant emprunté, versement initial, rendement) pour améliorer significativement l'effort net.`;
  }

  const insightStyles = {
    ok: "border-emerald-300 bg-emerald-50 text-emerald-800",
    warn: "border-gold-soft bg-[#FBF3DF] text-[#8A5800]",
    bad: "border-red-300 bg-red-50 text-red-800",
  } as const;

  let separateurAffiche = false;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 [@media(min-width:1000px)]:grid-cols-[340px_1fr]">
        <UnePierreDeuxCoupsForm params={params} onChange={setParams} />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 [@media(min-width:640px)]:grid-cols-3">
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Mensualité crédit</p>
              <p className="mt-2 text-xl font-semibold text-ink">{euros(result.mensualiteCredit)}/mois</p>
            </div>
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Rev. nets SCPI crédit / mois</p>
              <p className="mt-2 text-xl font-semibold text-ink">{euros(annee1.revCreditNetMensuel)}</p>
            </div>
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Rev. nets SCPI comptant / mois</p>
              <p className="mt-2 text-xl font-semibold text-ink">{euros(annee1.revComptantNetMensuel)}</p>
            </div>
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Effort net an 1 — avec comptant</p>
              <p className="mt-2 text-xl font-semibold text-ink">{euros(annee1.effortAvecComptant)}/mois</p>
            </div>
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Autofinancement atteint</p>
              <p className="mt-2 text-xl font-semibold text-gold">
                {result.autofinancementAnnee ? `An ${result.autofinancementAnnee}` : "Non atteint"}
              </p>
            </div>
            <div className="rounded-[18px] border border-line bg-cream-card p-5">
              <p className="text-xs text-text-muted">Patrimoine net final</p>
              <p className="mt-2 text-xl font-semibold text-ink">{euros(derniereAnnee.patrimoineNet)}</p>
            </div>
          </div>

          <div className={`rounded-[18px] border p-5 text-sm leading-relaxed ${insightStyles[insightTone]}`}>
            {insightMessage}
          </div>

          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="mb-3 text-sm font-semibold text-ink">
              Effort mensuel net — évolution sur la durée de simulation
            </p>
            <UnePierreDeuxCoupsChart serie={result.serie} autofinancementAnnee={result.autofinancementAnnee} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border border-line bg-cream-card">
        <div className="border-b border-line px-6 py-4">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-ink">Synthèse année par année</h3>
            <span className="text-xs text-text-muted">Effort net = mensualité − revenus SCPI nets après fiscalité</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            À taux et loyer inchangés, l&apos;effort net augmente chaque année : sur un crédit amortissable, la
            part d&apos;intérêts (déductible du revenu foncier) diminue au fil du remboursement tandis que la
            part de capital (non déductible) augmente. Le revenu foncier imposable progresse donc mécaniquement,
            l&apos;impôt dû aussi — ce qui réduit le revenu net perçu, même si la mensualité et le rendement
            SCPI restent fixes. Si les intérêts dépassent le loyer brut en début de crédit, le déficit foncier
            créé est imputable sur le revenu global (dans la limite de 10 750 €/an) puis reporté sur vos revenus
            fonciers des 10 années suivantes — ce report est bien pris en compte dans la simulation et peut
            temporairement stabiliser l&apos;effort, avant que la hausse ne reprenne une fois le déficit reporté
            consommé.
          </p>
        </div>
        <div className="max-h-[520px] overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="sticky top-0 bg-[#ece9e1] text-xs text-text-muted uppercase">
                <th className="px-4 py-3 text-center font-semibold">Année</th>
                <th className="px-4 py-3 text-right font-semibold">Mensualité crédit</th>
                <th className="px-4 py-3 text-right font-semibold">Effort net sans comptant</th>
                <th className="px-4 py-3 text-right font-semibold">Effort net avec comptant</th>
                <th className="px-4 py-3 text-right font-semibold">Patrimoine brut</th>
                <th className="px-4 py-3 text-right font-semibold">Patrimoine net</th>
              </tr>
            </thead>
            <tbody>
              {result.serie.map((row) => {
                const showSeparator = !row.enCredit && !separateurAffiche;
                if (showSeparator) separateurAffiche = true;
                return (
                  <Fragment key={row.annee}>
                    {showSeparator && (
                      <tr className="bg-[#e8f0fb] text-[color:var(--ink-soft)]">
                        <td colSpan={6} className="px-4 py-2 text-center text-xs font-medium">
                          ↓ Fin du crédit — les colonnes affichent désormais le revenu net mensuel perçu
                        </td>
                      </tr>
                    )}
                    <tr
                      className={`border-t border-line ${row.estAutofinancement ? "bg-emerald-50" : !row.enCredit ? "bg-[#f0f7ef]" : ""}`}
                    >
                      <td className="px-4 py-2.5 text-center font-medium text-ink">
                        An {row.annee}
                        {row.estAutofinancement ? " ★" : ""}
                      </td>
                      <td className="px-4 py-2.5 text-right text-text-muted">
                        {row.enCredit ? euros(row.mensualite) : "—"}
                      </td>
                      <td className={`px-4 py-2.5 text-right font-medium ${row.enCredit ? (row.effortSansComptant <= 0 ? "text-emerald-700" : "text-red-700") : "text-emerald-700"}`}>
                        {euros(row.enCredit ? row.effortSansComptant : -row.effortSansComptant)}
                      </td>
                      <td className={`px-4 py-2.5 text-right font-medium ${row.enCredit ? (row.effortAvecComptant <= 0 ? "text-emerald-700" : "text-red-700") : "text-emerald-700"}`}>
                        {euros(row.enCredit ? row.effortAvecComptant : -row.effortAvecComptant)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-[color:var(--ink-soft)]">{euros(row.patrimoineBrut)}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-emerald-700">{euros(row.patrimoineNet)}</td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
