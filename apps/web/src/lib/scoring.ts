import { MOCK_DAS } from "./mock-das";
import type { DA, SimilarProject } from "./types";

function parseNumeric(value: string): number {
  const match = value.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function zoningSimilarity(z1: string, z2: string): number {
  if (z1 === z2) return 1.0;
  if (z1 && z2 && z1[0] === z2[0]) return 0.5;
  return 0;
}

function numericSimilarity(v1: number, v2: number, maxRange: number): number {
  if (maxRange === 0) return 1.0;
  return Math.max(0, 1 - Math.abs(v1 - v2) / maxRange);
}

export function computeSimilarity(da1: DA, da2: DA): number {
  const zoningScore = zoningSimilarity(da1.zoning, da2.zoning);
  const landScore = numericSimilarity(
    parseNumeric(da1.land_size),
    parseNumeric(da2.land_size),
    5000
  );
  const heightScore = numericSimilarity(
    parseNumeric(da1.height),
    parseNumeric(da2.height),
    45
  );
  const fsrScore = numericSimilarity(
    parseNumeric(da1.FSR),
    parseNumeric(da2.FSR),
    4
  );

  return 0.4 * zoningScore + 0.2 * landScore + 0.2 * heightScore + 0.2 * fsrScore;
}

export function findSimilarProjects(daId: string, limit = 5): SimilarProject[] {
  const target = MOCK_DAS.find((da) => da.id === daId);
  if (!target) return [];

  const candidates: SimilarProject[] = [];
  for (const da of MOCK_DAS) {
    if (da.id === daId || da.council !== target.council) continue;
    const score = computeSimilarity(target, da);
    candidates.push({
      address: da.address,
      council: da.council,
      DA_outcome: da.DA_outcome,
      key_conditions: da.key_conditions,
      similarity_score: Math.round(score * 100) / 100,
    });
  }

  candidates.sort((a, b) => b.similarity_score - a.similarity_score);
  return candidates.slice(0, limit);
}

export function computeApprovalScore(daId: string): number {
  const similar = findSimilarProjects(daId, 5);
  if (similar.length === 0) return 50;

  const outcomeValue: Record<string, number> = {
    Approved: 1.0,
    Deferred: 0.5,
    Refused: 0.0,
    "Under Assessment": 0.3,
  };

  let weightedSum = 0;
  let weightTotal = 0;
  for (const proj of similar) {
    const w = proj.similarity_score;
    const v = outcomeValue[proj.DA_outcome] ?? 0.3;
    weightedSum += w * v;
    weightTotal += w;
  }

  if (weightTotal === 0) return 50;
  const raw = weightedSum / weightTotal;
  return Math.min(100, Math.max(0, Math.round(raw * 100)));
}
