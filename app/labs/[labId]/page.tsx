import { notFound } from "next/navigation";
import { getLabById } from "@/lib/mock-data";
import LabDetailsLayout from "@/components/labs/LabDetailsLayout";

interface LabPageProps {
  params: Promise<{ labId: string }>;
}

export default async function LabPage({ params }: LabPageProps) {
  const { labId } = await params;
  const lab = getLabById(labId);

  if (!lab) {
    notFound();
  }

  return <LabDetailsLayout lab={lab} />;
}
