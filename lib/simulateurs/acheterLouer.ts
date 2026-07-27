export interface Ville {
  nom: string;
  prixM2: number;
  loyerM2: number;
}

export const VILLES: Ville[] = [
  { nom: "Paris", prixM2: 10200, loyerM2: 32 },
  { nom: "Lyon", prixM2: 5200, loyerM2: 16 },
  { nom: "Marseille", prixM2: 3400, loyerM2: 14 },
  { nom: "Toulouse", prixM2: 3800, loyerM2: 13 },
  { nom: "Bordeaux", prixM2: 4500, loyerM2: 15 },
  { nom: "Nantes", prixM2: 4200, loyerM2: 14 },
  { nom: "Nice", prixM2: 5100, loyerM2: 18 },
  { nom: "Strasbourg", prixM2: 3600, loyerM2: 13 },
  { nom: "Rennes", prixM2: 4000, loyerM2: 13 },
  { nom: "Montpellier", prixM2: 3700, loyerM2: 14 },
];

export const DEFAULTS_ACHETER_LOUER = {
  surface: 45,
  apport: 30000,
  taux: 3.7,
  dureeAnnees: 20,
  fraisNotairePct: 7.5,
  assuranceEmprunteurPct: 0.36,
  charges: 2500,
  entretienAutoPct: 0.5,
  revalorisationBienPct: 1.5,
  revalorisationLoyerPct: 1.5,
  horizonAnnees: 25,
  rendementPlacementPct: 4,
};

export interface AcheterLouerParams {
  prixM2: number;
  surface: number;
  loyerMensuel: number;
  apport: number;
  tauxPct: number;
  dureeAnnees: number;
  fraisNotairePct: number;
  assuranceEmprunteurPct: number;
  charges: number;
  entretien: number;
  revalorisationBienPct: number;
  revalorisationLoyerPct: number;
  horizonAnnees: number;
  rendementPlacementPct: number;
}

export interface AcheterLouerPoint {
  annee: number;
  coutProprietaire: number;
  coutLocataire: number;
  patrimoineNet: number;
}

export interface AcheterLouerResult {
  prixBien: number;
  coutTotalAchat: number;
  emprunt: number;
  mensualiteCredit: number;
  mensualiteAssurance: number;
  mensualiteTotale: number;
  ecartVsLoyer: number;
  seuilRentabilite: number | null;
  serie: AcheterLouerPoint[];
}

export function mensualitePret(capital: number, tauxAnnuelPct: number, annees: number): number {
  const r = tauxAnnuelPct / 100 / 12;
  const n = annees * 12;
  if (r === 0) return capital / n;
  return (capital * r) / (1 - Math.pow(1 + r, -n));
}

export function simulerAcheterLouer(params: AcheterLouerParams): AcheterLouerResult {
  const prixBien = params.prixM2 * params.surface;
  const coutTotalAchat = prixBien * (1 + params.fraisNotairePct / 100);
  const emprunt = Math.max(0, coutTotalAchat - params.apport);
  const mensualiteCredit = mensualitePret(emprunt, params.tauxPct, params.dureeAnnees);
  const mensualiteAssurance = (emprunt * (params.assuranceEmprunteurPct / 100)) / 12;
  const mensualiteTotale = mensualiteCredit + mensualiteAssurance;

  const serie: AcheterLouerPoint[] = [];

  let capitalRestant = emprunt;
  let coutProprietaireCumule = prixBien * (params.fraisNotairePct / 100);
  let loyersCumules = 0;
  let valeurBien = prixBien;
  let loyerCourant = params.loyerMensuel;
  let investi = params.apport;

  const tauxMensuel = params.tauxPct / 100 / 12;

  for (let annee = 1; annee <= params.horizonAnnees; annee += 1) {
    let interetsAnnee = 0;
    for (let mois = 0; mois < 12; mois += 1) {
      if (annee <= params.dureeAnnees && capitalRestant > 0) {
        const interets = capitalRestant * tauxMensuel;
        const principal = Math.min(mensualiteCredit - interets, capitalRestant);
        capitalRestant -= principal;
        interetsAnnee += interets;
      }
    }

    const assuranceAnnee = annee <= params.dureeAnnees ? mensualiteAssurance * 12 : 0;
    const chargesAnnee = params.charges + params.entretien;
    coutProprietaireCumule += interetsAnnee + assuranceAnnee + chargesAnnee;

    const loyerAnnee = loyerCourant * 12;
    loyersCumules += loyerAnnee;

    const mensualiteProprietaire = (annee <= params.dureeAnnees ? mensualiteTotale : 0) + chargesAnnee / 12;
    const differentielMensuel = mensualiteProprietaire - loyerCourant;
    investi *= 1 + params.rendementPlacementPct / 100;
    if (differentielMensuel > 0) investi += differentielMensuel * 12;

    valeurBien *= 1 + params.revalorisationBienPct / 100;
    loyerCourant *= 1 + params.revalorisationLoyerPct / 100;

    const netProprietaire = valeurBien - Math.max(0, capitalRestant) - coutProprietaireCumule - params.apport;
    const netLocataire = investi - loyersCumules;
    const patrimoineNet = netProprietaire - netLocataire;

    serie.push({
      annee,
      coutProprietaire: Math.round(coutProprietaireCumule + params.apport),
      coutLocataire: Math.round(loyersCumules),
      patrimoineNet: Math.round(patrimoineNet),
    });
  }

  const seuilRentabilite = serie.find((p) => p.patrimoineNet >= 0)?.annee ?? null;

  return {
    prixBien,
    coutTotalAchat,
    emprunt,
    mensualiteCredit,
    mensualiteAssurance,
    mensualiteTotale,
    ecartVsLoyer: mensualiteTotale - params.loyerMensuel,
    seuilRentabilite,
    serie,
  };
}
