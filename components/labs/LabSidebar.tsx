"use client";

import {
  Video,
  ClipboardList,
  Code2,
  Link2,
  Megaphone,
  FlaskConical,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { LabDetail, LabLecture } from "@/lib/types";

interface LabSidebarProps {
  lab: LabDetail;
  selectedLectureId: string | null;
  onLectureSelect: (lecture: LabLecture) => void;
}

function SubSectionHeader({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="mb-1 flex items-center gap-1.5">
      {icon}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Badge variant="secondary" className="h-4 px-1.5 text-xs">
        {count}
      </Badge>
    </div>
  );
}

function ItemRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2 py-1 text-xs text-muted-foreground">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
      <span className="leading-snug">{label}</span>
    </li>
  );
}

export default function LabSidebar({
  lab,
  selectedLectureId,
  onLectureSelect,
}: LabSidebarProps) {
  const handleAccordionChange = (value: string) => {
    const lecture = lab.lectures.find((l) => l.id === value);
    if (lecture) {
      onLectureSelect(lecture);
    }
  };

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-surface">
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <FlaskConical size={14} className="shrink-0 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Lab Details
          </span>
        </div>
        <h2 className="text-base font-semibold leading-snug text-foreground">
          {lab.title}
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{lab.instructor}</p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {lab.description}
        </p>
        <div className="mt-3 flex gap-3 text-xs text-muted-foreground">
          <span>{lab.memberCount} members</span>
          <span>{lab.assignmentCount} assignments</span>
        </div>
      </div>

      <Separator />

      <div className="px-4 pb-1 pt-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Lectures
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 pb-4">
          <Accordion
            type="single"
            collapsible
            value={selectedLectureId ?? undefined}
            onValueChange={handleAccordionChange}
            className="w-full"
          >
            {lab.lectures.map((lecture) => {
              const isSelected = selectedLectureId === lecture.id;
              return (
                <AccordionItem
                  key={lecture.id}
                  value={lecture.id}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={[
                      "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-card hover:no-underline",
                      isSelected ? "bg-card text-primary" : "text-foreground",
                    ].join(" ")}
                  >
                    <span className="flex-1 text-left leading-snug">
                      {lecture.title}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-0">
                    <div className="ml-3 border-l border-border pb-2 pl-3 pt-1">
                      {lecture.videos.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<Video size={11} className="text-muted-foreground" />}
                            label="Videos"
                            count={lecture.videos.length}
                          />
                          <ul className="space-y-0">
                            {lecture.videos.map((video) => (
                              <ItemRow
                                key={video.id}
                                label={`${video.title} · ${video.duration}`}
                              />
                            ))}
                          </ul>
                        </div>
                      )}

                      {lecture.assignments.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<ClipboardList size={11} className="text-muted-foreground" />}
                            label="Assignments"
                            count={lecture.assignments.length}
                          />
                          <ul className="space-y-0">
                            {lecture.assignments.map((assignment) => (
                              <ItemRow key={assignment.id} label={assignment.title} />
                            ))}
                          </ul>
                        </div>
                      )}

                      {lecture.problems.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<Code2 size={11} className="text-muted-foreground" />}
                            label="Problems"
                            count={lecture.problems.length}
                          />
                          <ul className="space-y-0">
                            {lecture.problems.map((problem) => (
                              <ItemRow
                                key={problem.id}
                                label={`${problem.title} · ${problem.difficulty}`}
                              />
                            ))}
                          </ul>
                        </div>
                      )}

                      {lecture.resources && lecture.resources.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<Link2 size={11} className="text-muted-foreground" />}
                            label="Resources"
                            count={lecture.resources.length}
                          />
                          <ul className="space-y-0">
                            {lecture.resources.map((resource) => (
                              <ItemRow key={resource.id} label={resource.title} />
                            ))}
                          </ul>
                        </div>
                      )}

                      {lecture.announcements && lecture.announcements.length > 0 && (
                        <div>
                          <SubSectionHeader
                            icon={<Megaphone size={11} className="text-muted-foreground" />}
                            label="Announcements"
                            count={lecture.announcements.length}
                          />
                          <ul className="space-y-0">
                            {lecture.announcements.map((ann) => (
                              <ItemRow key={ann.id} label={ann.title} />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
}
