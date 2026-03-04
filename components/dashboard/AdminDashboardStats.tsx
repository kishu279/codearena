import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type AdminStats } from "@/lib/types";

type AdminStatsProps = {
  stats: AdminStats;
};

const statConfig: Array<{
  key: keyof AdminStats;
  label: string;
  suffix?: string;
  icon?: string;
}> = [
  { key: "totalUsers", label: "Total Users", icon: "👥" },
  { key: "totalProblems", label: "Total Problems", icon: "📝" },
  { key: "totalContests", label: "Total Contests", icon: "🏆" },
  { key: "totalSubmissions", label: "Total Submissions", icon: "📤" },
  { key: "activeUsers", label: "Active Users", icon: "✅" },
  { key: "systemHealth", label: "System Health", icon: "💚" },
];

export default function AdminDashboardStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statConfig.map((item) => {
        const value = stats[item.key];
        const isHealthy = item.key === "systemHealth" && value === "Healthy";

        return (
          <Card
            key={item.key}
            className={`bg-surface ${
              item.key === "systemHealth"
                ? isHealthy
                  ? "border-green-500/50"
                  : "border-red-500/50"
                : ""
            }`}
          >
            <CardHeader className="pb-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.icon} {item.label}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">
                {value}
                {item.suffix ?? ""}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
