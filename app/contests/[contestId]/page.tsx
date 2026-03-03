import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getContestById } from "@/lib/data";
import { formatDateTime, formatDuration, getContestStatus, getStatusBadgeClass } from "@/lib/utils";

type ContestDetailProps = {
  params: Promise<{ contestId: string }>;
};

export default async function ContestDetailPage({ params }: ContestDetailProps) {
  const { contestId } = await params;
  const contest = await getContestById(contestId);

  if (!contest) {
    notFound();
  }

  const status = getContestStatus(contest.startTime.toISOString(), contest.duration);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Card className="bg-surface">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-foreground">{contest.title}</h1>
            <Badge className={`rounded-full ${getStatusBadgeClass(status)}`}>{status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {contest.description && (
            <p className="mb-4 text-sm text-text-secondary">{contest.description}</p>
          )}
          <div className="space-y-1 text-sm text-text-secondary">
            <p>Start: {formatDateTime(contest.startTime.toISOString())}</p>
            <p>Duration: {formatDuration(contest.duration)}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-surface">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Problem list</h2>
        </CardHeader>
        <CardContent>
          {contest.problems.length === 0 ? (
            <p className="text-text-secondary">No problems in this contest.</p>
          ) : (
            <ul className="space-y-3">
              {contest.problems.map((problem, index) => (
                <li
                  key={problem.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface-2 p-4"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {index + 1}. {problem.title}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Difficulty: {problem.difficulty} | Tag: {problem.tag}
                    </p>
                  </div>
                  <Button asChild variant="default" size="sm">
                    <Link href={`/solve/${problem.id}`}>Solve</Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
