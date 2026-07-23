"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { AssuranceViePoint } from "@/lib/simulateurs/assuranceVie";

interface AssuranceVieChartProps {
  serie: AssuranceViePoint[];
}

const formatEuros = (v: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function AssuranceVieChart({ serie }: AssuranceVieChartProps) {
  const dureeAnnees = serie[serie.length - 1]?.annee ?? 0;
  const step = dureeAnnees > 20 ? 6 : 3;
  const data = serie.filter((p) => p.mois % step === 0);

  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="capitalFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity={0.03} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="totalVerse"
            name="Total versé"
            stroke="var(--text-muted)"
            strokeDasharray="5 4"
            fill="none"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="capital"
            name="Capital total"
            stroke="var(--gold)"
            fill="url(#capitalFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
