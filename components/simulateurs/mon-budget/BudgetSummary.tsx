"use client";

import DonutRepartition from "@/components/ui/DonutRepartition";
import { CATEGORIES, CHARGE_KEYS, type BudgetTotals } from "@/lib/simulateurs/monBudget";

interface BudgetSummaryProps {
  totals: BudgetTotals;
  revenu: number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function BudgetSummary({ totals, revenu }: BudgetSummaryProps) {
  const solde = revenu - totals.chargesTotal;

  const donutItems = CHARGE_KEYS.filter((k) => totals.byCat[k] > 0).map((k) => ({
    label: CATEGORIES[k].label,
    value: totals.byCat[k],
    color: CATEGORIES[k].color,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 [@media(min-width:900px)]:grid-cols-2">
      <DonutRepartition
        title="Répartition des charges"
        centerLabel="Total charges"
        centerValue={formatEuros(totals.chargesTotal)}
        items={
          donutItems.length > 0
            ? donutItems
            : [{ label: "Aucune charge saisie", value: 1, color: "var(--line)" }]
        }
      />

      <div className="flex flex-col justify-center rounded-[18px] border border-line bg-ink p-7 text-white">
        <div className="flex justify-between text-sm text-white/70">
          <span>Total charges /mois</span>
          <b className="text-white">{formatEuros(totals.chargesTotal)}</b>
        </div>
        <div className="mt-2 flex justify-between text-sm text-white/70">
          <span>Revenus /mois</span>
          <b className="text-white">{formatEuros(revenu)}</b>
        </div>
        <div className="mt-2 flex justify-between text-sm text-white/70">
          <span>Épargne déjà mise de côté</span>
          <b className="text-white">{formatEuros(totals.epargneTotal)}</b>
        </div>
        <div className="my-4 h-px bg-white/15" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">Reste à vivre / mois</span>
          <span className={`font-serif text-2xl font-[450] ${solde >= 0 ? "text-emerald-300" : "text-red-300"}`}>
            {formatEuros(solde)}
          </span>
        </div>
        {revenu > 0 && (
          <p className="mt-2.5 text-xs text-white/60">
            Capacité d&apos;épargne potentielle : {Math.round((solde / revenu) * 100)} %
            {totals.epargneTotal > 0 ? ` (dont ${formatEuros(totals.epargneTotal)} déjà épargnés)` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
