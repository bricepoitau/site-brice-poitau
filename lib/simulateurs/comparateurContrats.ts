export interface ContratParams {
  nom: string;
  droitsEntreePct: number;
  rendementPct: number;
  fraisGestionPct: number;
}

export interface ComparateurContratsParams {
  capital: number;
  horizonAnnees: number;
  contratA: ContratParams;
  contratB: ContratParams;
}

export interface ComparateurAnnee {
  annee: number;
  valeurA: number;
  valeurB: number;
  ecart: number;
  meilleur: "A" | "B" | "egalite";
  estCroisement: boolean;
  estDernier: boolean;
}

export interface ComparateurContratsResult {
  netA: number;
  netB: number;
  investiA: number;
  investiB: number;
  amortissementA: number | null;
  amortissementB: number | null;
  croisementAnnee: number | null;
  croisementValeur: number | null;
  serieAnnuelle: { annee: number; valeurA: number; valeurB: number; capitalInitial: number }[];
  finalA: number;
  finalB: number;
  gainA: number;
  gainB: number;
  ecartFinal: number;
  tableau: ComparateurAnnee[];
}

function investi(capital: number, droitsEntreePct: number): number {
  return capital * (1 - droitsEntreePct / 100);
}

export function calculerAmortissement(capital: number, droitsEntreePct: number, netPct: number): number | null {
  if (droitsEntreePct === 0) return 0;
  if (netPct <= 0) return null;
  const investiValue = investi(capital, droitsEntreePct);
  return Math.log(capital / investiValue) / Math.log(1 + netPct / 100);
}

function trouverCroisement(investiA: number, investiB: number, netA: number, netB: number): number | null {
  const rA = 1 + netA / 100;
  const rB = 1 + netB / 100;
  if (rA === rB) return null;
  const logRatio = Math.log(rB / rA);
  if (logRatio === 0) return null;
  return Math.log(investiA / investiB) / logRatio;
}

export function simulerComparateurContrats(params: ComparateurContratsParams): ComparateurContratsResult {
  const { capital, horizonAnnees, contratA, contratB } = params;

  const netA = contratA.rendementPct - contratA.fraisGestionPct;
  const netB = contratB.rendementPct - contratB.fraisGestionPct;
  const investiA = investi(capital, contratA.droitsEntreePct);
  const investiB = investi(capital, contratB.droitsEntreePct);

  const amortissementA = calculerAmortissement(capital, contratA.droitsEntreePct, netA);
  const amortissementB = calculerAmortissement(capital, contratB.droitsEntreePct, netB);

  const annees = Array.from({ length: horizonAnnees + 1 }, (_, i) => i);
  const serieAnnuelle = annees.map((annee) => ({
    annee,
    valeurA: investiA * Math.pow(1 + netA / 100, annee),
    valeurB: investiB * Math.pow(1 + netB / 100, annee),
    capitalInitial: capital,
  }));

  const crossT = trouverCroisement(investiA, investiB, netA, netB);
  const aCroisement = crossT !== null && crossT > 0 && crossT <= horizonAnnees;
  const croisementAnnee = aCroisement ? crossT : null;
  const croisementValeur = aCroisement ? investiA * Math.pow(1 + netA / 100, crossT as number) : null;

  const finalA = serieAnnuelle[horizonAnnees].valeurA;
  const finalB = serieAnnuelle[horizonAnnees].valeurB;

  const jalons = [1, 2, 3, 5, 7, 10, 12, 15, 20, 25, 30].filter((a) => a <= horizonAnnees);
  if (!jalons.includes(horizonAnnees)) jalons.push(horizonAnnees);
  const croisementAnneeEntier = aCroisement ? Math.round(crossT as number) : null;
  if (croisementAnneeEntier !== null && croisementAnneeEntier > 0 && !jalons.includes(croisementAnneeEntier)) {
    jalons.push(croisementAnneeEntier);
  }
  jalons.sort((a, b) => a - b);

  const tableau: ComparateurAnnee[] = jalons.map((annee) => {
    const valeurA = investiA * Math.pow(1 + netA / 100, annee);
    const valeurB = investiB * Math.pow(1 + netB / 100, annee);
    const ecart = valeurB - valeurA;
    const meilleur: ComparateurAnnee["meilleur"] = Math.abs(ecart) < 50 ? "egalite" : ecart > 0 ? "B" : "A";
    return {
      annee,
      valeurA,
      valeurB,
      ecart,
      meilleur,
      estCroisement: croisementAnneeEntier !== null && annee === croisementAnneeEntier,
      estDernier: annee === horizonAnnees,
    };
  });

  return {
    netA,
    netB,
    investiA,
    investiB,
    amortissementA,
    amortissementB,
    croisementAnnee,
    croisementValeur,
    serieAnnuelle,
    finalA,
    finalB,
    gainA: finalA - capital,
    gainB: finalB - capital,
    ecartFinal: finalB - finalA,
    tableau,
  };
}

export const DEFAULT_COMPARATEUR_PARAMS: ComparateurContratsParams = {
  capital: 100000,
  horizonAnnees: 10,
  contratA: { nom: "Contrat Haut de Gamme", droitsEntreePct: 4.8, rendementPct: 2, fraisGestionPct: 1 },
  contratB: { nom: "Contrat Classique", droitsEntreePct: 0, rendementPct: 2, fraisGestionPct: 1 },
};
