"use client";

import { useMemo, useState } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import { useTheme } from "@/components/theme/ThemeProvider";
import { languageOptions } from "@/lib/types";
import type { EditorLanguage } from "@/lib/types";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultCode: Record<EditorLanguage, string> = {
  javascript:
    "// Start coding here\nfunction solution() {\n  // Your code\n}\n",
  typescript:
    "// Start coding here\nfunction solution(): void {\n  // Your code\n}\n",
  python: "# Start coding here\ndef solution():\n    # Your code\n    pass\n",
  java: "// Start coding here\npublic class Solution {\n    public static void main(String[] args) {\n        // Your code\n    }\n}\n",
  cpp: "// Start coding here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code\n    return 0;\n}\n",
  rust: "// Start coding here\nfn main() {\n    // Your code\n}\n",
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

    try {
      const response = await axios.post("/api/runcode", {
        sourceCode: activeCode,
        language: selectedLanguage,
        input: "",
      });

      if (response.status == 200) {
        setConsoleOutput("Code executed successfully.");
        setConsoleOutput(response.data.output);
        setIsRunning(false);
        setIsOutputOpen(true);
      } else {
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
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Code Editor
        </p>
      </div>

      <section className="flex h-[calc(100vh-11rem)] min-h-[560px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="language-select"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Language
            </Label>
            <Select
              value={selectedLanguage}
              onValueChange={(value) =>
                setSelectedLanguage(value as EditorLanguage)
              }
              disabled={isRunning}
            >
              <SelectTrigger className="w-[160px] bg-surface-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleRun} disabled={isRunning}>
            {runLabel}
          </Button>
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
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
            className={`border-t border-border transition-all duration-200 ${
              isOutputOpen ? "max-h-56" : "max-h-0 overflow-hidden"
            }`}
          >
            <pre className="max-h-56 min-h-24 overflow-y-auto whitespace-pre-wrap bg-code-bg px-4 py-3 text-xs text-code-text">
              {consoleOutput}
            </pre>
          </div>
        </footer>
      </section>
    </section>
  );
}
