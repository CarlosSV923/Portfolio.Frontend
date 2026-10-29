// Vercel sets VERCEL_PROJECT_PRODUCTION_URL on every deployment, previews
// included, so canonical and hreflang URLs always point at production.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  productionHost ? `https://${productionHost}` : "http://localhost:3000",
);
