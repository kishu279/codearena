"use client";

import { Badge } from "@/components/ui/badge";
import type { CodingQuestion } from "@/lib/types";

type QuestionPanelProps = {
  question: CodingQuestion;
  questionId: string;
};

const difficultyStyles: Record<CodingQuestion["difficulty"], string> = {
  Easy: "border-green-500/40 bg-green-500/10 text-green-400",
  Medium: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Hard: "border-rose-500/40 bg-rose-500/10 text-rose-400",
};

export default function QuestionPanel({ question, questionId }: QuestionPanelProps) {
  return (
    <article className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/95 px-5 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{question.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-full bg-surface-2 text-text-secondary">
              ID: {questionId}
            </Badge>
            <Badge className={`rounded-full ${difficultyStyles[question.difficulty]}`}>
              {question.difficulty}
            </Badge>
          </div>
        </div>
      </header>

      <div className="min-h-0 space-y-7 overflow-y-auto px-5 py-5">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Description</h2>
          <p className="whitespace-pre-line text-sm leading-7 text-text-primary">{question.description}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Constraints</h2>
          <ul className="space-y-2 text-sm text-text-primary">
            {(question.constraints || []).map((constraint) => (
              <li key={constraint} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 pb-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Samples</h2>
          <div className="space-y-3">
            {(question.samples||[]).map((sample, index) => (
              <div key={`${sample.input}-${index}`} className="rounded-xl border border-border bg-surface-2 p-4 shadow-[var(--shadow-sm)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Sample {index + 1}</p>
                <div className="mt-3 space-y-3 text-sm">
                  <div>
                    <p className="mb-1 text-xs text-text-secondary">Input</p>
                    <pre className="overflow-x-auto rounded-md bg-code-bg p-3 text-code-text">{sample.input}</pre>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-text-secondary">Output</p>
                    <pre className="overflow-x-auto rounded-md bg-code-bg p-3 text-code-text">{sample.output}</pre>
                  </div>
                  {sample.explanation ? (
                    <div>
                      <p className="mb-1 text-xs text-text-secondary">Explanation</p>
                      <p className="text-text-primary">{sample.explanation}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
