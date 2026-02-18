from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from app.data.mock_das import MOCK_DAS
from app.models.schemas import (
    DABase,
    DADetail,
    DAListResponse,
    CouncilInfo,
    StatsResponse,
)
from app.services.scoring import find_similar_projects, compute_approval_score
from app.services.pdf_generator import generate_da_report_pdf

router = APIRouter(prefix="/api", tags=["das"])

VALID_COUNCILS = ["Parramatta", "Blacktown", "Hornsby"]


@router.get("/councils", response_model=list[str])
def list_councils():
    return VALID_COUNCILS


@router.get("/das", response_model=DAListResponse)
def list_das(
    council: str | None = Query(None, description="Filter by council name"),
    zoning: str | None = Query(None, description="Filter by zoning code"),
    outcome: str | None = Query(None, description="Filter by DA outcome"),
):
    results = MOCK_DAS
    if council:
        results = [d for d in results if d["council"].lower() == council.lower()]
    if zoning:
        results = [d for d in results if d["zoning"].lower() == zoning.lower()]
    if outcome:
        results = [d for d in results if d["DA_outcome"].lower() == outcome.lower()]
    return DAListResponse(total=len(results), results=results)


@router.get("/das/{da_id}", response_model=DADetail)
def get_da(da_id: str):
    da = next((d for d in MOCK_DAS if d["id"] == da_id), None)
    if not da:
        raise HTTPException(status_code=404, detail="DA not found")

    similar = find_similar_projects(da_id)
    score = compute_approval_score(da_id)
    return DADetail(**da, similar_projects=similar, approval_score=score)


@router.get("/stats", response_model=StatsResponse)
def get_stats():
    councils = []
    for name in VALID_COUNCILS:
        das = [d for d in MOCK_DAS if d["council"] == name]
        total = len(das)
        approved = sum(1 for d in das if d["DA_outcome"] == "Approved")
        refused = sum(1 for d in das if d["DA_outcome"] == "Refused")
        deferred = sum(1 for d in das if d["DA_outcome"] == "Deferred")
        under = sum(1 for d in das if d["DA_outcome"] == "Under Assessment")
        rate = (approved / total * 100) if total > 0 else 0
        councils.append(
            CouncilInfo(
                name=name,
                total_das=total,
                approved=approved,
                refused=refused,
                deferred=deferred,
                under_assessment=under,
                approval_rate=round(rate, 1),
            )
        )

    total = len(MOCK_DAS)
    overall_approved = sum(1 for d in MOCK_DAS if d["DA_outcome"] == "Approved")
    overall_rate = (overall_approved / total * 100) if total > 0 else 0

    return StatsResponse(
        total_das=total,
        overall_approval_rate=round(overall_rate, 1),
        councils=councils,
    )


@router.get("/das/{da_id}/report.pdf")
def get_da_report_pdf(da_id: str):
    """Download PDF report for a DA"""
    try:
        da = next((d for d in MOCK_DAS if d["id"] == da_id), None)
        if not da:
            raise HTTPException(status_code=404, detail="DA not found")
        
        # Get similar projects and approval score
        similar = find_similar_projects(da_id)
        score = compute_approval_score(da_id)
        
        # Generate PDF
        pdf_buffer = generate_da_report_pdf(da_id, approval_score=score, similar_projects=similar)
        
        return StreamingResponse(
            iter([pdf_buffer.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={da_id}-determination.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
