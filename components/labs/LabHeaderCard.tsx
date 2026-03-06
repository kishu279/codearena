import { FlaskConical, Building2, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LabDetail } from "@/lib/types";

interface LabHeaderCardProps {
  lab: LabDetail;
}

export default function LabHeaderCard({ lab }: LabHeaderCardProps) {
  const instructorName =
    lab.createdBy?.name ?? lab.createdBy?.email ?? "Unknown";
  const instituteName = lab.institute?.name ?? null;

  return (
    <Card className="rounded-none border-0 border-b border-border shadow-none">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <FlaskConical size={14} className="text-primary" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Lab Details
          </span>
        </div>

        <h2 className="text-base font-semibold leading-snug text-foreground">
          {lab.title}
        </h2>

        {instituteName && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 size={11} className="shrink-0" />
            <span className="truncate">{instituteName}</span>
          </div>
        )}

        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <User size={11} className="shrink-0" />
          <span className="truncate">{instructorName}</span>
        </div>

        {lab.description && (
          <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {lab.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
