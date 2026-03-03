import ContestCard from "@/components/contests/ContestCard";
import { getAllContests } from "@/lib/data";
import type { ContestListItem, ContestProblem } from "@/lib/types";

export default async function ContestsPage() {
  const contests = await getAllContests();

  const contestListItems: ContestListItem[] = contests.map((c) => ({
    id: c.id,
    title: c.title,
    startTime: c.startTime.toISOString(),
    durationMinutes: c.duration,
    problems: c.problems.map((p): ContestProblem => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty === "EASY" ? "Easy" : p.difficulty === "MEDIUM" ? "Medium" : "Hard",
    })),
  }));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Contests</h1>
      <p className="mt-2 text-sm text-text-secondary">Upcoming, live, and completed events.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {contestListItems.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
    </section>
  );
}
