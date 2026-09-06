import type { Metadata } from "next";
import { ProjectsPage } from "../components/editorial-pages";
import { copy } from "../data";

export const metadata: Metadata = {
  title: `${copy.en.nav.projects} · Demma Intelligence`,
  description: copy.en.projectsIntro,
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return <ProjectsPage locale="en" />;
}
