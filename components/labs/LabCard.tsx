import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type LabListItem } from "@/lib/types";

type LabCardProps = {
  lab: LabListItem;
};

export default function LabCard({ lab }: LabCardProps) {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{lab.title}</h3>
          <Badge className="rounded-full bg-blue-500/20 text-blue-400">
            Lab
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary line-clamp-2">
          {lab.description}
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
  );
}
