import Link from "next/link";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PaginationBar from "@/components/PaginationBar";
import { getProblemsByPage } from "@/lib/data";

type Problem = {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  tag: string;
  contestId: string | null;
};

function getDifficultyVariant(difficulty: string): BadgeVariant {
  switch (difficulty) {
    case "EASY":
      return "success";
    case "MEDIUM":
      return "warning";
    case "HARD":
      return "destructive";
    default:
      return "secondary";
  }
}

export const revalidate = 60;

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page as string) || 1;
  const limit = 10;

  const { total, data: problems } = await getProblemsByPage(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Problems</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        All available problems to practice.
      </p>

      <Card className="mt-6 bg-surface shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">
            Problem List
          </h2>
        </CardHeader>
        <CardContent>
          {problems.length === 0 ? (
            <p className="text-muted-foreground">No problems found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">#</th>
                    <th className="pb-3 pr-4 font-medium">Title</th>
                    <th className="pb-3 pr-4 font-medium">Difficulty</th>
                    <th className="pb-3 pr-4 font-medium">Tag</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={problem.id}
                      className="border-b border-border/50 last:border-0"
                    >
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="font-medium text-foreground">
                          {problem.title}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={getDifficultyVariant(problem.difficulty)}
                        >
                          {problem.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">
                        {problem.tag}
                      </td>
                      <td className="py-3">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/solve/${problem.id}`}>Solve</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <PaginationBar currentPage={page} totalPages={totalPages} />
    </section>
  );
}
