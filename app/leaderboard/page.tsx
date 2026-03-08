import Link from "next/link";

import { Button } from "@/components/ui/button";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import PaginationBar from "@/components/PaginationBar";
import { getLeaderboardRows } from "@/lib/mock-data";
import { type LeaderboardFilter } from "@/lib/types";

type LeaderboardPageProps = {
  searchParams: Promise<{ filter?: string; page?: string }>;
};

const filters: LeaderboardFilter[] = ["weekly", "monthly", "all_time"];
const LEADERBOARD_PAGE_SIZE = 10;

function parseFilter(value?: string): LeaderboardFilter {
  if (value === "weekly" || value === "monthly" || value === "all_time") {
    return value;
  }
  return "all_time";
}

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  const params = await searchParams;
  const activeFilter = parseFilter(params?.filter);
  const page = parseInt(params?.page as string) || 1;

  const allRows = getLeaderboardRows(activeFilter);
  const total = allRows.length;
  const totalPages = Math.ceil(total / LEADERBOARD_PAGE_SIZE);
  const rows = allRows.slice(
    (page - 1) * LEADERBOARD_PAGE_SIZE,
    page * LEADERBOARD_PAGE_SIZE,
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">
        Global Leaderboard
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Codeforces-style ranking by rating and solved volume.
      </p>

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

      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        extraParams={{ filter: activeFilter }}
      />
    </section>
  );
}
