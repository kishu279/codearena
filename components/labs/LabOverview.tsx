import { Users, ClipboardList, FlaskConical, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LabDetail } from "@/lib/types";

interface LabOverviewProps {
  lab: LabDetail;
}

export default function LabOverview({ lab }: LabOverviewProps) {
  const instructorName =
    lab.createdBy?.name ?? lab.createdBy?.email ?? "Unknown";

  return (
    <div className="flex flex-1 flex-col overflow-auto p-8">
      {/* Title */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <FlaskConical size={18} className="text-primary" />
          <h1 className="text-xl font-semibold text-foreground">{lab.title}</h1>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <User size={13} className="shrink-0" />
          <span>{instructorName}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ClipboardList size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Assignments</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {lab.assignments.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Members</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {lab.members.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      {lab.description && (
        <Card className="shadow-none">
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              About this Lab
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {lab.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
