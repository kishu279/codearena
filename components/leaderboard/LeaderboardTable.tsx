import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type LeaderboardFilter, type LeaderboardRow } from "@/lib/types";
import { sortLeaderboardRows } from "@/lib/utils";

type LeaderboardTableProps = {
  rows: LeaderboardRow[];
  filter: LeaderboardFilter;
};

export default function LeaderboardTable({ rows, filter }: LeaderboardTableProps) {
  const sortedRows = sortLeaderboardRows(rows);

  return (
    <Card className="bg-surface">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{filter.replace("_", " ")} leaderboard</h2>
          <span className="text-xs uppercase text-text-secondary">Stable ranking</span>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border text-text-secondary">
              <TableHead>Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Rating / Points</TableHead>
              <TableHead>Problems Solved</TableHead>
              <TableHead>Contests Participated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow key={row.username} className="border-border/70 text-foreground">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.problemsSolved}</TableCell>
                <TableCell>{row.contestsParticipated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
