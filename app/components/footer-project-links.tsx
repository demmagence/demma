"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Project } from "../data";

export function FooterProjectLinks({ projects }: { projects: readonly Project[] }) {
  const pathname = usePathname();

  return projects.map((project) => (
    <Link href={`/projects/${project.slug}?from=${encodeURIComponent(pathname)}`} key={project.name}>
      {project.name}
    </Link>
  ));
}
