import LabCard from "@/components/labs/LabCard";
import { getAllLabDetails } from "@/lib/mock-data";
import type { LabListItem } from "@/lib/types";

export default async function LabsPage() {
  let labListItems: LabListItem[] = [];

  // const labListItems: LabListItem[] = getAllLabDetails().map((lab) => ({
  //   id: lab.id,
  //   title: lab.title,
  //   slug: lab.id,
  //   description: lab.description,
  //   memberCount: lab.memberCount,
  //   assignmentCount: lab.assignmentCount,
  // }));

  try {
    console.log("Fetching labs data from API...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/labs`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch labs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched labs data:", data);

    labListItems = (data.labs || []).map((lab: any) => ({
      id: lab.id,
      title: lab.title,
      slug: lab.id,
      description: lab.description,
      memberCount: lab.memberCount || 0, // Assuming API returns memberCount
      assignmentCount: lab.assignmentCount || 0, // Assuming API returns assignmentCount
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
    </section>
  );
}
