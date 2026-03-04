import { notFound } from "next/navigation";
import LabDetailsLayout from "@/components/labs/LabDetailsLayout";

interface LabPageProps {
  params: Promise<{ labId: string }>;
}

export default async function LabPage({ params }: LabPageProps) {
  const { labId } = await params;
  let lab;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/labs/${labId}`,
    );

    if (response.ok == false) {
      notFound();
    }

    const data = await response.json();

    console.log(`Fetched lab details for ${labId}:`, data);

    lab = data.data;
  } catch (error) {
    console.error("Error fetching lab details:", error);
  }

  if (!lab) {
    notFound();
  }

  return <LabDetailsLayout lab={lab} />;
}
