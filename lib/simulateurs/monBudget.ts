// Outil "Mon budget mensuel" (version en ligne) — saisie manuelle uniquement.
// L'import automatique de relevé bancaire n'est volontairement PAS proposé sur le site :
// c'est réservé à l'outil téléchargeable (public/outils/mon-budget-complet.html), qui
// s'exécute entièrement hors-ligne sur l'ordinateur du visiteur. Rien ici n'envoie de
// données à un serveur : tout reste dans le navigateur (localStorage).
// Les couleurs de catégorie réutilisent la palette du site (ink / gold / text-muted).

export type CategoryKey = "fixes" | "variables" | "courantes" | "ponctuelles" | "epargne";
export type ChargeCategoryKey = "fixes" | "variables" | "courantes" | "ponctuelles";

export interface CategoryDef {
  label: string;
  color: string;
  /** false pour l'épargne : exclue du total de charges. */
  charge: boolean;
}

export const CATEGORIES: Record<CategoryKey, CategoryDef> = {
  fixes: { label: "Charges fixes", color: "var(--ink)", charge: true },
  variables: { label: "Charges variables", color: "var(--gold)", charge: true },
  courantes: { label: "Charges courantes", color: "var(--ink-soft)", charge: true },
  ponctuelles: { label: "Charges ponctuelles", color: "var(--gold-soft)", charge: true },
  epargne: { label: "Épargne / mise de côté", color: "#8A9297", charge: false },
};

export const CHARGE_KEYS: ChargeCategoryKey[] = ["fixes", "variables", "courantes", "ponctuelles"];
export const ALL_KEYS: CategoryKey[] = Object.keys(CATEGORIES) as CategoryKey[];

// ---------------- Dépenses saisies à la main ----------------

export interface ManualExpense {
  id: number;
  cat: CategoryKey;
  label: string;
  amount: number; // mensuel
}

export interface BudgetTotals {
  byCat: Record<CategoryKey, number>;
  chargesTotal: number;
  epargneTotal: number;
}

export function computeTotals(manual: ManualExpense[]): BudgetTotals {
  const byCat: Record<CategoryKey, number> = { fixes: 0, variables: 0, courantes: 0, ponctuelles: 0, epargne: 0 };
  manual.forEach((m) => {
    byCat[m.cat] += Number(m.amount) || 0;
  });
  const chargesTotal = CHARGE_KEYS.reduce((s, k) => s + byCat[k], 0);
  return { byCat, chargesTotal, epargneTotal: byCat.epargne };
}

// ---------------- Calculette revenus ----------------

export type IncomeType = "netMensuel" | "brutAnnuel" | "bnc" | "bicVente" | "bicService" | "autre";

export const INCOME_TYPE_LABELS: Record<IncomeType, string> = {
  netMensuel: "Salaire net mensuel",
  brutAnnuel: "Salaire brut annuel",
  bnc: "Indépendant — BNC (profession libérale)",
  bicVente: "Indépendant — BIC (achat-revente)",
  bicService: "Indépendant — BIC (prestations de service)",
  autre: "Autre revenu net mensuel (pension, rente…)",
};

const INCOME_RATES = {
  brutAnnuel: { cadre: 0.75, nonCadre: 0.78 },
  cotis: { bnc: 0.211, bicVente: 0.123, bicService: 0.212 },
};

export interface IncomeLine {
  id: number;
  label: string;
  type: IncomeType;
  amount: number | "";
  statut: "cadre" | "nonCadre";
  period: "annuel" | "mensuel";
  deduct: boolean;
}

export function lineNetMonthly(line: IncomeLine): number {
  const amt = Number(line.amount) || 0;
  if (amt <= 0) return 0;
  switch (line.type) {
    case "netMensuel":
    case "autre":
      return amt;
    case "brutAnnuel": {
      const taux = INCOME_RATES.brutAnnuel[line.statut === "cadre" ? "cadre" : "nonCadre"];
      return (amt * taux) / 12;
    }
    case "bnc":
    case "bicVente":
    case "bicService": {
      const monthlyCA = line.period === "annuel" ? amt / 12 : amt;
      const cotisRate = INCOME_RATES.cotis[line.type];
      const cotis = line.deduct === false ? 0 : monthlyCA * cotisRate;
      return monthlyCA - cotis;
    }
    default:
      return 0;
  }
}
