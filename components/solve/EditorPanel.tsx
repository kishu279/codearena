"use client";

import { useEffect, useMemo, useState } from "react";

import CodeEditor from "@/components/editor/CodeEditor";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  runContestCode,
  submitContestCode,
} from "@/lib/services/contest-service";
import {
  runQuestionCode,
  submitQuestionCode,
} from "@/lib/services/question-service";
import type { CodingQuestion, EditorLanguage } from "@/lib/types";

type EditorPanelProps = {
  question: CodingQuestion;
  questionId: string;
  contestId?: string;
};

const languageOptions: Array<{ label: string; value: EditorLanguage }> = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
];

function getDefaultLanguage(question: CodingQuestion) {
  // return { label: "JavaScript", value: "javascript" };
  return question.starterCode.javascript
    ? "javascript"
    : languageOptions[0].value;
}

export default function EditorPanel({
  question,
  questionId,
  contestId,
}: EditorPanelProps) {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<EditorLanguage>(
    getDefaultLanguage(question),
  );
  const [codeByLanguage, setCodeByLanguage] = useState(() => ({
    ...question.starterCode,
  }));
  const [consoleOutput, setConsoleOutput] = useState(
    "Click Run to execute your code.",
  );
  const [isOutputOpen, setIsOutputOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedLanguage(getDefaultLanguage(question));
    setCodeByLanguage({ ...question.starterCode });
    setConsoleOutput("Click Run to execute your code.");
  }, [question]);

  const monacoTheme = theme === "github-light" ? "vs" : "vs-dark";
  const activeCode = codeByLanguage[selectedLanguage] ?? "";

  const controlsDisabled = isRunning || isSubmitting;

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return "Submitting...";
    }
    return "Submit";
  }, [isSubmitting]);

  const runLabel = useMemo(() => {
    if (isRunning) {
      return "Running...";
    }
    return "Run";
  }, [isRunning]);

  async function handleRun() {
    setIsRunning(true);
    setConsoleOutput("Executing code...");
    try {
      const result = contestId
        ? await runContestCode({
            contestId,
            problemId: questionId,
            language: selectedLanguage,
            code: activeCode,
          })
        : await runQuestionCode({
            questionId,
            language: selectedLanguage,
            code: activeCode,
          });

      setConsoleOutput(result.stdout || "No output.");
    } catch (error) {
      setConsoleOutput(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Run failed. Please retry.",
      );
    } finally {
      setIsRunning(false);
      setIsOutputOpen(true);
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setConsoleOutput("Submitting code...");
    try {
      const result = contestId
        ? await submitContestCode({
            contestId,
            problemId: questionId,
            language: selectedLanguage,
            code: activeCode,
          })
        : await submitQuestionCode({
            questionId,
            language: selectedLanguage,
            code: activeCode,
          });

      setConsoleOutput(
        [
          `Status: ${result.status}`,
          result.message,
          `Runtime: ${result.runtimeMs} ms`,
          `Memory: ${result.memoryMb} MB`,
        ].join("\n"),
      );
    } catch (error) {
      setConsoleOutput(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Submission failed. Please retry.",
      );
    } finally {
      setIsSubmitting(false);
      setIsOutputOpen(true);
    }
  }

  return (
    <section className="flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Label
            htmlFor="language-select"
            className="text-xs font-semibold uppercase tracking-wide text-text-secondary"
          >
            Language
          </Label>
          <Select
            value={selectedLanguage}
            onValueChange={(value) =>
              setSelectedLanguage(value as EditorLanguage)
            }
            disabled={controlsDisabled}
          >
            <SelectTrigger className="w-[160px] bg-surface-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRun}
            disabled={controlsDisabled}
          >
            {runLabel}
          </Button>
          <Button onClick={handleSubmit} disabled={controlsDisabled}>
            {submitLabel}
          </Button>
        </div>
      </header>

      <div className="min-h-0 flex-1 p-3 pt-3">
        <div className="h-full overflow-hidden rounded-xl border border-border bg-code-bg">
          <CodeEditor
            language={selectedLanguage}
            value={activeCode}
            theme={monacoTheme}
            onChange={(nextCode) => {
              setCodeByLanguage((prev) => ({
                ...prev,
                [selectedLanguage]: nextCode,
              }));
            }}
          />
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Console Output
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOutputOpen((prev) => !prev)}
          >
            {isOutputOpen ? "Collapse" : "Expand"}
          </Button>
        </div>

        <div
          className={`overflow-hidden border-t border-border transition-all duration-200 ${
            isOutputOpen ? "max-h-56" : "max-h-0"
          }`}
        >
          <pre className="min-h-24 overflow-auto whitespace-pre-wrap bg-code-bg px-4 py-3 text-xs text-code-text">
            {consoleOutput}
          </pre>
        </div>
      </footer>
    </section>
  );
}
