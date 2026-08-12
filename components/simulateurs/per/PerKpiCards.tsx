"use client";

import type { IRResult } from "@/lib/simulateurs/per";

interface PerKpiCardsProps {
  avant: IRResult;
  apres: IRResult;
  gain: number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";
const formatPct = (v: number) => `${Math.round(v * 100)} %`;

export default function PerKpiCards({ avant, apres, gain }: PerKpiCardsProps) {
  const trancheChanged = avant.tmi !== apres.tmi;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 [@media(min-width:640px)]:grid-cols-4">
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">Revenu imposable (avant PER)</p>
          <p className="mt-2 font-serif text-xl font-[450] text-ink">{formatEuros(avant.revenuImposable)}</p>
        </div>
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">Impôt estimé (avant PER)</p>
          <p className="mt-2 font-serif text-xl font-[450] text-ink">{formatEuros(avant.impot)}</p>
        </div>
        <div className="rounded-[18px] border border-line bg-cream-card p-5">
          <p className="text-xs text-text-muted">Impôt estimé (après PER)</p>
          <p className="mt-2 font-serif text-xl font-[450] text-ink">{formatEuros(apres.impot)}</p>
        </div>
        <div className="rounded-[18px] border border-line bg-ink p-5 text-white">
          <p className="text-xs text-white/60">Gain fiscal</p>
          <p className="mt-2 font-serif text-xl font-[450] text-gold-soft">{formatEuros(gain)}</p>
          <p className="mt-0.5 text-[11px] text-white/50">Économie d&apos;impôt</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-[14px] border border-line bg-cream-card px-4 py-3 text-sm">
        <span className="text-text-muted">TMI avant :</span>
        <span className="font-semibold text-ink">{formatPct(avant.tmi)}</span>
        <span className="text-text-muted">→</span>
        <span className="text-text-muted">TMI après :</span>
        <span className="font-semibold text-ink">{formatPct(apres.tmi)}</span>
        {trancheChanged && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
            ↓ Changement de tranche
          </span>
        )}
      </div>

      <p className="text-xs italic text-text-muted">Calcul indicatif : hors décote et dispositifs spécifiques.</p>
    </div>
  );
}
