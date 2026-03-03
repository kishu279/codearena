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
        <CardTitle className="text-lg font-semibold text-foreground">Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-text-secondary">
                <th className="pb-3 pr-4">User</th>
                <th className="pb-3 pr-4">Problem</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Language</th>
                <th className="pb-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4">
                    <span className="font-medium text-foreground">{submission.username}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-text-secondary">{submission.problemTitle}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-sm text-text-secondary">{submission.language}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-text-secondary">
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
