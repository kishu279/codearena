import LabCard from "@/components/labs/LabCard";
import PaginationBar from "@/components/PaginationBar";
import { getLabsByPage } from "@/lib/data";
import type { LabListItem } from "@/lib/types";

export const revalidate = 60;

export default async function LabsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page as string) || 1;
  const limit = 10;

  let labListItems: LabListItem[] = [];
  let totalPages = 1;

  try {
    const { total, data } = await getLabsByPage(page, limit);
    totalPages = Math.ceil(total / limit);
    labListItems = data.map((lab) => ({
      id: lab.id,
      title: lab.title,
      slug: lab.slug,
      description: lab.description || "",
      memberCount: lab.memberCount,
      assignmentCount: lab.assignmentCount,
    }));
  } catch (error) {
    console.error("Error fetching labs:", error);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Labs</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Practice labs and coding assignments.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {labListItems.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      <PaginationBar currentPage={page} totalPages={totalPages} />
    </section>
  );
}
