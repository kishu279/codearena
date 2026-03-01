import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type ContestListItem } from "@/lib/types";
import { formatDateTime, formatDuration, getContestStatus, getStatusBadgeClass } from "@/lib/utils";

type ContestCardProps = {
  contest: ContestListItem;
};

export default function ContestCard({ contest }: ContestCardProps) {
  const status = getContestStatus(contest.startTime, contest.durationMinutes);

  return (
    <Card className="bg-surface">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{contest.title}</h3>
          <Badge className={`rounded-full ${getStatusBadgeClass(status)}`}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-text-secondary">Start: {formatDateTime(contest.startTime)}</p>
        <p className="mt-1 text-sm text-text-secondary">Duration: {formatDuration(contest.durationMinutes)}</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href={`/contests/${contest.id}`}>
            View Contest
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
