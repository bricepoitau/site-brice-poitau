"use client";

import { generateScenarios } from "@/lib/simulateurs/per";

interface PerScenarioTableProps {
  revenuNet: number;
  versementPER: number;
  parts: number;
  report5ans: boolean;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";
const formatPct = (v: number) => `${Math.round(v * 100)} %`;

export default function PerScenarioTable({ revenuNet, versementPER, parts, report5ans }: PerScenarioTableProps) {
  const scenarios = generateScenarios(revenuNet, versementPER, parts, report5ans);

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-cream-card">
      <p className="border-b border-line p-5 font-serif text-lg font-[450] text-ink">Exemples chiffrés</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-white/60 text-left text-xs text-text-muted">
              <th className="px-4 py-3 font-medium">Versement PER</th>
              <th className="px-4 py-3 text-right font-medium">Rev. imposable</th>
              <th className="px-4 py-3 text-right font-medium">Impôt estimé</th>
              <th className="px-4 py-3 text-right font-medium">Gain fiscal</th>
              <th className="px-4 py-3 text-center font-medium">TMI</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((s, i) => (
              <tr
                key={i}
                className={`border-b border-line/60 ${
                  s.isOptimal ? "bg-gold/10 font-medium" : s.isCurrent && s.versement > 0 ? "bg-white/70" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {s.isOptimal && <span className="text-gold">★</span>}
                    <span className="text-ink">{formatEuros(s.versement)}</span>
                    <span className="text-xs text-text-muted">
                      ({formatEuros(Math.round(s.versement / 12))}/mois)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-ink">{formatEuros(s.revenuImposable)}</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-ink">{formatEuros(s.impot)}</span>
                  {s.versement > 0 && (
                    <span className="ml-1 text-xs text-emerald-700">{s.variationPct.toFixed(1)} %</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                  {s.gain > 0 ? formatEuros(s.gain) : "–"}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink">
                    {formatPct(s.tmi)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {scenarios.some((s) => s.isOptimal) && (
        <p className="border-t border-line px-5 py-3 text-xs text-text-muted">
          ★ Versement optimal : le montant minimal pour redescendre dans la tranche marginale inférieure.
        </p>
      )}
    </div>
  );
}
