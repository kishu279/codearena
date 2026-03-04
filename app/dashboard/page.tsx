import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardHubPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard Hub</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a role to view the corresponding dashboard
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Super Admin Dashboard */}
        <Link href="/admin/dashboard">
          <Card className="bg-surface shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/80">
            <CardHeader>
              <CardTitle>👑 Super Admin</CardTitle>
              <CardDescription>Full platform access</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Platform overview</li>
                <li>• User management</li>
                <li>• System monitoring</li>
                <li>• All submissions</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        {/* Admin Dashboard */}
        <Link href="/admin/dashboard">
          <Card className="bg-surface shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/80">
            <CardHeader>
              <CardTitle>🛡️ Admin</CardTitle>
              <CardDescription>Contest & problem management</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Contest analytics</li>
                <li>• Problem management</li>
                <li>• User activity</li>
                <li>• Submissions review</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        {/* User Dashboard */}
        <Link href="/sourav/dashboard">
          <Card className="bg-surface shadow-sm transition-colors hover:border-primary/50 hover:bg-surface/80">
            <CardHeader>
              <CardTitle>👤 User</CardTitle>
              <CardDescription>Personal progress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your stats</li>
                <li>• Recent activity</li>
                <li>• Solved problems</li>
                <li>• Contest history</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mt-8 bg-surface shadow-sm">
        <CardHeader>
          <CardTitle>Demo Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-foreground">Super Admin:</p>
              <code className="rounded-md bg-surface-2 px-3 py-2 text-sm text-muted-foreground">
                /admin/dashboard
              </code>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-foreground">Admin:</p>
              <code className="rounded-md bg-surface-2 px-3 py-2 text-sm text-muted-foreground">
                /admin/dashboard
              </code>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-foreground">Regular User:</p>
              <code className="rounded-md bg-surface-2 px-3 py-2 text-sm text-muted-foreground">
                /sourav/dashboard
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
