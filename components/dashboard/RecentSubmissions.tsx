import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type RecentSubmission } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

type RecentSubmissionsProps = {
  submissions: RecentSubmission[];
};

function getStatusColor(status: string): string {
  switch (status) {
    case "Accepted":
      return "text-green-500";
    case "Wrong Answer":
      return "text-red-500";
    case "Time Limit Exceeded":
      return "text-yellow-500";
    case "Runtime Error":
      return "text-orange-500";
    default:
      return "text-text-secondary";
  }
}

export default function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">User</th>
                <th className="pb-3 pr-4 font-medium">Problem</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Language</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4">
                    <span className="font-medium text-foreground">{submission.username}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-muted-foreground">{submission.problemTitle}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-muted-foreground">{submission.language}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(submission.submittedAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
