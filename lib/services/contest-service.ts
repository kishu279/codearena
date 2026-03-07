import type {
  EditorLanguage,
  RunCodeResult,
  SubmitCodeResult,
  CodeRunnerResponse,
} from "@/lib/types";

type ContestRunPayload = {
  contestId: string;
  problemId: string;
  language: EditorLanguage;
  code: string;
  input?: string;
  customTestCases?: { input: string; expectedOutput: string }[];
};

type ContestSubmitPayload = Omit<ContestRunPayload, "customTestCases">;

export async function runContestCode(
  payload: ContestRunPayload,
): Promise<RunCodeResult> {
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

export async function submitContestCode(
  payload: ContestSubmitPayload,
): Promise<SubmitCodeResult> {
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
    message: `${data.passed}/${data.totalTests} test cases passed for contest ${payload.contestId}, problem ${payload.problemId}.`,
    runtimeMs: data.runtime,
    memoryBytes: data.memory,
    stderr: stderrLines,
    testSummary: testLines,
    totalTests: data.totalTests,
    passed: data.passed,
  };
}
