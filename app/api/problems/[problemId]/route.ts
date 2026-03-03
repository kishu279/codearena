import { NextRequest, NextResponse } from "next/server";
import { getCodingQuestion } from "@/lib/data";

type RouteContext = {
  params: Promise<{ problemId: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { problemId } = await params;

  try {
    const problem = await getCodingQuestion(problemId);

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    return NextResponse.json({ data: problem }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch problem", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
