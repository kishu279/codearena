import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import SystemActivity from "@/components/dashboard/SystemActivity";
import TopUsers from "@/components/dashboard/TopUsers";
import { getAdminDashboardData } from "@/lib/mock-data";

export default async function AdminDashboardPage() {
  const adminData = getAdminDashboardData();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Card className="mb-8 bg-surface">
        <CardHeader>
          <p className="text-xs uppercase tracking-wide text-text-secondary">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            Platform Overview
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <span>Role: Super Admin</span>
            <span>•</span>
            <span>Last updated: Just now</span>
          </div>
        </CardContent>
      </Card>

      <AdminDashboardStats stats={adminData.stats} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <RecentSubmissions submissions={adminData.recentSubmissions} />
        <SystemActivity activities={adminData.systemActivity} />
      </div>

      <div className="mt-8">
        <TopUsers users={adminData.topUsers} />
      </div>
    </section>
  );
}
