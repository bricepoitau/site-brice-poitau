"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot } from "recharts";
import type { ComparateurContratsResult } from "@/lib/simulateurs/comparateurContrats";

interface ComparateurContratsChartProps {
  result: ComparateurContratsResult;
  nomA: string;
  nomB: string;
  capital: number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function ComparateurContratsChart({ result, nomA, nomB, capital }: ComparateurContratsChartProps) {
  const data = result.serieAnnuelle.map((p) => ({
    annee: p.annee,
    valeurA: Math.round(p.valeurA),
    valeurB: Math.round(p.valeurB),
    capitalInitial: capital,
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="annee" tickFormatter={(v) => `An ${v}`} stroke="var(--text-muted)" fontSize={12} tickLine={false} />
          <YAxis tickFormatter={(v) => formatEuros(v)} stroke="var(--text-muted)" fontSize={12} tickLine={false} width={80} />
          <Tooltip
            formatter={(value) => formatEuros(Number(value))}
            labelFormatter={(label) => `Année ${label}`}
            contentStyle={{ background: "var(--cream-card)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 13 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {result.croisementAnnee !== null && result.croisementValeur !== null && (
            <>
              <ReferenceLine x={Math.round(result.croisementAnnee)} stroke="var(--gold)" strokeDasharray="4 3" />
              <ReferenceDot
                x={Math.round(result.croisementAnnee)}
                y={Math.round(result.croisementValeur)}
                r={6}
                fill="var(--gold)"
                stroke="var(--ink)"
                label={{ value: "Croisement", position: "top", fill: "var(--gold)", fontSize: 11 }}
              />
            </>
          )}
          <Line type="monotone" dataKey="valeurA" name={nomA} stroke="var(--ink)" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="valeurB" name={nomB} stroke="var(--gold)" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="capitalInitial" name="Capital initial" stroke="var(--text-muted)" strokeDasharray="6 4" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
