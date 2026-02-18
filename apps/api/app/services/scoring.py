"""
Rule-based similarity scoring and approval likelihood engine.

Weights:
  - Zoning match:  40%  (exact = 1.0, same prefix = 0.5, else 0)
  - Land size:     20%  (proximity ratio)
  - Height:        20%  (proximity ratio)
  - FSR:           20%  (proximity ratio)
"""

import re
from app.data.mock_das import MOCK_DAS


def _parse_numeric(value: str) -> float:
    """Extract the first numeric value from a string like '450 sqm' or '3.5:1'."""
    match = re.search(r"[\d.]+", value)
    return float(match.group()) if match else 0.0


def _zoning_similarity(z1: str, z2: str) -> float:
    if z1 == z2:
        return 1.0
    # Same category prefix (e.g. R2 vs R3 → both R)
    if z1 and z2 and z1[0] == z2[0]:
        return 0.5
    return 0.0


def _numeric_similarity(v1: float, v2: float, max_range: float) -> float:
    if max_range == 0:
        return 1.0
    return max(0.0, 1.0 - abs(v1 - v2) / max_range)


def compute_similarity(da1: dict, da2: dict) -> float:
    """Compute weighted similarity score (0–1) between two DA records."""
    zoning_score = _zoning_similarity(da1["zoning"], da2["zoning"])

    land1 = _parse_numeric(da1["land_size"])
    land2 = _parse_numeric(da2["land_size"])
    land_score = _numeric_similarity(land1, land2, 5000.0)

    height1 = _parse_numeric(da1["height"])
    height2 = _parse_numeric(da2["height"])
    height_score = _numeric_similarity(height1, height2, 45.0)

    fsr1 = _parse_numeric(da1["FSR"])
    fsr2 = _parse_numeric(da2["FSR"])
    fsr_score = _numeric_similarity(fsr1, fsr2, 4.0)

    return (
        0.40 * zoning_score
        + 0.20 * land_score
        + 0.20 * height_score
        + 0.20 * fsr_score
    )


def find_similar_projects(da_id: str, limit: int = 5) -> list[dict]:
    """Find the most similar DAs within the same council, excluding the target DA."""
    target = next((da for da in MOCK_DAS if da["id"] == da_id), None)
    if not target:
        return []

    candidates = []
    for da in MOCK_DAS:
        if da["id"] == da_id:
            continue
        if da["council"] != target["council"]:
            continue
        score = compute_similarity(target, da)
        candidates.append(
            {
                "address": da["address"],
                "council": da["council"],
                "DA_outcome": da["DA_outcome"],
                "key_conditions": da["key_conditions"],
                "similarity_score": round(score, 2),
            }
        )

    candidates.sort(key=lambda x: x["similarity_score"], reverse=True)
    return candidates[:limit]


def compute_approval_score(da_id: str) -> int:
    """
    Generate an approval likelihood score (0–100).

    Method: weighted average of outcomes of similar projects,
    where each project's vote is weighted by its similarity score.
    Approved = 1, Deferred = 0.5, Refused/Under Assessment = 0.
    """
    similar = find_similar_projects(da_id, limit=5)
    if not similar:
        return 50  # neutral when no comparables

    outcome_value = {
        "Approved": 1.0,
        "Deferred": 0.5,
        "Refused": 0.0,
        "Under Assessment": 0.3,
    }

    weighted_sum = 0.0
    weight_total = 0.0
    for proj in similar:
        w = proj["similarity_score"]
        v = outcome_value.get(proj["DA_outcome"], 0.3)
        weighted_sum += w * v
        weight_total += w

    if weight_total == 0:
        return 50

    raw = weighted_sum / weight_total
    return min(100, max(0, round(raw * 100)))
