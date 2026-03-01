import Link from "next/link";

import { Button } from "@/components/ui/button";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { getLeaderboardRows } from "@/lib/mock-data";
import { type LeaderboardFilter } from "@/lib/types";

type LeaderboardPageProps = {
  searchParams: Promise<{ filter?: string }>;
};

const filters: LeaderboardFilter[] = ["weekly", "monthly", "all_time"];

function parseFilter(value?: string): LeaderboardFilter {
  if (value === "weekly" || value === "monthly" || value === "all_time") {
    return value;
  }
  return "all_time";
}

export default async function LeaderboardPage({ searchParams }: LeaderboardPageProps) {
  const { filter } = await searchParams;
  const activeFilter = parseFilter(filter);
  const rows = getLeaderboardRows(activeFilter);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Global Leaderboard</h1>
      <p className="mt-2 text-sm text-text-secondary">Codeforces-style ranking by rating and solved volume.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = item === activeFilter;
          return (
            <Button
              key={item}
              variant={active ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`/leaderboard?filter=${item}`}>
                {item.replace("_", " ")}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-4">
        <LeaderboardTable rows={rows} filter={activeFilter} />
      </div>
    </section>
  );
}
