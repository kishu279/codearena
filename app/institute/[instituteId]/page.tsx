import { notFound } from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getInstituteById } from "@/lib/data";
import type { LabListItem } from "@/lib/types";

interface InstitutePageProps {
  params: Promise<{ instituteId: string }>;
}

export default async function InstitutePage({ params }: InstitutePageProps) {
  const { instituteId } = await params;

  const institute = await getInstituteById(instituteId);

  if (!institute) {
    notFound();
  }

  // Map labs to LabListItem format
  const labs: LabListItem[] = (institute.labs || []).map((lab: any) => ({
    id: lab.id,
    title: lab.title,
    slug: lab.slug,
    description: lab.description || "",
    memberCount: lab.members?.length || 0,
    assignmentCount: lab.assignments?.length || 0,
  }));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      {/* Institute Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-foreground">
            {institute.name}
          </h1>
          <Badge className="rounded-full bg-green-500/20 text-green-400">
            Institute
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {institute.description || "No description available"}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-surface">
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">
              {institute.members?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Members</p>
          </CardContent>
        </Card>
        <Card className="bg-surface">
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">
              {labs.length}
            </p>
            <p className="text-sm text-muted-foreground">Labs</p>
          </CardContent>
        </Card>
        <Card className="bg-surface">
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">
              {institute.contests?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Contests</p>
          </CardContent>
        </Card>
      </div>

      {/* Labs Section */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Labs</h2>
        {labs.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {labs.map((lab) => (
              <Card key={lab.id} className="bg-surface">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {lab.title}
                    </h3>
                    <Badge className="rounded-full bg-blue-500/20 text-blue-400">
                      Lab
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {lab.description || "No description available"}
                  </p>
                  <div className="mt-3 flex gap-4 text-sm text-text-secondary">
                    <p>Members: {lab.memberCount}</p>
                    <p>Assignments: {lab.assignmentCount}</p>
                  </div>
                  <Button variant="outline" asChild className="mt-4">
                    <Link href={`/labs/${lab.id}`}>View Lab</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No labs found in this institute.
          </p>
        )}
      </div>

      {/* Members Section */}
      {institute.members && institute.members.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Members
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {institute.members.map((member: any) => (
              <Card key={member.id} className="bg-surface">
                <CardContent className="pt-6">
                  <p className="font-medium text-foreground">
                    {member.user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.user?.email}
                  </p>
                  <Badge variant="secondary" className="mt-2 rounded-full">
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
