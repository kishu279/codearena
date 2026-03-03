import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SystemActivity as SystemActivityType } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

type SystemActivityProps = {
  activities: SystemActivityType[];
};

function getActivityIcon(type: string): string {
  switch (type) {
    case "user":
      return "👤";
    case "contest":
      return "🏆";
    case "problem":
      return "📝";
    case "system":
      return "⚙️";
    default:
      return "📌";
  }
}

function getActivityColor(type: string): string {
  switch (type) {
    case "user":
      return "text-blue-500";
    case "contest":
      return "text-purple-500";
    case "problem":
      return "text-green-500";
    case "system":
      return "text-gray-500";
    default:
      return "text-text-secondary";
  }
}

export default function SystemActivity({ activities }: SystemActivityProps) {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">System Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3">
              <span className="text-lg">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`font-medium ${getActivityColor(activity.type)}`}>
                    {activity.action}
                  </p>
                  <span className="text-xs text-text-secondary">
                    {formatDateTime(activity.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{activity.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
