import { NextRequest, NextResponse } from "next/server";
import { MOCK_DAS } from "@/lib/mock-das";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const council = searchParams.get("council");
  const zoning = searchParams.get("zoning");
  const outcome = searchParams.get("outcome");

  let results = MOCK_DAS;
  if (council) {
    results = results.filter(
      (d) => d.council.toLowerCase() === council.toLowerCase()
    );
  }
  if (zoning) {
    results = results.filter(
      (d) => d.zoning.toLowerCase() === zoning.toLowerCase()
    );
  }
  if (outcome) {
    results = results.filter(
      (d) => d.DA_outcome.toLowerCase() === outcome.toLowerCase()
    );
  }

  return NextResponse.json({ total: results.length, results });
}
