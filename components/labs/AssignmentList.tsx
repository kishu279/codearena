"use client";

import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { LabDetailAssignment } from "@/lib/types";

interface AssignmentListProps {
  assignments: LabDetailAssignment[];
  selectedAssignmentId: string | null;
  onAssignmentSelect: (assignment: LabDetailAssignment) => void;
}

function formatDateRange(startTime: string, endTime: string) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  return `${fmt(startTime)} – ${fmt(endTime)}`;
}

export default function AssignmentList({
  assignments,
  selectedAssignmentId,
  onAssignmentSelect,
}: AssignmentListProps) {
  return (
    <div className="flex flex-col border-b border-border">
      <div className="px-4 pb-1 pt-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Assignments
        </span>
      </div>

      <ScrollArea className="max-h-64">
        <div className="px-2 pb-2">
          {assignments.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              No assignments yet.
            </p>
          ) : (
            assignments.map((assignment) => {
              const isActive = selectedAssignmentId === assignment.id;
              return (
                <button
                  key={assignment.id}
                  onClick={() => onAssignmentSelect(assignment)}
                  className={cn(
                    "w-full rounded-md px-3 py-2.5 text-left transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "text-foreground/80"
                  )}
                >
                  <p
                    className={cn(
                      "truncate text-sm font-medium leading-snug",
                      isActive && "text-primary"
                    )}
                  >
                    {assignment.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar size={9} className="shrink-0" />
                    <span>{formatDateRange(assignment.startTime, assignment.endTime)}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
