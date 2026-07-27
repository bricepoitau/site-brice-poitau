"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import type { UnePierreDeuxCoupsAnnee } from "@/lib/simulateurs/unePierreDeuxCoups";

interface UnePierreDeuxCoupsChartProps {
  serie: UnePierreDeuxCoupsAnnee[];
  autofinancementAnnee: number | null;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function UnePierreDeuxCoupsChart({ serie, autofinancementAnnee }: UnePierreDeuxCoupsChartProps) {
  const data = serie.map((p) => ({
    annee: p.annee,
    mensualiteBrute: p.enCredit ? Math.round(p.mensualite) : null,
    effortSansComptant: Math.round(p.effortSansComptant),
    effortAvecComptant: Math.round(p.effortAvecComptant),
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis
            dataKey="annee"
            tickFormatter={(v) => `An ${v}`}
            stroke="var(--text-muted)"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatEuros(v)}
            stroke="var(--text-muted)"
            fontSize={12}
            tickLine={false}
            width={80}
          />
          <Tooltip
            formatter={(value) => formatEuros(Number(value))}
            labelFormatter={(label) => `Année ${label}`}
            contentStyle={{
              background: "var(--cream-card)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {autofinancementAnnee && (
            <ReferenceLine
              x={autofinancementAnnee}
              stroke="var(--gold)"
              strokeDasharray="4 3"
              label={{ value: "Autofinancement", position: "insideTopLeft", fill: "var(--gold)", fontSize: 11 }}
            />
          )}
          <Line type="monotone" dataKey="mensualiteBrute" name="Mensualité brute" stroke="#b83030" strokeWidth={2} dot={false} connectNulls={false} />
          <Line type="monotone" dataKey="effortSansComptant" name="Effort net sans comptant" stroke="#d4763a" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
          <Line type="monotone" dataKey="effortAvecComptant" name="Effort net avec comptant" stroke="var(--gold)" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
