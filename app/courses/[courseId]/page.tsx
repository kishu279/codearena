// import { notFound } from "next/navigation";
// import { getCourseById } from "@/lib/mock-data";
// import CourseDetailsLayout from "@/components/course/CourseDetailsLayout";

// interface CoursePageProps {
//   params: Promise<{ courseId: string }>;
// }

// export default async function CoursePage({ params }: CoursePageProps) {
//   const { courseId } = await params;
//   const course = getCourseById(courseId);

//   if (!course) {
//     notFound();
//   }

//   return <CourseDetailsLayout course={course} />;
// }
