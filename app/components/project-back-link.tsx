"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowIcon } from "./arrow-icon";

export function ProjectBackLink() {
  const from = useSearchParams().get("from");
  const destinations: Record<string, { href: string; label: string }> = {
    home: { href: "/", label: "Back to home" },
    "/": { href: "/", label: "Back to home" },
    "/about": { href: "/about", label: "Back to about" },
    "/projects": { href: "/projects", label: "Back to projects" },
    "/team": { href: "/team", label: "Back to team" },
    "/contact": { href: "/contact", label: "Back to contact" },
  };
  const destination = from ? destinations[from] : undefined;
  const href = destination?.href ?? "/projects";
  const label = destination?.label ?? "Back to projects";

  return (
    <Link className="project-detail-back" href={href}>
      <ArrowIcon className="arrow-icon arrow-icon-back" />
      {label}
    </Link>
  );
}
