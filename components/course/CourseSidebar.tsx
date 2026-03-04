"use client";

import {
  BookOpen,
  FlaskConical,
  ClipboardList,
  Link2,
  GraduationCap,
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
import type { CourseDetail, CourseTopic } from "@/lib/types";

interface CourseSidebarProps {
  course: CourseDetail;
  selectedTopicId: string | null;
  onTopicSelect: (topic: CourseTopic) => void;
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

export default function CourseSidebar({
  course,
  selectedTopicId,
  onTopicSelect,
}: CourseSidebarProps) {
  const handleAccordionChange = (value: string) => {
    const topic = course.topics.find((t) => t.id === value);
    if (topic) {
      onTopicSelect(topic);
    }
  };

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-border bg-surface">
      {/* Course Details Header */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <GraduationCap size={14} className="shrink-0 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Course Details
          </span>
        </div>
        <h2 className="text-base font-semibold leading-snug text-foreground">
          {course.title}
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">{course.instructor}</p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      </div>

      <Separator />

      {/* Topics label */}
      <div className="px-4 pb-1 pt-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Topics
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 pb-4">
          <Accordion
            type="single"
            collapsible
            value={selectedTopicId ?? undefined}
            onValueChange={handleAccordionChange}
            className="w-full"
          >
            {course.topics.map((topic) => {
              const isSelected = selectedTopicId === topic.id;
              return (
                <AccordionItem
                  key={topic.id}
                  value={topic.id}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={[
                      "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-card hover:no-underline",
                      isSelected ? "bg-card text-primary" : "text-foreground",
                    ].join(" ")}
                  >
                    <span className="flex-1 text-left leading-snug">
                      {topic.title}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-0">
                    <div className="ml-3 border-l border-border pb-2 pl-3 pt-1">
                      {/* Lectures */}
                      {topic.lectures.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<BookOpen size={11} className="text-muted-foreground" />}
                            label="Lectures"
                            count={topic.lectures.length}
                          />
                          <ul className="space-y-0">
                            {topic.lectures.map((lecture) => (
                              <ItemRow
                                key={lecture.id}
                                label={`${lecture.title} · ${lecture.duration}`}
                              />
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Labs */}
                      {topic.labs.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<FlaskConical size={11} className="text-muted-foreground" />}
                            label="Labs"
                            count={topic.labs.length}
                          />
                          <ul className="space-y-0">
                            {topic.labs.map((lab) => (
                              <ItemRow key={lab.id} label={lab.title} />
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Assignments */}
                      {topic.assignments.length > 0 && (
                        <div className="mb-3">
                          <SubSectionHeader
                            icon={<ClipboardList size={11} className="text-muted-foreground" />}
                            label="Assignments"
                            count={topic.assignments.length}
                          />
                          <ul className="space-y-0">
                            {topic.assignments.map((assignment) => (
                              <ItemRow
                                key={assignment.id}
                                label={assignment.title}
                              />
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Resources */}
                      {topic.resources && topic.resources.length > 0 && (
                        <div>
                          <SubSectionHeader
                            icon={<Link2 size={11} className="text-muted-foreground" />}
                            label="Resources"
                            count={topic.resources.length}
                          />
                          <ul className="space-y-0">
                            {topic.resources.map((resource) => (
                              <ItemRow key={resource.id} label={resource.title} />
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
