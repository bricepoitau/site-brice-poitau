import type { MetadataRoute } from "next";

const baseUrl = "https://www.bricepoitau-conseils.fr";

const routes = [
  "",
  "/simulateurs",
  "/simulateurs/assurance-vie",
  "/simulateurs/comparateur-contrats",
  "/simulateurs/acheter-louer",
  "/simulateurs/une-pierre-deux-coups",
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
