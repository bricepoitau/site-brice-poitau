"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { AcheterLouerPoint } from "@/lib/simulateurs/acheterLouer";

interface AcheterLouerChartProps {
  serie: AcheterLouerPoint[];
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function AcheterLouerChart({ serie }: AcheterLouerChartProps) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={serie} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="proprietaireFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b83030" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#b83030" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="locataireFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="netFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ink)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--ink)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="annee" tickFormatter={(v) => `An ${v}`} stroke="var(--text-muted)" fontSize={12} tickLine={false} />
          <YAxis tickFormatter={(v) => formatEuros(v)} stroke="var(--text-muted)" fontSize={12} tickLine={false} width={80} />
          <Tooltip
            formatter={(value) => formatEuros(Number(value))}
            labelFormatter={(label) => `Année ${label}`}
            contentStyle={{ background: "var(--cream-card)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 13 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="coutProprietaire" name="Cumul coûts propriétaire" stroke="#b83030" strokeWidth={2} fill="url(#proprietaireFill)" />
          <Area type="monotone" dataKey="coutLocataire" name="Cumul loyers locataire" stroke="var(--gold-soft)" strokeWidth={2} fill="url(#locataireFill)" />
          <Area type="monotone" dataKey="patrimoineNet" name="Patrimoine net" stroke="var(--ink)" strokeWidth={2.5} fill="url(#netFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
