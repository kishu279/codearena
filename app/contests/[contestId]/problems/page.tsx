import { notFound, redirect } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getContestById, getProblemStatusForContest } from "@/lib/mock-data";
import { getNextProblemToSolve, statusLabel } from "@/lib/utils";

type ContestProblemsPageProps = {
  params: Promise<{ contestId: string }>;
};

export default async function ContestProblemsPage({ params }: ContestProblemsPageProps) {
  const { contestId } = await params;
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const contest = getContestById(contestId);
  if (!contest) {
    notFound();
  }

  const statuses = getProblemStatusForContest(contest.id, session.user.id);
  const nextProblem = getNextProblemToSolve(contest.problems, statuses);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">{contest.title} Problems</h1>
      <p className="mt-2 text-sm text-text-secondary">Status is personalized to your account.</p>

      <Card className="mt-6 bg-surface">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">Next question to solve</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">
            {nextProblem ? `${nextProblem.title} (${nextProblem.difficulty})` : "All problems solved. Great work."}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-surface">
        <CardContent className="pt-6">
          <ul className="space-y-3">
            {contest.problems.map((problem, index) => {
              const status = statuses[problem.id] ?? "NOT_ATTEMPTED";
              const symbol = status === "SOLVED" ? "✅" : status === "UNSOLVED" ? "❌" : "⏳";

              return (
                <li key={problem.id} className="rounded-lg border border-border bg-surface-2 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium text-foreground">
                      {index + 1}. {problem.title}
                    </p>
                    <span className="text-sm text-text-secondary">
                      {symbol} {statusLabel(status)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">Difficulty: {problem.difficulty}</p>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
