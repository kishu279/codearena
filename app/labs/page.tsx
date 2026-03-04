import LabCard from "@/components/labs/LabCard";
import { getAllLabDetails } from "@/lib/mock-data";
import type { LabListItem } from "@/lib/types";

export default function LabsPage() {
  const labListItems: LabListItem[] = getAllLabDetails().map((lab) => ({
    id: lab.id,
    title: lab.title,
    slug: lab.id,
    description: lab.description,
    memberCount: lab.memberCount,
    assignmentCount: lab.assignmentCount,
  }));

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
    </section>
  );
}
