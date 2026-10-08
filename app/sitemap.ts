import type { MetadataRoute } from "next";

const baseUrl = "https://www.bricepoitau.com";

const routes = [
  "",
  "/simulateurs",
  "/simulateurs/assurance-vie",
  "/simulateurs/scpi",
  "/simulateurs/per",
  "/simulateurs/comparateur-contrats",
  "/simulateurs/acheter-louer",
  "/simulateurs/une-pierre-deux-coups",
  "/simulateurs/prelevement-source",
  "/simulateurs/mon-budget",
  "/simulateurs/vases-communicants",
  "/ressources",
  "/a-propos",
  "/rdv",
  "/mentions-legales",
  "/politique-confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
