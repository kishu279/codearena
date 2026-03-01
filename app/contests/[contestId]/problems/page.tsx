import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getContestById } from "@/lib/data";

type ContestProblemsPageProps = {
  params: Promise<{ contestId: string }>;
};

const MOCK_USER_ID = "u1";

export default async function ContestProblemsPage({ params }: ContestProblemsPageProps) {
  const { contestId } = await params;
  const contest = getContestById(contestId);

  if (!contest) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">{contest.title} Problems</h1>
      <p className="mt-2 text-sm text-text-secondary">Select a problem to solve</p>

      <Card className="mt-6 bg-surface">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">All Problems</h2>
        </CardHeader>
        <CardContent>
          {contest.problems.length === 0 ? (
            <p className="text-text-secondary">No problems in this contest.</p>
          ) : (
            <ul className="space-y-3">
              {contest.problems.map((problem, index) => (
                <li key={problem.id} className="rounded-lg border border-border bg-surface-2 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">
                        {index + 1}. {problem.title}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">Difficulty: {problem.difficulty}</p>
                    </div>
                    <Button asChild variant="default" size="sm">
                      <Link href={`/solve/${problem.id}`}>Solve</Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
