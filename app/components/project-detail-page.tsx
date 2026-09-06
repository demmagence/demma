import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data";
import { ArrowIcon } from "./arrow-icon";

type ProjectDetailPageProps = {
  project: Project;
  index: number;
  previous: Project;
  next: Project;
};

export function ProjectDetailPage({ project, index, previous, next }: ProjectDetailPageProps) {
  return (
    <main className="project-detail page-shell">
      <Link className="project-detail-back" href="/projects">
        <ArrowIcon className="arrow-icon arrow-icon-back" />
        Back to projects
      </Link>

      <section className="project-detail-hero">
        <div className="project-detail-copy">
          <p className="eyebrow">Project {String(index + 1).padStart(2, "0")}</p>
          <h1>{project.name}</h1>
          <p className="project-detail-summary">{project.summary}</p>
          <div className="project-detail-platforms" aria-label="Platforms">
            {project.platform.map((platform) => <span key={platform}>{platform}</span>)}
          </div>
          <a className="dark-button" href={project.github} target="_blank" rel="noreferrer">
            Open on GitHub
            <ArrowIcon className="arrow-icon" />
          </a>
        </div>
        <div className="project-detail-logo" data-project={project.slug}>
          <Image src={project.image} alt={`${project.name} logo`} width={420} height={420} priority sizes="(max-width: 700px) 70vw, 34vw" />
        </div>
      </section>

      <section className="project-detail-overview">
        <p className="eyebrow">Overview</p>
        <p>{project.overview}</p>
      </section>

      <section className="project-detail-section">
        <header>
          <p className="eyebrow">What it does</p>
          <h2>Key capabilities</h2>
        </header>
        <ol className="capability-list">
          {project.capabilities.map((capability, capabilityIndex) => (
            <li key={capability}>
              <span>{String(capabilityIndex + 1).padStart(2, "0")}</span>
              <p>{capability}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="project-detail-section project-detail-contributors">
        <header>
          <p className="eyebrow">People</p>
          <h2>Project contributors</h2>
        </header>
        <div className="contributor-list">
          {project.contributors.map((contributor) => (
            <a href={contributor.github} target="_blank" rel="noreferrer" key={contributor.username}>
              <Image className="contributor-avatar" src={contributor.avatar} alt={`${contributor.name} profile photo`} width={46} height={46} />
              <div>
                <strong>{contributor.name}</strong>
                <small>@{contributor.username}</small>
              </div>
              <ArrowIcon className="arrow-icon" />
            </a>
          ))}
        </div>
      </section>

      <section className="project-detail-section project-detail-stack">
        <header>
          <p className="eyebrow">Built with</p>
          <h2>Technology stack</h2>
        </header>
        <div className="stack-list">
          {project.tech.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </section>

      <nav className="project-pagination" aria-label="Project navigation">
        <Link href={`/projects/${previous.slug}`}>
          <span>Previous project</span>
          <strong><ArrowIcon className="arrow-icon arrow-icon-back" />{previous.name}</strong>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <span>Next project</span>
          <strong>{next.name}<ArrowIcon className="arrow-icon arrow-icon-forward" /></strong>
        </Link>
      </nav>
    </main>
  );
}
