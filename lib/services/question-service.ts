import type { EditorLanguage, RunCodeResult, SubmitCodeResult, CodeRunnerResponse } from "@/lib/types";

type QuestionResponse = {
  data?: import("@/lib/types").CodingQuestion;
  error?: string;
};

type RunPayload = {
  questionId: string;
  language: EditorLanguage;
  code: string;
  input?: string;
  customTestCases?: { input: string; expectedOutput: string }[];
};

type SubmitPayload = Omit<RunPayload, "customTestCases">;

export async function fetchQuestionById(questionId: string, signal?: AbortSignal) {
  const response = await fetch(`/api/problems/${questionId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  const payload = (await response.json()) as QuestionResponse;
  if (!response.ok || !payload.data) {
    throw new Error(payload.error ?? "Unable to load question details.");
  }

  return payload.data;
}

export async function runQuestionCode(payload: RunPayload): Promise<RunCodeResult> {
  const response = await fetch(`/api/coderunner/${payload.questionId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: payload.code,
      language: payload.language,
      action: "run",
      problemType: "PRACTICE",
      customTestCases: payload.customTestCases ?? [],
    }),
  });

  const data: CodeRunnerResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Code execution failed.");
  }

  // Map unified response → existing RunCodeResult shape
  const outputLines = data.results
    .map((r, i) => `Test ${i + 1}: ${r.passed ? "✓ Passed" : "✗ Failed"} | Output: ${r.actualOutput.trim()}`)
    .join("\n");

  return {
    status: "success",
    stdout: outputLines,
    runtimeMs: 0,
  };
}

export async function submitQuestionCode(payload: SubmitPayload): Promise<SubmitCodeResult> {
  const response = await fetch(`/api/coderunner/${payload.questionId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: payload.code,
      language: payload.language,
      action: "submit",
      problemType: "PRACTICE",
    }),
  });

  const data: CodeRunnerResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? "Submission failed.");
  }

  return {
    status: data.verdict === "Accepted" ? "Accepted" : data.verdict === "Runtime Error" ? "Runtime Error" : "Wrong Answer",
    message: `${data.passed}/${data.totalTests} test cases passed.`,
    runtimeMs: 0,
    memoryMb: 0,
  };
}
