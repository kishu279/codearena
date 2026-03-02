import { NextRequest, NextResponse } from "next/server";

import { getCodingQuestion } from "@/lib/data";

type RouteContext = {
    params: Promise<{ problemId: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
    const { problemId } = await params;

    try {
        const question = getCodingQuestion(problemId);

        if (!question) {
            return NextResponse.json(
                { error: `Problem "${problemId}" not found.` },
                { status: 404 },
            );
        }

        return NextResponse.json({ data: question });
    } catch (error) {
        console.error(`[problems/${problemId}]`, error);
        return NextResponse.json(
            { error: "Failed to fetch problem details." },
            { status: 500 },
        );
    }
}
