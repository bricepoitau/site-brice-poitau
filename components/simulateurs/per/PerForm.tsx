"use client";

import { computePlafondTotal, PARTS_OPTIONS, type PerParams } from "@/lib/simulateurs/per";
import SliderField from "@/components/ui/SliderField";

interface PerFormProps {
  params: PerParams;
  onChange: (params: PerParams) => void;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

const PARTS_LABELS: Record<number, string> = {
  1: "1 part (célibataire)",
  1.5: "1,5 part",
  2: "2 parts (marié/pacsé)",
  2.5: "2,5 parts",
  3: "3 parts",
};

export default function PerForm({ params, onChange }: PerFormProps) {
  const plafondTotal = computePlafondTotal(params.revenuNet, params.report5ans);

  const set = <K extends keyof PerParams>(key: K, value: PerParams[K]) => {
    const next = { ...params, [key]: value };
    // Le versement PER ne peut jamais dépasser le plafond courant.
    const nextPlafond = computePlafondTotal(next.revenuNet, next.report5ans);
    next.versementPER = Math.min(next.versementPER, nextPlafond);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-6 rounded-[18px] border border-line bg-cream-card p-7">
      <div>
        <SliderField
          id="revenuNet"
          label="Revenu net annuel (avant IR)"
          value={params.revenuNet}
          displayValue={formatEuros(params.revenuNet)}
          min={0}
          max={200000}
          step={500}
          onChange={(v) => set("revenuNet", v)}
        />
        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
          Base de calcul, avant abattement de 10 %. Le PER réduit votre revenu imposable, pas votre revenu net.
        </p>
      </div>

      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={params.report5ans}
          onChange={(e) => set("report5ans", e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-gold"
        />
        <span className="text-sm text-text-muted">
          <span className="font-medium text-ink">Aucun versement PER ces 5 dernières années</span>
          <br />
          Permet de cumuler les plafonds annuels non utilisés (×5).
        </span>
      </label>

      <div>
        <SliderField
          id="versementPER"
          label="Versement PER annuel"
          value={params.versementPER}
          displayValue={formatEuros(params.versementPER)}
          min={0}
          max={Math.max(plafondTotal, 1)}
          step={100}
          onChange={(v) => set("versementPER", v)}
        />
        <p className="mt-1.5 text-xs text-text-muted">
          Soit {formatEuros(Math.round(params.versementPER / 12))} / mois — Plafond : {formatEuros(plafondTotal)}
          {params.report5ans ? " (report 5 ans)" : ""}
        </p>
      </div>

      <div>
        <label className="text-sm text-text-muted" htmlFor="parts">
          Situation familiale / parts
        </label>
        <select
          id="parts"
          value={params.parts}
          onChange={(e) => set("parts", Number(e.target.value))}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-soft"
        >
          {PARTS_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {PARTS_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg bg-white p-3.5 text-xs leading-relaxed text-text-muted">
        <p className="mb-1 font-medium text-ink">Barème IR 2026</p>
        <p>Abattement 10 % appliqué au revenu net annuel (min 504 €, max 14 426 €).</p>
        <p>Plafond déduction PER : 29 316 € / an (avant report éventuel).</p>
      </div>
    </div>
  );
}
