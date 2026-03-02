import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Problem = {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  tag: string;
  contestId: string | null;
};

async function getProblems(): Promise<Problem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/problems`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "EASY":
      return "bg-green-500/20 text-green-400";
    case "MEDIUM":
      return "bg-yellow-500/20 text-yellow-400";
    case "HARD":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Problems</h1>
      <p className="mt-2 text-sm text-text-secondary">All available problems to practice.</p>

      <Card className="mt-6 bg-surface">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">Problem List</h2>
        </CardHeader>
        <CardContent>
          {problems.length === 0 ? (
            <p className="text-text-secondary">No problems found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-text-secondary">
                    <th className="pb-3 pr-4">#</th>
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Difficulty</th>
                    <th className="pb-3 pr-4">Tag</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr key={problem.id} className="border-b border-border/50">
                      <td className="py-3 pr-4 text-text-secondary">{index + 1}</td>
                      <td className="py-3 pr-4">
                        <span className="font-medium text-foreground">{problem.title}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge className={`rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-text-secondary">{problem.tag}</td>
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
    </section>
  );
}
