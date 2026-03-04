import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { CourseTopic } from "@/lib/types";

interface CourseMainContentProps {
  selectedTopic: CourseTopic | null;
}

export default function CourseMainContent({
  selectedTopic,
}: CourseMainContentProps) {
  if (!selectedTopic) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
          <BookOpen size={24} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">
            Select a topic
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose a topic from the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {selectedTopic.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedTopic.lectures.length} lecture
          {selectedTopic.lectures.length !== 1 ? "s" : ""} &middot;{" "}
          {selectedTopic.labs.length} lab
          {selectedTopic.labs.length !== 1 ? "s" : ""} &middot;{" "}
          {selectedTopic.assignments.length} assignment
          {selectedTopic.assignments.length !== 1 ? "s" : ""}
          {selectedTopic.resources && selectedTopic.resources.length > 0
            ? ` · ${selectedTopic.resources.length} resource${selectedTopic.resources.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </div>

      {/* Placeholder content area */}
      <div className="flex flex-1 items-center justify-center p-12">
        <p className="text-sm text-muted-foreground">
          Content for this topic will appear here.
        </p>
      </div>
    </div>
  );
}
