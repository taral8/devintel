import { NextRequest, NextResponse } from "next/server";
import { MOCK_DAS } from "@/lib/mock-das";
import { findSimilarProjects, computeApprovalScore } from "@/lib/scoring";
import { generateDAReportPDF } from "@/lib/pdf-generator";
import type { DADetail } from "@/lib/types";

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

  const daDetail: DADetail = {
    ...da,
    similar_projects,
    approval_score,
  };

  const pdfBytes = await generateDAReportPDF(daDetail);

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${da.id}-determination.pdf"`,
      "Content-Length": pdfBytes.length.toString(),
    },
  });
}
