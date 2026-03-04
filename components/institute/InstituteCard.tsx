import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { InstituteListItem } from "@/lib/types";

type InstituteCardProps = {
  institute: InstituteListItem;
};

export default function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            {institute.name}
          </h3>
          <Badge className="rounded-full bg-green-500/20 text-green-400">
            Institute
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary line-clamp-2">
          {institute.description || "No description available"}
        </p>
        <div className="mt-3 flex gap-4 text-sm text-text-secondary">
          <p>Members: {institute.memberCount}</p>
          <p>Labs: {institute.labCount}</p>
          <p>Contests: {institute.contestCount}</p>
        </div>
        <Button variant="outline" asChild className="mt-4">
          <Link href={`/institute/${institute.id}`}>View Institute</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
