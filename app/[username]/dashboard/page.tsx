import { notFound } from "next/navigation";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getUserByUsername,
  totalProblemsSolved,
  totalSubmissions,
  currentStreak,
  contestsParticipated,
  recentActivity,
} from "@/lib/data";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { UserStats } from "@/lib/types";

type DashboardPageProps = {
  params: Promise<{ username: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { username } = await params;

  const user = await getUserByUsername(username);
  if (!user) {
    notFound();
  }

  const [solved, submissions, streak, contests, activity] = await Promise.all([
    totalProblemsSolved(user.id),
    totalSubmissions(user.id),
    currentStreak(user.id),
    contestsParticipated(user.id),
    recentActivity(user.id),
  ]);

  const accuracy =
    submissions > 0 ? Math.round((solved / submissions) * 100) : 0;

  const stats: UserStats = {
    totalSolved: solved,
    totalSubmissions: submissions,
    accuracy,
    currentStreak: streak,
    contestsParticipated: contests.length,
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Card className="mb-8 bg-surface">
        <CardHeader>
          <p className="text-xs uppercase tracking-wide text-text-secondary">
            User Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            @{user.username}
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <span>Join date: {formatDate(user.createdAt.toISOString())}</span>
          </div>
        </CardContent>
      </Card>

      <DashboardStats stats={stats} />

      <Card className="mt-8 bg-surface">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">
            Recent activity
          </h2>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-sm text-text-secondary">
              No submissions yet. Start solving problems!
            </p>
          ) : (
            <ul className="space-y-3">
              {activity.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-border bg-surface-2 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">
                      {item.problem.title}
                    </p>
                    <span className="text-xs text-text-secondary">
                      {formatDateTime(item.submittedAt.toISOString())}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-text-secondary">
                    <span>Difficulty: {item.problem.difficulty}</span>
                    <span>Status: {item.status.replace(/_/g, " ")}</span>
                    <span>Language: {item.language}</span>
                    {item.contest && <span>Contest: {item.contest.title}</span>}
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
