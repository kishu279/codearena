import { notFound } from "next/navigation";
import LabDetailsLayout from "@/components/labs/LabDetailsLayout";
import { getLabById } from "@/lib/data";
import type { LabDetail } from "@/lib/types";

interface LabPageProps {
  params: Promise<{ labId: string }>;
}

export default async function LabPage({ params }: LabPageProps) {
  const { labId } = await params;

  const rawLab = await getLabById(labId);

  if (!rawLab) {
    notFound();
  }

  // Serialize to convert Date objects to ISO strings for client components
  const lab: LabDetail = JSON.parse(JSON.stringify(rawLab));

  return <LabDetailsLayout lab={lab} />;
}
