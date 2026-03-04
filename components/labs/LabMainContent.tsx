import { FlaskConical, Play } from "lucide-react";
import type { LabLecture } from "@/lib/types";

export default function LabMainContent({ selectedLecture }: { selectedLecture: LabLecture | null }) {
  if (!selectedLecture) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface">
          <FlaskConical size={24} className="text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">Select a lecture</h2>
          <p className="text-sm text-muted-foreground">Choose a lecture from the sidebar to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold text-foreground">{selectedLecture.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {selectedLecture.videos.length} video{selectedLecture.videos.length !== 1 ? "s" : ""} &middot;{" "}
          {selectedLecture.assignments.length} assignment{selectedLecture.assignments.length !== 1 ? "s" : ""} &middot;{" "}
          {selectedLecture.problems.length} problem{selectedLecture.problems.length !== 1 ? "s" : ""}
          {selectedLecture.resources && selectedLecture.resources.length > 0
            ? ` · ${selectedLecture.resources.length} resource${selectedLecture.resources.length !== 1 ? "s" : ""}`
            : ""}
          {selectedLecture.announcements && selectedLecture.announcements.length > 0
            ? ` · ${selectedLecture.announcements.length} announcement${selectedLecture.announcements.length !== 1 ? "s" : ""}`
            : ""}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-8">
        <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Play size={28} className="translate-x-0.5 text-white" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
