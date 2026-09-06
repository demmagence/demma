"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowIcon } from "./arrow-icon";

export function ProjectBackLink() {
  const fromHome = useSearchParams().get("from") === "home";

  return (
    <Link className="project-detail-back" href={fromHome ? "/" : "/projects"}>
      <ArrowIcon className="arrow-icon arrow-icon-back" />
      {fromHome ? "Back to home" : "Back to projects"}
    </Link>
  );
}
