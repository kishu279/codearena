import {
  Calendar,
  Code2,
  Link2,
  FileText,
  AlignLeft,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LabDetailAssignment, LabDetailResource } from "@/lib/types";
import type { LabTab } from "@/components/labs/LabDetailsLayout";

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
      return "text-green-500 border-green-500/40";
    case "MEDIUM":
      return "text-yellow-500 border-yellow-500/40";
    case "HARD":
      return "text-red-500 border-red-500/40";
    default:
      return "text-muted-foreground";
  }
}

function ResourceIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  if (t === "link" || t === "url")
    return <Link2 size={13} className="shrink-0 text-muted-foreground" />;
  if (t === "file" || t === "pdf")
    return <FileText size={13} className="shrink-0 text-muted-foreground" />;
  return <AlignLeft size={13} className="shrink-0 text-muted-foreground" />;
}

function ResourceRow({ res }: { res: LabDetailResource }) {
  const isLink =
    res.url &&
    (res.type.toLowerCase() === "link" || res.type.toLowerCase() === "url");
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2.5">
        <ResourceIcon type={res.type} />
        <span className="text-sm text-foreground">{res.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {res.type}
        </Badge>
        {isLink && (
          <a href={res.url!} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ExternalLink size={12} />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

interface AssignmentDetailsProps {
  assignment: LabDetailAssignment;
  selectedTab: LabTab;
  onTabSelect: (tab: LabTab) => void;
}

export default function AssignmentDetails({
  assignment,
  selectedTab,
  onTabSelect,
}: AssignmentDetailsProps) {
  const startDate = new Date(assignment.startTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endDate = new Date(assignment.endTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-xl font-semibold text-foreground">
          {assignment.title}
        </h1>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar size={11} className="shrink-0" />
          <span>
            {startDate} – {endDate}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {assignment.problems.length} problem
          {assignment.problems.length !== 1 ? "s" : ""} &middot;{" "}
          {assignment.resource.length} resource
          {assignment.resource.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Description */}
      {assignment.description && (
        <div className="px-8 pt-5">
          <h3 className="mb-1.5 text-sm font-semibold text-foreground">
            Description
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {assignment.description}
          </p>
          <Separator className="mt-5" />
        </div>
      )}

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={(v) => onTabSelect(v as LabTab)}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <div className="px-8 pt-4">
          <TabsList>
            <TabsTrigger value="problems" className="gap-1.5">
              <Code2 size={13} />
              Problems
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {assignment.problems.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-1.5">
              <Link2 size={13} />
              Resources
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                {assignment.resource.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Problems tab */}
        <TabsContent
          value="problems"
          className="flex-1 overflow-auto px-8 pb-8 pt-3"
        >
          {assignment.problems.length > 0 ? (
            <div className="space-y-2">
              {assignment.problems.map((problem, idx) => (
                <div
                  key={problem.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {problem.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getDifficultyColor(problem.difficulty)}
                    >
                      {getDifficultyLabel(problem.difficulty)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 px-2.5 text-xs"
                      onClick={() => {
                        window.open(`/solve/${problem.id}`, "_blank");
                      }}
                    >
                      Open
                      <ArrowUpRight size={11} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="pt-8 text-center text-sm text-muted-foreground">
              No problems in this assignment yet.
            </p>
          )}
        </TabsContent>

        {/* Resources tab */}
        <TabsContent
          value="resources"
          className="flex-1 overflow-auto px-8 pb-8 pt-3"
        >
          {assignment.resource.length > 0 ? (
            <div className="space-y-2">
              {assignment.resource.map((res) => (
                <ResourceRow key={res.id} res={res} />
              ))}
            </div>
          ) : (
            <p className="pt-8 text-center text-sm text-muted-foreground">
              No resources in this assignment yet.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
