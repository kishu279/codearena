import type {
  EditorLanguage,
  RunCodeResult,
  SubmitCodeResult,
  CodeRunnerResponse,
} from "@/lib/types";

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

export async function fetchQuestionById(
  questionId: string,
  signal?: AbortSignal,
) {
  console.log("[Client] Fetching question:", questionId);
  const response = await fetch(`/api/problems/${questionId}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  console.log("[Client] Response status:", response.status);
  console.log(
    "[Client] Response headers:",
    Object.fromEntries(response.headers.entries()),
  );

  const payload = (await response.json()) as QuestionResponse;
  console.log("[Client] Response data:", payload);

  if (!response.ok || !payload.data) {
    throw new Error(payload.error ?? "Unable to load question details.");
  }

  return payload.data;
}

export async function runQuestionCode(
  payload: RunPayload,
): Promise<RunCodeResult> {
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

  // Build per-test-case summary
  const testLines = data.results
    .map((r, i) => {
      const icon = r.passed ? "✓" : "✗";
      const label = r.passed ? "Passed" : "Failed";
      let line = `Test ${i + 1}: ${icon} ${label}`;
      line += `\n  Input:    ${r.input.trim()}`;
      line += `\n  Expected: ${r.expectedOutput.trim()}`;
      line += `\n  Output:   ${r.actualOutput.trim()}`;
      if (r.stderr) line += `\n  Stderr:   ${r.stderr.trim()}`;
      if (r.cpuTime != null) line += `  | ${r.cpuTime} ms`;
      if (r.memory != null) line += `  | ${(r.memory / 1024).toFixed(1)} KB`;
      return line;
    })
    .join("\n\n");

  // Collect stderr from any test that had it
  const stderrLines = data.results
    .filter((r) => r.stderr)
    .map((r, i) => `Test ${i + 1}: ${r.stderr!.trim()}`)
    .join("\n");

  return {
    status: "success",
    stdout: data.results.map((r) => r.actualOutput.trim()).join("\n"),
    runtimeMs: data.runtime,
    memoryBytes: data.memory,
    stderr: stderrLines,
    testSummary: testLines,
    totalTests: data.totalTests,
    passed: data.passed,
  };
}

export async function submitQuestionCode(
  payload: SubmitPayload,
): Promise<SubmitCodeResult> {
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

  // Build per-test-case summary
  const testLines = data.results
    .map((r, i) => {
      const icon = r.passed ? "✓" : "✗";
      const label = r.passed ? "Passed" : "Failed";
      let line = `Test ${i + 1}: ${icon} ${label}`;
      if (!r.passed) {
        line += `\n  Input:    ${r.input.trim()}`;
        line += `\n  Expected: ${r.expectedOutput.trim()}`;
        line += `\n  Output:   ${r.actualOutput.trim()}`;
      }
      if (r.stderr) line += `\n  Stderr:   ${r.stderr.trim()}`;
      return line;
    })
    .join("\n");

  const stderrLines = data.results
    .filter((r) => r.stderr)
    .map((r, i) => `Test ${i + 1}: ${r.stderr!.trim()}`)
    .join("\n");

  return {
    status:
      data.verdict === "Accepted"
        ? "Accepted"
        : data.verdict === "Runtime Error"
          ? "Runtime Error"
          : "Wrong Answer",
    message: `${data.passed}/${data.totalTests} test cases passed.`,
    runtimeMs: data.runtime,
    memoryBytes: data.memory,
    stderr: stderrLines,
    testSummary: testLines,
    totalTests: data.totalTests,
    passed: data.passed,
  };
}
