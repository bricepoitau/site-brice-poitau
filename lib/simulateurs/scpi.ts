export interface ScpiParams {
  tauxDistributionPct: number;
  versementInitial: number;
  versementMensuel: number;
  dureeVersementsAnnees: number;
  dureeTotaleAnnees: number;
  reinvestirLoyers: boolean;
}

export interface ScpiPoint {
  mois: number;
  annee: number;
  capital: number;
  loyerMensuel: number;
  phase: "investissement" | "rente";
}

export interface ScpiResult {
  patrimoineFinal: number;
  loyerMensuelViager: number;
  loyerInitialAnnuel: number;
  loyerInitialMensuel: number;
  loyerProgrammeMensuelATerme: number;
  totalLoyersPercus: number;
  serie: ScpiPoint[];
}

export function simulerScpi(params: ScpiParams): ScpiResult {
  const { tauxDistributionPct, versementInitial, versementMensuel, dureeVersementsAnnees, dureeTotaleAnnees, reinvestirLoyers } =
    params;

  const tauxMensuel = tauxDistributionPct / 100 / 12;
  const moisVersements = Math.round(dureeVersementsAnnees * 12);
  const moisTotal = Math.round(dureeTotaleAnnees * 12);

  const serie: ScpiPoint[] = [];
  let capital = versementInitial;
  let totalLoyersPercus = 0;
  let patrimoineFinal = versementInitial;
  let loyerMensuelViager = (versementInitial * tauxDistributionPct) / 100 / 12;

  for (let mois = 1; mois <= moisTotal; mois += 1) {
    const enVersement = mois <= moisVersements;

    if (enVersement) {
      capital += versementMensuel;
      if (reinvestirLoyers) {
        capital += capital * tauxMensuel;
      }
    }

    const loyerMensuelCourant = capital * tauxMensuel;

    if (!enVersement || !reinvestirLoyers) {
      totalLoyersPercus += loyerMensuelCourant;
    }

    if (mois === moisVersements) {
      patrimoineFinal = capital;
      loyerMensuelViager = loyerMensuelCourant;
    }

    serie.push({
      mois,
      annee: mois / 12,
      capital,
      loyerMensuel: loyerMensuelCourant,
      phase: enVersement ? "investissement" : "rente",
    });
  }

  if (moisVersements === 0) {
    patrimoineFinal = versementInitial;
    loyerMensuelViager = (versementInitial * tauxDistributionPct) / 100 / 12;
  }

  const loyerInitialAnnuel = (versementInitial * tauxDistributionPct) / 100;
  const loyerInitialMensuel = loyerInitialAnnuel / 12;
  const loyerProgrammeMensuelATerme = Math.max(0, loyerMensuelViager - loyerInitialMensuel);

  return {
    patrimoineFinal,
    loyerMensuelViager,
    loyerInitialAnnuel,
    loyerInitialMensuel,
    loyerProgrammeMensuelATerme,
    totalLoyersPercus,
    serie,
  };
}

export const DEFAULT_SCPI_PARAMS: ScpiParams = {
  tauxDistributionPct: 5,
  versementInitial: 10000,
  versementMensuel: 300,
  dureeVersementsAnnees: 30,
  dureeTotaleAnnees: 50,
  reinvestirLoyers: false,
};
