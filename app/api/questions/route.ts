import { getProblemById } from "@/lib/data";
import { CodingQuestion } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{ problemId: string }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { problemId } = await params;

    try {
        const problems = await getProblemById(problemId)

        if (!problems) {
            return NextResponse.json({ error: "Problem not found" }, { status: 404 })
        }

        const question: CodingQuestion = {
            constraints: problems?.constraints,
            description: problems?.description,
            difficulty: problems?.difficulty,
            id: problems?.id,
            samples: problems?.samples,
            starterCode: problems?.starterCode,
            title: problems?.title,
        }

        return NextResponse.json({ data: problems }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
    }
}