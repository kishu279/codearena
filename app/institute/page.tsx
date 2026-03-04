import InstituteCard from "@/components/institute/InstituteCard";
import type { InstituteListItem } from "@/lib/types";

export default async function InstitutesPage() {
  let institutes: InstituteListItem[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/institutes`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch institutes: ${response.statusText}`);
    }

    const data = await response.json();
    institutes = data.data || [];
  } catch (error) {
    console.error("Error fetching institutes:", error);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold text-foreground">Institutes</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Browse and join educational institutes.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {institutes.map((institute) => (
          <InstituteCard key={institute.id} institute={institute} />
        ))}
      </div>

      {institutes.length === 0 && (
        <p className="mt-6 text-muted-foreground">No institutes found.</p>
      )}
    </section>
  );
}
