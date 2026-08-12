"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PerChartProps {
  impotAvant: number;
  impotApres: number;
  riAvant: number;
  riApres: number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

function MiniBarChart({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-5">
      <p className="mb-3 text-sm font-medium text-text-muted">{title}</p>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
            <YAxis
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              stroke="var(--text-muted)"
              fontSize={11}
              tickLine={false}
              width={40}
            />
            <Tooltip
              formatter={(value) => formatEuros(Number(value))}
              contentStyle={{
                background: "var(--cream-card)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === 0 ? "var(--ink)" : "var(--gold)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function PerChart({ impotAvant, impotApres, riAvant, riApres }: PerChartProps) {
  const impotData = [
    { name: "Avant PER", value: impotAvant },
    { name: "Après PER", value: impotApres },
  ];
  const riData = [
    { name: "Avant PER", value: riAvant },
    { name: "Après PER", value: riApres },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 [@media(min-width:640px)]:grid-cols-2">
      <MiniBarChart title="Impôt estimé" data={impotData} />
      <MiniBarChart title="Revenu imposable" data={riData} />
    </div>
  );
}
