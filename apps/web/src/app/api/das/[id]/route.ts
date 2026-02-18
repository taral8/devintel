import { NextRequest, NextResponse } from "next/server";
import { MOCK_DAS } from "@/lib/mock-das";
import { findSimilarProjects, computeApprovalScore } from "@/lib/scoring";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const da = MOCK_DAS.find((d) => d.id === params.id);
  if (!da) {
    return NextResponse.json({ detail: "DA not found" }, { status: 404 });
  }

  const similar_projects = findSimilarProjects(da.id);
  const approval_score = computeApprovalScore(da.id);

  return NextResponse.json({ ...da, similar_projects, approval_score });
}
