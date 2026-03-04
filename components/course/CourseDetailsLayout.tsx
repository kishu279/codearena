"use client";

import { useState } from "react";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseMainContent from "@/components/course/CourseMainContent";
import type { CourseDetail, CourseTopic } from "@/lib/types";

interface CourseDetailsLayoutProps {
  course: CourseDetail;
}

export default function CourseDetailsLayout({
  course,
}: CourseDetailsLayoutProps) {
  const [selectedTopic, setSelectedTopic] = useState<CourseTopic | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <CourseSidebar
        course={course}
        selectedTopicId={selectedTopic?.id ?? null}
        onTopicSelect={setSelectedTopic}
      />
      <CourseMainContent selectedTopic={selectedTopic} />
    </div>
  );
}
