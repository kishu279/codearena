import { NextRequest, NextResponse } from "next/server";

import {
  createSubmission,
  CreateSubmissionRequest,
  getProblemById,
} from "@/lib/data";
import { pistonClient } from "@/lib/services/piston-client";
import type {
  CodeRunnerAction,
  CodeRunnerRequest,
  CodeRunnerResponse,
  TestCaseInput,
  TestCaseResult,
} from "@/lib/types";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ problemId: string }>;
};

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { problemId } = await params;
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("codearena_session");
  const userObject = sessionCookie ? sessionCookie.value : null;

  try {
    const body: CodeRunnerRequest = await request.json();
    const { code, language, action, customTestCases } = body;

    // ── Validate required fields ───────────────────────────────────
    if (!code || !language || !action) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: code, language, action.",
        },
        { status: 400 },
      );
    }

    if (action !== "run" && action !== "submit") {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid action "${action}". Must be "run" or "submit".`,
        },
        { status: 400 },
      );
    }
    console.log("Received code execution request for problem:", problemId);

    // ── Lookup problem from JSON data ──────────────────────────────
    const problem = await getProblemById(problemId);
    if (!problem) {
      return NextResponse.json(
        { success: false, error: `Problem "${problemId}" not found.` },
        { status: 404 },
      );
    }

    // ── Build test case list based on action ───────────────────────
    const testCases: TestCaseInput[] = buildTestCases(
      action,
      problem,
      customTestCases,
    );

    if (testCases.length === 0) {
      return NextResponse.json(
        { success: false, error: "No test cases available for this problem." },
        { status: 400 },
      );
    }

    // ── Execute code against every test case ───────────────────────
    const results: TestCaseResult[] = [];
    let hasRuntimeError = false;
    let memory: number = 0;
    let runtime: number = 0;
    let error: string | undefined = undefined;

    for (const tc of testCases) {
      try {
        const pistonResult = await pistonClient.runCode(
          language,
          code,
          tc.input,
        );

        const actualOutput = pistonResult.stdout.trim();
        const expectedOutput = tc.expectedOutput.trim();

        results.push({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: pistonResult.stdout,
          passed: actualOutput === expectedOutput,
          stderr: pistonResult.stderr || null,
          cpuTime: pistonResult.cpuTime || null,
          memory: pistonResult.memory || null,
        });

        // CHECK FOR THE MAXIMUM runtime and memory usage across all test cases
        if (pistonResult.cpuTime && pistonResult.cpuTime > runtime) {
          runtime = pistonResult.cpuTime;
        }
        if (pistonResult.memory && pistonResult.memory > memory) {
          memory = pistonResult.memory;
        }

        // Check stderr for runtime errors
        if (pistonResult.stderr && pistonResult.exitCode !== 0) {
          hasRuntimeError = true;
          error = pistonResult.stderr; // capture the runtime error message
          break; // stop running further test cases on runtime error
        }
      } catch (error) {
        results.push({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: "Runtime Error — execution failed.",
          passed: false,
          stderr: error instanceof Error ? error.message : "Execution failed.",
          cpuTime: null,
          memory: null,
        });
        error = error instanceof Error ? error.message : "Execution failed.";
        memory = 0;
        runtime = 0;

        hasRuntimeError = true;
      }
    }

    // ── Calculate verdict ──────────────────────────────────────────
    const passedCount = results.filter((r) => r.passed).length;
    const failedCount = results.length - passedCount;

    let verdict: CodeRunnerResponse["verdict"] = "Accepted";
    if (hasRuntimeError && failedCount === results.length) {
      verdict = "Runtime Error";
    } else if (failedCount > 0) {
      verdict = "Wrong Answer";
    }

    if (action === "submit") {
      // submissions
      let userId = userObject ? JSON.parse(userObject).id : "user_admin_1"; // default to admin if no user info
      const submissionRequest: CreateSubmissionRequest = {
        code,
        language,
        problemId,
        status: verdict === "Accepted" ? "ACCEPTED" : "WRONG_ANSWER",
        testCasesPassed: passedCount,
        totalTestCases: results.length,
        userId: userId,
        contestId: problem.contestId!,
        error: error, // include runtime error message if present
        memory: memory,
        runtime: runtime,
        output: results.map((r) => r.actualOutput).join("\n\n---\n\n"),
      };

      console.log("Creating submission with data:", submissionRequest);
      const submissionResponse = await createSubmission(submissionRequest);
      console.log("Created submission with ID:", submissionResponse.id);
    } else {
      console.log("running the codeon the server piston");
    }

    const response: CodeRunnerResponse = {
      success: true,
      action,
      problemId,
      totalTests: results.length,
      passed: passedCount,
      failed: failedCount,
      verdict,
      results,
      error: hasRuntimeError
        ? "One or more test cases had runtime errors."
        : undefined,
      memory: memory,
      runtime: runtime,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(`[coderunner/${problemId}]`, error);
    return NextResponse.json(
      { success: false, error: "Code execution failed." },
      { status: 500 },
    );
  }
}

// ── Helper ─────────────────────────────────────────────────────────────

interface ProblemWithTestData {
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: unknown;
}

function buildTestCases(
  action: CodeRunnerAction,
  problem: ProblemWithTestData,
  customTestCases?: TestCaseInput[],
): TestCaseInput[] {
  if (action === "run") {
    // Run = sample test case(s) + any custom test cases from the frontend
    const cases: TestCaseInput[] = [];

    if (problem.sampleInput && problem.sampleOutput) {
      cases.push({
        input: problem.sampleInput,
        expectedOutput: problem.sampleOutput,
      });
    }

    if (customTestCases && Array.isArray(customTestCases)) {
      cases.push(...customTestCases);
    }

    return cases;
  }

  // Submit = all hidden test cases from the JSON
  if (Array.isArray(problem.testCases)) {
    return (
      problem.testCases as { input: string; expectedOutput: string }[]
    ).map((tc) => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
    }));
  }

  return [];
}
