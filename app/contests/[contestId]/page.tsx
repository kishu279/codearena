import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getContestById } from "@/lib/mock-data";
import { formatDateTime, formatDuration, getContestStatus, getStatusBadgeClass } from "@/lib/utils";

type ContestDetailPageProps = {
  params: Promise<{ contestId: string }>;
};

export default async function ContestDetailPage({ params }: ContestDetailPageProps) {
  const { contestId } = await params;
  const contest = getContestById(contestId);

  if (!contest) {
    notFound();
  }

  const status = getContestStatus(contest.startTime, contest.durationMinutes);

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
          <div className="space-y-1 text-sm text-text-secondary">
            <p>Start: {formatDateTime(contest.startTime)}</p>
            <p>Duration: {formatDuration(contest.durationMinutes)}</p>
            <p>Timer: Optional in MVP (placeholder)</p>
          </div>

          <Button asChild className="mt-5">
            <Link href={`/contests/${contest.id}/problems`}>
              Open Problems
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-surface">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Problem list</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {contest.problems.map((problem, index) => (
              <li key={problem.id} className="rounded-lg border border-border bg-surface-2 p-4 text-sm">
                <p className="font-medium text-foreground">
                  {index + 1}. {problem.title}
                </p>
                <p className="mt-1 text-text-secondary">Difficulty: {problem.difficulty}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
