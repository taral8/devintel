import { NextResponse } from "next/server";
import { MOCK_DAS } from "@/lib/mock-das";

const VALID_COUNCILS = ["Parramatta", "Blacktown", "Hornsby"];

export async function GET() {
  const councils = VALID_COUNCILS.map((name) => {
    const das = MOCK_DAS.filter((d) => d.council === name);
    const total = das.length;
    const approved = das.filter((d) => d.DA_outcome === "Approved").length;
    const refused = das.filter((d) => d.DA_outcome === "Refused").length;
    const deferred = das.filter((d) => d.DA_outcome === "Deferred").length;
    const under_assessment = das.filter(
      (d) => d.DA_outcome === "Under Assessment"
    ).length;
    const approval_rate = total > 0 ? Math.round((approved / total) * 1000) / 10 : 0;

    return {
      name,
      total_das: total,
      approved,
      refused,
      deferred,
      under_assessment,
      approval_rate,
    };
  });

  const total_das = MOCK_DAS.length;
  const overall_approved = MOCK_DAS.filter(
    (d) => d.DA_outcome === "Approved"
  ).length;
  const overall_approval_rate =
    total_das > 0
      ? Math.round((overall_approved / total_das) * 1000) / 10
      : 0;

  return NextResponse.json({ total_das, overall_approval_rate, councils });
}
