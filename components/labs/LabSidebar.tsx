"use client";

import LabHeaderCard from "@/components/labs/LabHeaderCard";
import AssignmentList from "@/components/labs/AssignmentList";
import ResourceList from "@/components/labs/ResourceList";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LabDetail, LabDetailAssignment } from "@/lib/types";

interface LabSidebarProps {
  lab: LabDetail;
  selectedAssignmentId: string | null;
  onAssignmentSelect: (assignment: LabDetailAssignment) => void;
}

export default function LabSidebar({
  lab,
  selectedAssignmentId,
  onAssignmentSelect,
}: LabSidebarProps) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col overflow-hidden border-r border-border bg-card">
      {/* Lab header — always visible */}
      <LabHeaderCard lab={lab} />

      {/* Scrollable middle section */}
      <ScrollArea className="flex-1">
        <AssignmentList
          assignments={lab.assignments}
          selectedAssignmentId={selectedAssignmentId}
          onAssignmentSelect={onAssignmentSelect}
        />

        <ResourceList resources={lab.resource} />
      </ScrollArea>
    </aside>
  );
}
