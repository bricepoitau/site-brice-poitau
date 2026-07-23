"use client";

import { useMemo, useState } from "react";
import AssuranceVieForm from "./AssuranceVieForm";
import AssuranceVieChart from "./AssuranceVieChart";
import { DEFAULT_PARAMS, simulerAssuranceVie } from "@/lib/simulateurs/assuranceVie";

const formatEuros = (v: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function AssuranceVieSimulator() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const result = useMemo(() => simulerAssuranceVie(params), [params]);

  return (
    <div className="grid grid-cols-1 gap-8 [@media(min-width:900px)]:grid-cols-[320px_1fr]">
      <AssuranceVieForm params={params} onChange={setParams} />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 [@media(min-width:640px)]:grid-cols-3">
          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="text-xs text-text-muted">Capital final estimé</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-ink">{formatEuros(result.capitalFinal)}</p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="text-xs text-text-muted">Total versé</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-ink">{formatEuros(result.totalVerse)}</p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-6">
            <p className="text-xs text-text-muted">Gains générés</p>
            <p className="mt-2 font-serif text-3xl font-[450] text-gold">{formatEuros(result.gains)}</p>
          </div>
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <AssuranceVieChart serie={result.serie} />
        </div>
      </div>
    </div>
  );
}
