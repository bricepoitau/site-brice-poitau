"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import IncomeCalculator from "./IncomeCalculator";
import ManualExpenses from "./ManualExpenses";
import BudgetSummary from "./BudgetSummary";
import { computeTotals, type IncomeLine, type ManualExpense } from "@/lib/simulateurs/monBudget";

const STORE_KEY = "bpc_budget_manuel_v1";

interface PersistedState {
  revenus: string;
  incomeLines: IncomeLine[];
  manual: ManualExpense[];
}

export default function MonBudgetTool() {
  const [revenus, setRevenus] = useState("");
  const [incomeLines, setIncomeLines] = useState<IncomeLine[]>([]);
  const [manual, setManual] = useState<ManualExpense[]>([]);
  const [saveMsg, setSaveMsg] = useState("");
  const [loaded, setLoaded] = useState(false);

  const idRef = useRef(1);
  const nextId = () => idRef.current++;

  // Chargement initial depuis le navigateur — rien n'est jamais envoyé à un serveur.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d: PersistedState = JSON.parse(raw);
        setRevenus(d.revenus || "");
        setIncomeLines(d.incomeLines || []);
        setManual(d.manual || []);
        const maxId = Math.max(0, ...(d.incomeLines || []).map((l) => l.id), ...(d.manual || []).map((m) => m.id));
        idRef.current = maxId + 1;
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const totals = useMemo(() => computeTotals(manual), [manual]);
  const revenuValue = Number(revenus) || 0;

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ revenus, incomeLines, manual }));
    } catch {
      // mode privé : sauvegarde impossible, on ignore silencieusement
    }
  }

  useEffect(() => {
    if (!loaded) return;
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, revenus, incomeLines, manual]);

  function handleSaveClick() {
    persist();
    setSaveMsg("Enregistré sur cet ordinateur ✓");
    setTimeout(() => setSaveMsg(""), 2500);
  }

  function handleReset() {
    if (!confirm("Effacer les données saisies ?")) return;
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      // ignore
    }
    setRevenus("");
    setIncomeLines([]);
    setManual([]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[18px] border border-[#F0DFC0] bg-[#FFF6E9] p-7">
        <p className="font-serif text-lg font-[450] text-ink">Analyser automatiquement un relevé bancaire ?</p>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-muted">
          Pour des raisons de confidentialité, le site ne propose pas d&apos;import de relevé bancaire en ligne.
          Téléchargez l&apos;outil complet ci-dessous : il s&apos;utilise entièrement <b>hors ligne, sur votre
          ordinateur</b>. Il importe votre relevé (CSV ou Excel), regroupe vos dépenses par commerçant et calcule
          votre reste à vivre — sans qu&apos;aucune donnée ne transite jamais par internet.
        </p>
        <a
          href="/outils/mon-budget-complet.html"
          download
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          ⬇ Télécharger l&apos;outil complet (.html)
        </a>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card p-6">
        <p className="font-serif text-lg font-[450] text-ink">Ou saisissez votre budget manuellement ici</p>
        <p className="mt-2 text-xs leading-relaxed text-text-muted">
          Rien n&apos;est envoyé à un serveur : vos saisies restent uniquement dans ce navigateur (localStorage).
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-gold-soft"
          >
            💾 Enregistrer
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-gold-soft"
          >
            🖨️ Imprimer / PDF
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-gold-soft"
          >
            ↺ Réinitialiser
          </button>
        </div>
        {saveMsg && <p className="mt-2 text-xs text-text-muted">{saveMsg}</p>}
      </div>

      <div className="rounded-[18px] border border-line bg-ink p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/80">Revenus nets mensuels du foyer</p>
            <p className="mt-1 text-xs text-white/50">
              Saisissez un montant, ou utilisez la calculette ci-dessous pour l&apos;estimer.
            </p>
          </div>
          <input
            type="number"
            className="w-[180px] rounded-lg border border-white/20 bg-[#22323F] px-3.5 py-2.5 text-right text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold-soft"
            placeholder="0"
            value={revenus}
            onChange={(e) => setRevenus(e.target.value)}
          />
        </div>
      </div>

      <IncomeCalculator
        lines={incomeLines}
        onChange={setIncomeLines}
        onApplyTotal={(total) => setRevenus(String(total))}
        nextId={nextId}
      />

      <ManualExpenses manual={manual} onChange={setManual} nextId={nextId} />

      <BudgetSummary totals={totals} revenu={revenuValue} />

      <p className="text-center text-xs leading-relaxed text-text-muted">
        Étape 1 : visibilité sur les charges.
        <br />
        La capacité d&apos;épargne, le patrimoine net et les objectifs se travaillent ensuite avec votre
        conseiller.
      </p>
    </div>
  );
}
