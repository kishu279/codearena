import type { EditorLanguage, RunCodeResult, SubmitCodeResult, CodeRunnerResponse } from "@/lib/types";

type ContestRunPayload = {
    contestId: string;
    problemId: string;
    language: EditorLanguage;
    code: string;
    input?: string;
    customTestCases?: { input: string; expectedOutput: string }[];
};

type ContestSubmitPayload = Omit<ContestRunPayload, "customTestCases">;

export async function runContestCode(payload: ContestRunPayload): Promise<RunCodeResult> {
    const response = await fetch(`/api/coderunner/${payload.problemId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: payload.code,
            language: payload.language,
            action: "run",
            problemType: "CONTEST",
            contestId: payload.contestId,
            customTestCases: payload.customTestCases ?? [],
        }),
    });

    const data: CodeRunnerResponse = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Contest code execution failed.");
    }

    const outputLines = data.results
        .map((r, i) => `Test ${i + 1}: ${r.passed ? "✓ Passed" : "✗ Failed"} | Output: ${r.actualOutput.trim()}`)
        .join("\n");

    return {
        status: "success",
        stdout: outputLines,
        runtimeMs: 0,
    };
}

export async function submitContestCode(payload: ContestSubmitPayload): Promise<SubmitCodeResult> {
    const response = await fetch(`/api/coderunner/${payload.problemId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: payload.code,
            language: payload.language,
            action: "submit",
            problemType: "CONTEST",
            contestId: payload.contestId,
        }),
    });

    const data: CodeRunnerResponse = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Contest submission failed.");
    }

    return {
        status: data.verdict === "Accepted" ? "Accepted" : data.verdict === "Runtime Error" ? "Runtime Error" : "Wrong Answer",
        message: `${data.passed}/${data.totalTests} test cases passed for contest ${payload.contestId}, problem ${payload.problemId}.`,
        runtimeMs: 0,
        memoryMb: 0,
    };
}
