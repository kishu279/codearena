import { notFound, redirect } from "next/navigation";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getDashboardUser } from "@/lib/mock-data";
import { formatDate, formatDateTime } from "@/lib/utils";

type DashboardPageProps = {
  params: Promise<{ username: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { username } = await params;
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const sessionUsername = session.user.username;
  if (sessionUsername.toLowerCase() !== username.toLowerCase()) {
    redirect(`/${sessionUsername}/dashboard`);
  }

  const user = getDashboardUser(username);
  if (!user) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Card className="mb-8 bg-surface">
        <CardHeader>
          <p className="text-xs uppercase tracking-wide text-text-secondary">User Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">@{user.username}</h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <span>Join date: {formatDate(user.joinDate)}</span>
            <span>Rank: {user.rank ?? "Unranked"}</span>
          </div>
        </CardContent>
      </Card>

      <DashboardStats stats={user.stats} />

      <Card className="mt-8 bg-surface">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Recent activity</h2>
        </CardHeader>
        <CardContent>
          {user.recentActivity.length === 0 ? (
            <p className="text-sm text-text-secondary">No solved problems yet. Start with an easy contest problem.</p>
          ) : (
            <ul className="space-y-3">
              {user.recentActivity.map((activity) => (
                <li key={activity.id} className="rounded-lg border border-border bg-surface-2 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <span className="text-xs text-text-secondary">{formatDateTime(activity.solvedAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">Difficulty: {activity.difficulty}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
