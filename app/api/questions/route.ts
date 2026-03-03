import { getProblemById, getCodingQuestion } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ problemId: string }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { problemId } = await params;

    try {
        const problem = await getCodingQuestion(problemId);

        if (!problem) {
            return NextResponse.json({ error: "Problem not found" }, { status: 404 });
        }

        return NextResponse.json({ data: problem }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
    }
}