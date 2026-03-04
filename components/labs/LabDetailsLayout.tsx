"use client";

import { useState } from "react";
import LabSidebar from "@/components/labs/LabSidebar";
import LabMainContent from "@/components/labs/LabMainContent";
import type { LabDetail, LabLecture } from "@/lib/types";

interface LabDetailsLayoutProps {
  lab: LabDetail;
}

export default function LabDetailsLayout({ lab }: LabDetailsLayoutProps) {
  const [selectedLecture, setSelectedLecture] = useState<LabLecture | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <LabSidebar
        lab={lab}
        selectedLectureId={selectedLecture?.id ?? null}
        onLectureSelect={setSelectedLecture}
      />
      <LabMainContent selectedLecture={selectedLecture} />
    </div>
  );
}
