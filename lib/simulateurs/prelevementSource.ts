// Simulateur de prélèvement à la source — barème 2026 (revenus 2025), pure calc.
// Porté depuis simulateur-prelevement-source.html (mêmes formules et taux forfaitaires).

export type Situation = "celibataire" | "couple" | "parent_isole";
export type RevenuMode = "avant" | "apres" | "brut";
export type Statut = "cadre" | "nonCadre";

export interface PrelevementSourceParams {
  situation: Situation;
  nbEnfants: number;
  mode: RevenuMode;
  /** Revenu annuel du foyer, utilisé pour mode "avant" (net imposable avant abattement 10%) et "apres" (déjà après abattement). */
  revenu: number;
  /** Salaire brut annuel du foyer, utilisé pour mode "brut". */
  brutAnnuel: number;
  /** Statut du foyer, utilisé pour mode "brut". */
  statut: Statut;
}

export interface PrelevementSourceResult {
  parts: number;
  revenuAvant: number;
  revenuApres: number;
  abattement: number;
  impotBrut: number;
  decote: number;
  cehr: number;
  impotNet: number;
  /** Taux de prélèvement à la source, en % (arrondi à 0,1 point comme sur impots.gouv.fr). */
  taux: number;
  /** Tranche marginale d'imposition, en %. */
  tmi: number;
}

const BRACKETS = [
  { max: 11600, rate: 0 },
  { max: 29580, rate: 0.11 },
  { max: 84578, rate: 0.3 },
  { max: 181917, rate: 0.41 },
  { max: Infinity, rate: 0.45 },
];

// Taux forfaitaires brut -> net (salarié, ordres de grandeur) :
//  - Net social (net avant impôt, ce qui est réellement versé) ≈ 78 % du brut (non-cadre) / 75 % (cadre)
//  - Net imposable (base retenue pour l'impôt) = net social + CSG/CRDS non déductibles (~2,85 % du brut,
//    car ces prélèvements sont retirés du brut mais réintégrés dans le revenu imposable) ≈ 81 % (non-cadre) / 78 % (cadre)
const BRUT_RATES: Record<Statut, { net: number; imposable: number }> = {
  nonCadre: { net: 0.78, imposable: 0.81 },
  cadre: { net: 0.75, imposable: 0.78 },
};

export function computeParts(situation: Situation, nbEnfants: number): number {
  const base = situation === "couple" ? 2 : 1;
  let childShare = 0;
  for (let i = 1; i <= nbEnfants; i++) childShare += i <= 2 ? 0.5 : 1;
  const isoleBonus = situation === "parent_isole" && nbEnfants > 0 ? 0.5 : 0;
  return base + childShare + isoleBonus;
}

function taxForParts(revenu: number, parts: number): number {
  if (revenu <= 0 || parts <= 0) return 0;
  const per = revenu / parts;
  let tax = 0;
  let prev = 0;
  for (const b of BRACKETS) {
    if (per > prev) tax += (Math.min(per, b.max) - prev) * b.rate;
    prev = b.max;
  }
  return tax * parts;
}

function plafonnement(revenu: number, parts: number, situation: Situation): number {
  const refParts = situation === "couple" ? 2 : 1;
  const isIsole = situation === "parent_isole";
  const taxActual = taxForParts(revenu, parts);
  if (parts <= refParts) return taxActual;
  const taxRef = taxForParts(revenu, refParts);
  const avantage = taxRef - taxActual;
  const totalHalfParts = Math.round((parts - refParts) * 2);
  let plafond: number;
  if (isIsole) {
    plafond = totalHalfParts <= 2 ? 4262 * (totalHalfParts / 2) : 4262 + 1807 * (totalHalfParts - 2);
  } else {
    plafond = 1807 * totalHalfParts;
  }
  return avantage > plafond ? Math.max(0, taxRef - plafond) : taxActual;
}

function decoteFn(impot: number, situation: Situation): number {
  const isCouple = situation === "couple";
  const maxD = isCouple ? 1483 : 897;
  const seuil = isCouple ? 3277 : 1982;
  if (impot >= seuil) return 0;
  return Math.max(0, maxD - impot * 0.4525);
}

function cehrFn(rfr: number, situation: Situation): number {
  const isCouple = situation === "couple";
  const brackets = isCouple
    ? [
        { max: 500000, rate: 0 },
        { max: 1000000, rate: 0.03 },
        { max: Infinity, rate: 0.04 },
      ]
    : [
        { max: 250000, rate: 0 },
        { max: 500000, rate: 0.03 },
        { max: 1000000, rate: 0.04 },
        { max: Infinity, rate: 0.04 },
      ];
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (rfr > prev) tax += (Math.min(rfr, b.max) - prev) * b.rate;
    prev = b.max;
  }
  return tax;
}

function applyAbattement(revenuAvant: number, nbAdults: number): { abattement: number; revenuApres: number } {
  if (revenuAvant <= 0) return { abattement: 0, revenuApres: 0 };
  const min = 504 * nbAdults;
  const max = 14426 * nbAdults;
  let ab = revenuAvant * 0.1;
  ab = Math.min(Math.max(ab, min), max);
  ab = Math.min(ab, revenuAvant);
  return { abattement: Math.round(ab), revenuApres: Math.round(revenuAvant - ab) };
}

export const DEFAULT_PRELEVEMENT_SOURCE_PARAMS: PrelevementSourceParams = {
  situation: "celibataire",
  nbEnfants: 0,
  mode: "avant",
  revenu: 35000,
  brutAnnuel: 45000,
  statut: "nonCadre",
};

export function simulerPrelevementSource(params: PrelevementSourceParams): PrelevementSourceResult {
  const nbAdults = params.situation === "couple" ? 2 : 1;
  const parts = computeParts(params.situation, params.nbEnfants);

  let revenuAvant: number;
  let revenuApres: number;
  let abattement = 0;

  if (params.mode === "brut") {
    const rates = BRUT_RATES[params.statut];
    revenuAvant = params.brutAnnuel * rates.imposable;
    const ab = applyAbattement(revenuAvant, nbAdults);
    revenuApres = ab.revenuApres;
    abattement = ab.abattement;
  } else if (params.mode === "avant") {
    revenuAvant = params.revenu;
    const ab = applyAbattement(revenuAvant, nbAdults);
    revenuApres = ab.revenuApres;
    abattement = ab.abattement;
  } else {
    revenuApres = params.revenu;
    revenuAvant = params.revenu;
  }

  const impotBrut = plafonnement(revenuApres, parts, params.situation);
  const dec = decoteFn(impotBrut, params.situation);
  const impotApresDecote = Math.max(0, impotBrut - dec);
  const cehrVal = cehrFn(revenuApres, params.situation);
  const impotNet = impotApresDecote + cehrVal;

  const tauxBrut = revenuAvant > 0 ? (impotNet / revenuAvant) * 100 : 0;
  const taux = Math.max(0, Math.floor(tauxBrut * 10) / 10);

  const perPart = parts > 0 ? revenuApres / parts : 0;
  let tmi = 0;
  if (perPart > 181917) tmi = 45;
  else if (perPart > 84578) tmi = 41;
  else if (perPart > 29580) tmi = 30;
  else if (perPart > 11600) tmi = 11;

  return { parts, revenuAvant, revenuApres, abattement, impotBrut, decote: dec, cehr: cehrVal, impotNet, taux, tmi };
}
