import { FlaskConical } from "lucide-react";
import AssignmentDetails from "@/components/labs/AssignmentDetails";
import LabOverview from "@/components/labs/LabOverview";
import type { LabDetail, LabDetailAssignment } from "@/lib/types";
import type { LabTab } from "@/components/labs/LabDetailsLayout";

interface LabMainContentProps {
  lab: LabDetail;
  selectedAssignment: LabDetailAssignment | null;
  selectedTab: LabTab;
  onTabSelect: (tab: LabTab) => void;
}

export default function LabMainContent({
  lab,
  selectedAssignment,
  selectedTab,
  onTabSelect,
}: LabMainContentProps) {
  if (!selectedAssignment) {
    // No assignment selected — show lab overview or empty state
    if (lab.assignments.length === 0) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card">
            <FlaskConical size={24} className="text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">No assignments yet</h2>
            <p className="text-sm text-muted-foreground">
              This lab has no assignments yet.
            </p>
          </div>
        </div>
      );
    }

    return <LabOverview lab={lab} />;
  }

  return (
    <AssignmentDetails
      assignment={selectedAssignment}
      selectedTab={selectedTab}
      onTabSelect={onTabSelect}
    />
  );
}
