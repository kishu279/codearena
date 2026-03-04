"use client";

import { useState } from "react";
import LabSidebar from "@/components/labs/LabSidebar";
import LabMainContent from "@/components/labs/LabMainContent";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "18rem",
        } as React.CSSProperties
      }
    >
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
        <LabSidebar
          lab={lab}
          selectedAssignmentId={selectedAssignment?.id ?? null}
          onAssignmentSelect={setSelectedAssignment}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
        />
        <SidebarInset>
          <LabMainContent
            selectedAssignment={selectedAssignment}
            selectedTab={selectedTab}
            onTabSelect={setSelectedTab}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
