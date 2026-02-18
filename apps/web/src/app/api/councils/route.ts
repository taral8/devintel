import { NextResponse } from "next/server";

const VALID_COUNCILS = ["Parramatta", "Blacktown", "Hornsby"];

export async function GET() {
  return NextResponse.json(VALID_COUNCILS);
}
