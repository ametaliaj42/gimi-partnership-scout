/*
 * Scout service — abstracts the data source behind a single async function.
 *
 * SWITCHING TO LIVE API
 * ─────────────────────
 * 1. Set VITE_API_URL in your environment (see frontend/.env.example).
 * 2. Change USE_MOCK below to false.
 * 3. Uncomment the env block in .github/workflows/deploy.yml and add
 *    VITE_API_URL as a repository secret in GitHub Actions.
 * 4. Ensure the Express backend is deployed and its /health endpoint responds.
 */

import { MOCK_RECOMMENDATIONS } from '../mock/recommendations.js';

const USE_MOCK = true;

const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Fetches partnership recommendations for the given form parameters.
 *
 * @param {{ partnerType: string, region: string, sectorFocus?: string, similarTo?: string, numRecommendations: number }} params
 * @returns {Promise<{ recommendations: object[] }>}
 */
export async function scoutPartners(params) {
  if (USE_MOCK) {
    return simulateMock(params);
  }
  return fetchLive(params);
}

/* ── Mock ────────────────────────────────────────────────────────────────── */

async function simulateMock({ numRecommendations }) {
  // Artificial delay so loading states are visible during demos.
  await delay(2200);
  return {
    recommendations: MOCK_RECOMMENDATIONS.slice(
      0,
      Math.min(numRecommendations, MOCK_RECOMMENDATIONS.length)
    ),
  };
}

/* ── Live API ─────────────────────────────────────────────────────────────── */

async function fetchLive(params) {
  if (!API_BASE) {
    throw new Error(
      'VITE_API_URL is not set. Add it to your environment and rebuild.'
    );
  }

  const response = await fetch(`${API_BASE}/api/scout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.recommendations)) {
    throw new Error('Unexpected response structure from the API.');
  }

  return data;
}

/* ── Utilities ────────────────────────────────────────────────────────────── */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
