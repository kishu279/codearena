import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TopUser = {
  username: string;
  submissions: number;
  solved: number;
};

type TopUsersProps = {
  users: TopUser[];
};

export default function TopUsers({ users }: TopUsersProps) {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle>Top Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {users.map((user, index) => (
            <li key={user.username} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                  {index + 1}
                </span>
                <span className="font-medium text-foreground">{user.username}</span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{user.solved} solved</span>
                <span>{user.submissions} submissions</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
