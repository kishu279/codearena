"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import EditorPanel from "@/components/solve/EditorPanel";
import QuestionPanel from "@/components/solve/QuestionPanel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { extractQuestionIdFromPath } from "@/lib/routing/question-route";
import { fetchQuestionById } from "@/lib/services/question-service";
import type { CodingQuestion } from "@/lib/types";

type SolveWorkspaceProps = {
  initialQuestionId: string;
  contestId?: string;
};

export default function SolveWorkspace({ initialQuestionId, contestId }: SolveWorkspaceProps) {
  const pathname = usePathname();
  const [question, setQuestion] = useState<CodingQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const routeQuestionId = useMemo(() => {
    const fromPath = extractQuestionIdFromPath(pathname);
    return fromPath ?? initialQuestionId;
  }, [pathname, initialQuestionId]);

  const loadQuestion = useCallback(
    async (questionId: string, signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const payload = await fetchQuestionById(questionId, signal);
        setQuestion(payload);
      } catch (loadError) {
        if ((loadError as Error).name === "AbortError") {
          return;
        }

        setQuestion(null);
        setError(loadError instanceof Error ? loadError.message : "Failed to load question.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadQuestion(routeQuestionId, controller.signal);
    return () => controller.abort();
  }, [loadQuestion, routeQuestionId]);

  return (
    <section className="mx-auto w-full max-w-[1540px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 shadow-[var(--shadow-sm)]">
        <p className="text-xs uppercase tracking-wide text-text-secondary">Coding Interview Workspace</p>
        <p className="text-xs font-semibold text-text-secondary">Question: {routeQuestionId}</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 lg:h-[calc(100vh-11rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Skeleton className="h-full min-h-[380px] rounded-2xl" />
          <Skeleton className="h-full min-h-[560px] rounded-2xl" />
        </div>
      ) : null}

      {!isLoading && error ? (
        <Alert variant="destructive">
          <AlertDescription>
            <p className="font-semibold">Could not load question data.</p>
            <p className="mt-1 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => loadQuestion(routeQuestionId)}
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      ) : null}

      {!isLoading && !error && question ? (
        <div className="grid gap-4 lg:h-[calc(100vh-11rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <QuestionPanel question={question} questionId={routeQuestionId} />
          <EditorPanel question={question} questionId={routeQuestionId} contestId={contestId} />
        </div>
      ) : null}
    </section>
  );
}
