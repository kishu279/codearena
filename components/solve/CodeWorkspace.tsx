"use client";

import { useMemo, useState } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import { useTheme } from "@/components/theme/ThemeProvider";
import type { EditorLanguage } from "@/lib/types";
import axios from "axios";

const languageOptions: Array<{ label: string; value: EditorLanguage, disabled?: boolean }> = [
  { label: "JavaScript", value: "javascript", disabled: true },
  { label: "TypeScript", value: "typescript", disabled: true },
  { label: "Python", value: "python" },
  { label: "Java", value: "java", disabled: true },
  { label: "C++", value: "cpp", disabled: true },
];

const defaultCode: Record<EditorLanguage, string> = {
  javascript:
    "// Start coding here\nfunction solution() {\n  // Your code\n}\n",
  typescript:
    "// Start coding here\nfunction solution(): void {\n  // Your code\n}\n",
  python: "# Start coding here\ndef solution():\n    # Your code\n    pass\n",
  java: "// Start coding here\npublic class Solution {\n    public static void main(String[] args) {\n        // Your code\n    }\n}\n",
  cpp: "// Start coding here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code\n    return 0;\n}\n",
};

export default function CodeWorkspace() {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] =
    useState<EditorLanguage>("python");
  const [codeByLanguage, setCodeByLanguage] =
    useState<Record<EditorLanguage, string>>(defaultCode);
  const [consoleOutput, setConsoleOutput] = useState(
    "Click Run to execute your code.",
  );
  const [isOutputOpen, setIsOutputOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const monacoTheme = theme === "github-light" ? "vs" : "vs-dark";
  const activeCode = codeByLanguage[selectedLanguage] ?? "";

  const runLabel = useMemo(
    () => (isRunning ? "Running..." : "Run"),
    [isRunning],
  );

  async function handleRun() {
    setIsRunning(true);
    setConsoleOutput("Executing code...");
    // setTimeout(() => {
    //   setConsoleOutput("Code executed successfully.");
    //   setIsRunning(false);
    //   setIsOutputOpen(true);
    // }, 1000);

    try {
      const response = await axios.post("/api/runcode", {
        sourceCode: activeCode,
        language: selectedLanguage,
        input: ""
      })

      if (response.status == 200) {
        setConsoleOutput("Code executed successfully.");
        setConsoleOutput(response.data.output);
        setIsRunning(false);
        setIsOutputOpen(true);
      }
      else {
        setConsoleOutput("Code execution failed.");
        setIsRunning(false);
        setIsOutputOpen(true);
      }
    } catch (error) {
      // TODO: SHOW THE POP UP IF FAILED TO DO SO
    }
  }

  return (
    <section className="mx-auto w-full max-w-[1540px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-sm)]">
        <p className="text-xs uppercase tracking-wide text-text-secondary">
          Code Editor
        </p>
      </div>

      <section className="flex h-[calc(100vh-11rem)] min-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <label
              htmlFor="language-select"
              className="text-xs font-semibold uppercase tracking-wide text-text-secondary"
            >
              Language
            </label>
            <select
              id="language-select"
              className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary outline-none transition focus:border-primary"
              value={selectedLanguage}
              onChange={(event) =>
                setSelectedLanguage(event.target.value as EditorLanguage)
              }
              disabled={isRunning}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary transition hover:bg-card disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleRun}
            disabled={isRunning}
          >
            {runLabel}
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
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

        <footer className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Console Output
            </h2>
            <button
              type="button"
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:text-foreground"
              onClick={() => setIsOutputOpen((prev) => !prev)}
            >
              {isOutputOpen ? "Collapse" : "Expand"}
            </button>
          </div>

          <div
            className={`overflow-hidden border-t border-border transition-all duration-200 ${isOutputOpen ? "max-h-56" : "max-h-0"
              }`}
          >
            <pre className="min-h-24 overflow-auto whitespace-pre-wrap bg-code-bg px-4 py-3 text-xs text-code-text">
              {consoleOutput}
            </pre>
          </div>
        </footer>
      </section>
    </section>
  );
}
