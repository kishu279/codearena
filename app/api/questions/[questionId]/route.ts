import { NextResponse } from "next/server";

import { getCodingQuestion } from "@/lib/data";

type QuestionRouteContext = {
  params: Promise<{ questionId: string }>;
};

export async function GET(_request: Request, { params }: QuestionRouteContext) {
  const { questionId } = await params;
  const question = getCodingQuestion(questionId);

  if (!question) {
    return NextResponse.json({ error: `Question ${questionId} was not found.` }, { status: 404 });
  }

  return NextResponse.json({ data: question });
}
