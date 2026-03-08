import ContestCard from "@/components/contests/ContestCard";
import PaginationBar from "@/components/PaginationBar";
import { getContestsByPage } from "@/lib/data";
import type { ContestListItem, ContestProblem } from "@/lib/types";

// Re-render at most every 60 seconds
export const revalidate = 60;

export default async function ContestsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page as string) || 1;

  const {
    page: currentPage,
    limit,
    total,
    data: contests,
  } = await getContestsByPage(page, 10);

  // pagination
  const totalPages = Math.ceil(total / limit);

  const contestListItems: ContestListItem[] = contests.map((c) => ({
    id: c.id,
    title: c.title,
    startTime: c.startTime.toISOString(),
    durationMinutes: c.duration,
    problems: c.problems.map(
      (p): ContestProblem => ({
        id: p.id,
        title: p.title,
        difficulty:
          p.difficulty === "EASY"
            ? "Easy"
            : p.difficulty === "MEDIUM"
              ? "Medium"
              : "Hard",
      }),
    ),
  }));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Contests</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Upcoming, live, and completed events.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {contestListItems.map((contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>

      <PaginationBar currentPage={page} totalPages={totalPages} />
    </section>
  );
}
