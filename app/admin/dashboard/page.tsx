
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";
import RecentSubmissions from "@/components/dashboard/RecentSubmissions";
import SystemActivity from "@/components/dashboard/SystemActivity";
import TopUsers from "@/components/dashboard/TopUsers";
import { getAdminDashboardData } from "@/lib/mock-data";

export default async function AdminDashboardPage() {
  const adminData = getAdminDashboardData();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Admin Dashboard</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Platform Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Role: Super Admin &nbsp;·&nbsp; Last updated: Just now
        </p>
      </div>

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
