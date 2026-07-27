"use client";

import { useMemo, useState } from "react";
import ComparateurContratsForm from "./ComparateurContratsForm";
import ComparateurContratsChart from "./ComparateurContratsChart";
import { DEFAULT_COMPARATEUR_PARAMS, simulerComparateurContrats } from "@/lib/simulateurs/comparateurContrats";

const euros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

function formatAmortissement(annees: number | null): string {
  if (annees === null) return "Non récupérable";
  if (annees === 0) return "Immédiat (0 frais)";
  return `${annees.toFixed(1)} an${annees >= 2 ? "s" : ""}`;
}

export default function ComparateurContratsSimulator() {
  const [params, setParams] = useState(DEFAULT_COMPARATEUR_PARAMS);
  const result = useMemo(() => simulerComparateurContrats(params), [params]);

  const { nom: nomA } = params.contratA;
  const { nom: nomB } = params.contratB;
  const diff = result.ecartFinal;

  return (
    <div className="flex flex-col gap-6">
      <ComparateurContratsForm params={params} onChange={setParams} />

      <div className="grid grid-cols-1 gap-4 [@media(min-width:640px)]:grid-cols-2">
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">Point d&apos;amortissement — {nomA}</p>
          <p className="mt-2 text-lg font-semibold text-ink">{formatAmortissement(result.amortissementA)}</p>
        </div>
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">Point d&apos;amortissement — {nomB}</p>
          <p className="mt-2 text-lg font-semibold text-gold">{formatAmortissement(result.amortissementB)}</p>
        </div>
      </div>

      {result.croisementAnnee !== null && result.croisementValeur !== null && (
        <div className="rounded-[18px] border border-gold-soft bg-[#FBF3DF] p-5 text-sm leading-relaxed text-[#8A5800]">
          <strong>✕ Croisement à {result.croisementAnnee.toFixed(1)} ans</strong> — les deux contrats atteignent{" "}
          {euros(Math.round(result.croisementValeur))} à ce moment. Au-delà de ce point, le classement entre les
          deux contrats reste stable jusqu&apos;à l&apos;échéance.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 [@media(min-width:640px)]:grid-cols-3">
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">{nomA} après {params.horizonAnnees} ans</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{euros(result.finalA)}</p>
          <p className="mt-1 text-xs text-text-muted">
            {result.gainA >= 0 ? "+" : ""}
            {euros(result.gainA)} vs initial
          </p>
        </div>
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">{nomB} après {params.horizonAnnees} ans</p>
          <p className="mt-2 text-2xl font-semibold text-gold">{euros(result.finalB)}</p>
          <p className="mt-1 text-xs text-text-muted">
            {result.gainB >= 0 ? "+" : ""}
            {euros(result.gainB)} vs initial
          </p>
        </div>
        <div className={`rounded-[18px] border p-5 ${diff >= 0 ? "border-gold-soft bg-[#FBF3DF]" : "border-line bg-cream-card"}`}>
          <p className="text-xs text-text-muted">Écart à l&apos;échéance</p>
          <p className={`mt-2 text-2xl font-semibold ${diff > 0 ? "text-emerald-700" : diff < 0 ? "text-red-700" : "text-ink"}`}>
            {diff >= 0 ? "+" : ""}
            {euros(diff)}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {diff === 0 ? "Résultats identiques" : diff > 0 ? `${nomB} est meilleur` : `${nomA} est meilleur`}
          </p>
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card p-6">
        <p className="mb-3 text-sm font-semibold text-ink">Évolution de la valeur du contrat</p>
        <ComparateurContratsChart result={result} nomA={nomA} nomB={nomB} capital={params.capital} />
      </div>

      <div className="overflow-hidden rounded-[18px] border border-line bg-cream-card">
        <div className="border-b border-line px-6 py-4">
          <h3 className="text-sm font-semibold text-ink">Synthèse par échéance</h3>
        </div>
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="sticky top-0 bg-[#ece9e1] text-xs text-text-muted uppercase">
                <th className="px-4 py-3 text-left font-semibold">Année</th>
                <th className="px-4 py-3 text-right font-semibold">{nomA}</th>
                <th className="px-4 py-3 text-right font-semibold">{nomB}</th>
                <th className="px-4 py-3 text-right font-semibold">Écart (B − A)</th>
                <th className="px-4 py-3 text-right font-semibold">Meilleur</th>
              </tr>
            </thead>
            <tbody>
              {result.tableau.map((row) => (
                <tr
                  key={row.annee}
                  className={`border-t border-line ${row.estDernier ? "bg-[#f0f7ef]" : row.estCroisement ? "bg-[#FBF3DF]" : ""}`}
                >
                  <td className="px-4 py-2.5 font-medium text-ink">
                    {row.estDernier ? `Après ${row.annee} ans ⭐` : row.estCroisement ? `✕ Croisement (~an ${row.annee})` : `Après ${row.annee} an${row.annee > 1 ? "s" : ""}`}
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium text-ink">{euros(row.valeurA)}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-gold">{euros(row.valeurB)}</td>
                  <td className={`px-4 py-2.5 text-right font-medium ${row.ecart >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                    {row.ecart >= 0 ? "+" : ""}
                    {euros(row.ecart)}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-text-muted">
                    {row.meilleur === "egalite" ? "≈ Égalité" : row.meilleur === "A" ? nomA : nomB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs leading-relaxed text-text-muted">
        Hypothèses : rendements annuels nets de frais de gestion. Les performances passées ne préjugent pas des
        performances futures. Simulation à titre indicatif, hors fiscalité.
      </p>
    </div>
  );
}
