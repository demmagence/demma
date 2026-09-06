import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "../../components/project-detail-page";
import { getProject, projects } from "../../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.name} · Demma Intelligence`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = getProject(slug);

  if (!project || index < 0) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetailPage project={project} index={index} previous={previous} next={next} />;
}
