import InstituteCard from "@/components/institute/InstituteCard";
import PaginationBar from "@/components/PaginationBar";
import { getInstitutesByPage } from "@/lib/data";
import type { InstituteListItem } from "@/lib/types";

export const revalidate = 60;

export default async function InstitutesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt(params?.page as string) || 1;
  const limit = 10;

  let institutes: InstituteListItem[] = [];
  let totalPages = 1;

  try {
    const { total, data } = await getInstitutesByPage(page, limit);
    institutes = data;
    totalPages = Math.ceil(total / limit);
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

      <PaginationBar currentPage={page} totalPages={totalPages} />
    </section>
  );
}
