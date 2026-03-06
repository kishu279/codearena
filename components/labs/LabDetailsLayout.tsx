"use client";

import React, { useState } from "react";
import LabSidebar from "@/components/labs/LabSidebar";
import LabMainContent from "@/components/labs/LabMainContent";
import type { LabDetail, LabDetailAssignment } from "@/lib/types";

export type LabTab = "problems" | "resources";

interface LabDetailsLayoutProps {
  lab: LabDetail;
}

export default function LabDetailsLayout({ lab }: LabDetailsLayoutProps) {
  const [selectedAssignment, setSelectedAssignment] =
    useState<LabDetailAssignment | null>(null);
  const [selectedTab, setSelectedTab] = useState<LabTab>("problems");

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      <LabSidebar
        lab={lab}
        selectedAssignmentId={selectedAssignment?.id ?? null}
        onAssignmentSelect={setSelectedAssignment}
      />

      <main className="flex flex-1 flex-col overflow-hidden bg-background">
        <LabMainContent
          lab={lab}
          selectedAssignment={selectedAssignment}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
      </main>
    </div>
  );
}
