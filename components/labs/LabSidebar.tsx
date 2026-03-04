"use client";

import {
  ChevronDown,
  ClipboardList,
  Code2,
  FlaskConical,
  Link2,
  Users,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { LabDetail, LabDetailAssignment } from "@/lib/types";
import type { LabTab } from "@/components/labs/LabDetailsLayout";

interface LabSidebarProps {
  lab: LabDetail;
  selectedAssignmentId: string | null;
  onAssignmentSelect: (assignment: LabDetailAssignment) => void;
  selectedTab: LabTab;
  onTabSelect: (tab: LabTab) => void;
}

function getDifficultyLabel(d: string) {
  switch (d) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
    default:
      return d;
  }
}

export default function LabSidebar({
  lab,
  selectedAssignmentId,
  onAssignmentSelect,
  selectedTab,
  onTabSelect,
}: LabSidebarProps) {
  const instructorName =
    lab.createdBy?.name ?? lab.createdBy?.email ?? "Unknown";

  return (
    <Sidebar collapsible="none" className="border-r border-sidebar-border">
      {/* ── Header: lab info ── */}
      <SidebarHeader className="gap-0 p-4">
        <div className="mb-2 flex items-center gap-2">
          <FlaskConical size={14} className="shrink-0 text-sidebar-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/60">
            Lab Details
          </span>
        </div>
        <h2 className="text-base font-semibold leading-snug text-sidebar-foreground">
          {lab.title}
        </h2>
        <p className="mt-0.5 text-xs text-sidebar-foreground/60">
          {instructorName}
        </p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-sidebar-foreground/60">
          {lab.description}
        </p>
        <div className="mt-3 flex gap-3 text-xs text-sidebar-foreground/60">
          <span className="flex items-center gap-1">
            <Users size={11} />
            {lab.members.length} members
          </span>
          <span>{lab.assignments.length} assignments</span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Content: scrollable assignments ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest">
            Assignments
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lab.assignments.map((assignment) => {
                const isSelected = selectedAssignmentId === assignment.id;

                return (
                  <Collapsible
                    key={assignment.id}
                    open={isSelected}
                    onOpenChange={(open) => {
                      if (open) onAssignmentSelect(assignment);
                    }}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isSelected}
                          tooltip={assignment.title}
                        >
                          <span className="flex-1 truncate text-left">
                            {assignment.title}
                          </span>
                          <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {/* ── Problems sub-item ── */}
                          {assignment.problems.length > 0 && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={
                                  isSelected && selectedTab === "problems"
                                }
                                onClick={() => {
                                  if (!isSelected)
                                    onAssignmentSelect(assignment);
                                  onTabSelect("problems");
                                }}
                                className="cursor-pointer"
                              >
                                <Code2 size={12} />
                                <span>Problems</span>
                              </SidebarMenuSubButton>
                              <SidebarMenuBadge>
                                {assignment.problems.length}
                              </SidebarMenuBadge>
                            </SidebarMenuSubItem>
                          )}

                          {/* ── Individual problem items ── */}
                          {assignment.problems.map((problem) => (
                            <SidebarMenuSubItem key={problem.id}>
                              <SidebarMenuSubButton
                                onClick={() => {
                                  if (!isSelected)
                                    onAssignmentSelect(assignment);
                                  onTabSelect("problems");
                                }}
                                className="cursor-pointer text-sidebar-foreground/60"
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sidebar-border" />
                                <span className="truncate">
                                  {problem.title} ·{" "}
                                  {getDifficultyLabel(problem.difficulty)}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}

                          {/* ── Resources sub-item ── */}
                          {assignment.resource.length > 0 && (
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                isActive={
                                  isSelected && selectedTab === "resources"
                                }
                                onClick={() => {
                                  if (!isSelected)
                                    onAssignmentSelect(assignment);
                                  onTabSelect("resources");
                                }}
                                className="cursor-pointer"
                              >
                                <Link2 size={12} />
                                <span>Resources</span>
                              </SidebarMenuSubButton>
                              <SidebarMenuBadge>
                                {assignment.resource.length}
                              </SidebarMenuBadge>
                            </SidebarMenuSubItem>
                          )}

                          {/* ── Individual resource items ── */}
                          {assignment.resource.map((res) => (
                            <SidebarMenuSubItem key={res.id}>
                              <SidebarMenuSubButton
                                onClick={() => {
                                  if (!isSelected)
                                    onAssignmentSelect(assignment);
                                  onTabSelect("resources");
                                }}
                                className="cursor-pointer text-sidebar-foreground/60"
                              >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sidebar-border" />
                                <span className="truncate">{res.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}

                          {/* ── Empty state ── */}
                          {assignment.problems.length === 0 &&
                            assignment.resource.length === 0 && (
                              <SidebarMenuSubItem>
                                <span className="px-2 py-1 text-xs text-sidebar-foreground/40">
                                  No items yet.
                                </span>
                              </SidebarMenuSubItem>
                            )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ── Lab-level resources ── */}
        {lab.resource.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-widest">
                Lab Resources
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {lab.resource.map((res) => (
                    <SidebarMenuItem key={res.id}>
                      <SidebarMenuButton tooltip={res.title}>
                        <ClipboardList size={14} />
                        <span className="truncate">{res.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-3">
        <div className="text-[10px] text-sidebar-foreground/40">
          {lab.assignments.length} assignment
          {lab.assignments.length !== 1 ? "s" : ""} · {lab.members.length}{" "}
          member{lab.members.length !== 1 ? "s" : ""}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
