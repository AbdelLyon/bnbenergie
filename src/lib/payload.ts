/**
 * Payload API Client
 */

const PAYLOAD_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000';

/**
 * Get Pricing Packs
 */
export async function getPricingPacks() {
  const res = await fetch(`${PAYLOAD_URL}/api/pricing-packs?sort=order`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch pricing packs');
  return res.json();
}

/**
 * Get Projects
 */
export async function getProjects() {
  const res = await fetch(`${PAYLOAD_URL}/api/projects?sort=order`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

/**
 * Get Stats
 */
export async function getStats() {
  const res = await fetch(`${PAYLOAD_URL}/api/stats?sort=order`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

/**
 * Get About Cards
 */
export async function getAboutCards() {
  const res = await fetch(`${PAYLOAD_URL}/api/about-cards?sort=order`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch about cards');
  return res.json();
}

/**
 * Get Benefits
 */
export async function getBenefits() {
  const res = await fetch(`${PAYLOAD_URL}/api/benefits?sort=order`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch benefits');
  return res.json();
}

/**
 * Get FAQs
 */
export async function getFAQs(category?: string) {
  const url = category
    ? `${PAYLOAD_URL}/api/faqs?where[category][equals]=${category}&sort=order`
    : `${PAYLOAD_URL}/api/faqs?sort=order`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch FAQs');
  return res.json();
}
