import { FlaskConical, Code2, Link2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LabDetailAssignment } from "@/lib/types";
import type { LabTab } from "@/components/labs/LabDetailsLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function getDifficultyLabel(d: string) {
  switch (d) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
    default:
      return d;
  }
}

function getDifficultyColor(d: string) {
  switch (d) {
    case "EASY":
      return "text-green-500";
    case "MEDIUM":
      return "text-yellow-500";
    case "HARD":
      return "text-red-500";
    default:
      return "text-muted-foreground";
  }
}

export default function LabMainContent({
  selectedAssignment,
  selectedTab,
  onTabSelect,
}: {
  selectedAssignment: LabDetailAssignment | null;
  selectedTab: LabTab;
  onTabSelect: (tab: LabTab) => void;
}) {
  if (!selectedAssignment) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
          <FlaskConical size={24} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Select an assignment
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose an assignment from the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }

  const deadline = new Date(selectedAssignment.endTime).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {selectedAssignment.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedAssignment.problems.length} problem
          {selectedAssignment.problems.length !== 1 ? "s" : ""} &middot;{" "}
          {selectedAssignment.resource.length} resource
          {selectedAssignment.resource.length !== 1 ? "s" : ""}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={12} />
          <span>Due: {deadline}</span>
        </div>
      </div>

      {selectedAssignment.description && (
        <div className="px-8 pt-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Description
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {selectedAssignment.description}
          </p>
        </div>
      )}

      <Tabs
        value={selectedTab}
        onValueChange={(v) => onTabSelect(v as LabTab)}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="px-8 pt-4">
          <TabsList>
            <TabsTrigger value="problems" className="gap-1.5">
              <Code2 size={14} />
              Problems
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {selectedAssignment.problems.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-1.5">
              <Link2 size={14} />
              Resources
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {selectedAssignment.resource.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="problems"
          className="flex-1 overflow-auto px-8 pb-8"
        >
          {selectedAssignment.problems.length > 0 ? (
            <div className="space-y-2">
              {selectedAssignment.problems.map((problem, idx) => (
                <div
                  key={problem.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface text-xs font-medium text-muted-foreground">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {problem.title}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={getDifficultyColor(problem.difficulty)}
                  >
                    {getDifficultyLabel(problem.difficulty)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 pt-12 text-center">
              <p className="text-sm text-muted-foreground">
                No problems in this assignment yet.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="resources"
          className="flex-1 overflow-auto px-8 pb-8"
        >
          {selectedAssignment.resource.length > 0 ? (
            <div className="space-y-2">
              {selectedAssignment.resource.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {res.title}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {res.type}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 pt-12 text-center">
              <p className="text-sm text-muted-foreground">
                No resources in this assignment yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
