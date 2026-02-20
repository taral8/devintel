// ─────────────────────────────────────────────────────────────────
// CivroDA — Risk Engine
// Computes deterministic risk drivers from existing DA fields.
// NOTE: This is an indicative model, not predictive legal advice.
// ─────────────────────────────────────────────────────────────────

import { MOCK_DAS } from "./mock-das";
import type { DADetail, SimilarProject } from "./types";

function parseNumeric(value: string): number {
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export type RiskLevel = "Low" | "Moderate" | "High";

export interface RiskDriver {
  factor: string;
  detail: string;
}

export interface RiskProfile {
  score: number;
  level: RiskLevel;
  drivers: RiskDriver[];
}

/**
 * Compute a deterministic risk level from the approval score.
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return "Low";
  if (score >= 40) return "Moderate";
  return "High";
}

/**
 * Compute the top risk drivers for a DA based on its fields and
 * comparison to similar projects in the same council.
 */
export function computeRiskDrivers(da: DADetail): RiskDriver[] {
  const drivers: RiskDriver[] = [];
  const councilDAs = MOCK_DAS.filter(
    (d) => d.council === da.council && d.id !== da.id
  );

  // 1. Height variation analysis
  const daHeight = parseNumeric(da.height);
  const councilHeights = councilDAs.map((d) => parseNumeric(d.height));
  if (councilHeights.length > 0) {
    const avgHeight =
      councilHeights.reduce((a, b) => a + b, 0) / councilHeights.length;
    if (daHeight > avgHeight * 1.15) {
      drivers.push({
        factor: "Height Variation",
        detail: `Proposed height (${da.height}) exceeds council average by ${Math.round(((daHeight - avgHeight) / avgHeight) * 100)}%.`,
      });
    }
  }

  // 2. FSR variation analysis
  const daFSR = parseNumeric(da.FSR);
  const councilFSRs = councilDAs.map((d) => parseNumeric(d.FSR));
  if (councilFSRs.length > 0) {
    const avgFSR =
      councilFSRs.reduce((a, b) => a + b, 0) / councilFSRs.length;
    if (daFSR > avgFSR * 1.1) {
      drivers.push({
        factor: "FSR Sensitivity",
        detail: `FSR ${da.FSR} is above the council area average (${avgFSR.toFixed(1)}:1).`,
      });
    }
  }

  // 3. Zoning refusal rate
  const sameZone = councilDAs.filter((d) => d.zoning === da.zoning);
  if (sameZone.length >= 2) {
    const zoneRefusals = sameZone.filter(
      (d) => d.DA_outcome === "Refused"
    ).length;
    const refusalRate = zoneRefusals / sameZone.length;
    if (refusalRate > 0.3) {
      drivers.push({
        factor: "Zoning Refusal Rate",
        detail: `${Math.round(refusalRate * 100)}% of ${da.zoning} zone applications in ${da.council} have been refused.`,
      });
    }
  }

  // 4. Land size deviation
  const daLand = parseNumeric(da.land_size);
  const councilLands = councilDAs.map((d) => parseNumeric(d.land_size));
  if (councilLands.length > 0) {
    const avgLand =
      councilLands.reduce((a, b) => a + b, 0) / councilLands.length;
    if (daLand < avgLand * 0.6) {
      drivers.push({
        factor: "Undersized Lot",
        detail: `Land size (${da.land_size}) is significantly below the council area average.`,
      });
    }
  }

  // 5. Similar project refusal pattern
  const refusedSimilar = da.similar_projects.filter(
    (p) => p.DA_outcome === "Refused"
  );
  if (refusedSimilar.length >= 2) {
    drivers.push({
      factor: "Comparable Refusals",
      detail: `${refusedSimilar.length} of ${da.similar_projects.length} comparable precedents were refused.`,
    });
  }

  // 6. Deferred pattern (uncertainty signal)
  const deferredSimilar = da.similar_projects.filter(
    (p) => p.DA_outcome === "Deferred"
  );
  if (deferredSimilar.length >= 2) {
    drivers.push({
      factor: "Deferral Pattern",
      detail: `${deferredSimilar.length} comparable precedents were deferred, indicating council uncertainty in this area.`,
    });
  }

  // If no drivers found, return a positive signal
  if (drivers.length === 0) {
    drivers.push({
      factor: "Consistent Precedent",
      detail:
        "No significant deviation from approved precedents in this council area.",
    });
  }

  return drivers.slice(0, 3);
}

/**
 * Full risk profile for a DA.
 */
export function computeRiskProfile(da: DADetail): RiskProfile {
  return {
    score: da.approval_score,
    level: getRiskLevel(da.approval_score),
    drivers: computeRiskDrivers(da),
  };
}

/**
 * Extract common refusal themes from a council's refused DAs.
 */
export function getRefusalThemes(councilName: string): string[] {
  const refused = MOCK_DAS.filter(
    (d) => d.council === councilName && d.DA_outcome === "Refused"
  );
  if (refused.length === 0) return ["No refusal data available for this council."];

  // Aggregate conditions as themes
  const allConditions = refused.flatMap((d) => d.key_conditions);
  // Deduplicate and return top 3
  const unique = Array.from(new Set(allConditions));
  return unique.slice(0, 3);
}

/**
 * Extract common consent conditions from a council's approved DAs.
 */
export function getConsentConditionThemes(councilName: string): string[] {
  const approved = MOCK_DAS.filter(
    (d) => d.council === councilName && d.DA_outcome === "Approved"
  );
  if (approved.length === 0)
    return ["No approval data available for this council."];

  const allConditions = approved.flatMap((d) => d.key_conditions);
  const unique = Array.from(new Set(allConditions));
  return unique.slice(0, 3);
}
