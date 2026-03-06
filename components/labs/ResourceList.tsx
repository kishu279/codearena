import { Link2, FileText, AlignLeft, ExternalLink } from "lucide-react";
import type { LabDetailResource } from "@/lib/types";

interface ResourceListProps {
  resources: LabDetailResource[];
}

function ResourceIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  if (t === "link" || t === "url") return <Link2 size={12} className="shrink-0 text-muted-foreground" />;
  if (t === "file" || t === "pdf") return <FileText size={12} className="shrink-0 text-muted-foreground" />;
  return <AlignLeft size={12} className="shrink-0 text-muted-foreground" />;
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (resources.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="px-4 pb-1 pt-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Lab Resources
        </span>
      </div>

      <div className="px-2 pb-2">
        {resources.map((res) => {
          const isLink = res.url && (res.type.toLowerCase() === "link" || res.type.toLowerCase() === "url");
          const content = (
            <div className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-accent">
              <ResourceIcon type={res.type} />
              <span className="flex-1 truncate text-xs text-foreground/80">
                {res.title}
              </span>
              {isLink && <ExternalLink size={10} className="shrink-0 text-muted-foreground" />}
            </div>
          );

          return isLink ? (
            <a
              key={res.id}
              href={res.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={res.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
