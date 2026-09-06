import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
import { ContactForm } from "./contact-form";
import { copy, members, projects, type Locale } from "../data";

function Arrow() {
  return <ArrowIcon className="arrow-icon" />;
}

function SectionHeading({ eyebrow, title, href, link }: { eyebrow: string; title: string; href?: string; link?: string }) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : <span aria-hidden="true" />}
      <div>
        <h2>{title}</h2>
        {href && link ? <Link className="text-link" href={href}>{link}<Arrow /></Link> : null}
      </div>
    </header>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const title = (
    <>Learning <Link href="/about">together</Link>, building <Link href="/projects">useful software</Link>.</>
  );

  return (
    <main>
      <section className="home-hero page-shell">
        <h1>{title}</h1>
        <div className="hero-intro">
          <p>{c.heroBody}</p>
        </div>
      </section>

      <section className="identity-panel page-shell">
        <div className="identity-copy">
          <p className="eyebrow">Demma Intelligence</p>
          <h2>{c.aboutTitle}</h2>
          <p>{c.aboutIntro}</p>
          <Link className="dark-button" href="/about">{c.meet}<Arrow /></Link>
        </div>
        <div className="robot-wrap">
          <Image src="/images/logo.png" alt="Demma Intelligence robot" width={620} height={620} priority sizes="(max-width: 700px) 90vw, 46vw" />
        </div>
      </section>

      <section className="content-section page-shell">
        <SectionHeading eyebrow={c.selected} title={c.projectsLead} />
        <div className="project-list">
          {projects.map((project, index) => (
            <Link className="project-row" href={`/projects/${project.slug}?from=home`} key={project.name}>
              <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
              <Image src={project.image} alt="" width={56} height={56} />
              <strong>{project.name}</strong>
              <span>{project.tech.join(" · ")}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="principle-statement">
        <div className="page-shell">
          <p className="eyebrow">{c.principles}</p>
          <h2>{c.footer}</h2>
        </div>
      </section>

      <section className="content-section page-shell">
        <SectionHeading eyebrow={c.collective} title={c.collectiveLead} />
        <div className="people-preview">
          {members.map((member) => (
            <a href={member.href} target="_blank" rel="noreferrer" key={member.name}>
              <div><Image src={member.image} alt={member.name} fill sizes="(max-width: 700px) 50vw, 20vw" /></div>
              <h3>{member.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-cta page-shell">
        <h2>{c.collaborate}</h2>
        <div><p>{c.collaborateBody}</p><Link className="dark-button" href="/contact">{c.writeUs}<Arrow /></Link></div>
      </section>
    </main>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main className="inner-page page-shell">
      <header className="page-hero"><h1>{c.aboutTitle}</h1><p>{c.aboutIntro}</p></header>
      <section className="about-panel">
        <div><p className="eyebrow">Demma Intelligence</p><h2>{c.aboutBody}</h2></div>
        <Image src="/images/logo.png" alt="Demma Intelligence robot" width={480} height={480} sizes="(max-width: 700px) 80vw, 40vw" />
      </section>
      <section className="principles">
        <SectionHeading eyebrow="" title={c.principles} />
        <div className="principle-grid">{c.principleItems.map(([number, heading, body]) => <article key={number}><span>{number}</span><h3>{heading}</h3><p>{body}</p></article>)}</div>
      </section>
    </main>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main className="inner-page page-shell">
      <header className="page-hero"><h1>{c.projectsTitle}</h1><p>{c.projectsIntro}</p></header>
      <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.name}><Link className="project-card-main" href={`/projects/${project.slug}`} aria-label={`View ${project.name} project`}><div className="card-top"><span>{String(index + 1).padStart(2, "0")}</span><Image className={project.name === "GlowMatch." ? "project-logo-glowmatch" : undefined} src={project.image} alt={`${project.name} logo`} width={72} height={72} /></div><h2>{project.name}</h2><p>{project.summary}</p><div className="project-tags">{project.cardTech.map(({ icon, name }) => <span key={name}><Image src={`/icons/${icon}`} alt="" width={17} height={17} />{name}</span>)}</div></Link></article>)}</div>
    </main>
  );
}

export function TeamPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main className="inner-page page-shell">
      <header className="page-hero"><h1>{c.teamTitle}</h1><p>{c.teamIntro}</p></header>
      <div className="team-grid">{members.map((member, index) => <article className="member-card" key={member.name}><a href={member.href} target="_blank" rel="noreferrer" aria-label={`Open ${member.name}'s GitHub profile`}><div className="member-photo"><Image src={member.image} alt={member.name} fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 620px) 42vw, 250px" /></div></a><h2>{member.name}</h2></article>)}</div>
    </main>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <main className="inner-page page-shell contact-page">
      <header className="page-hero"><h1>{c.contactTitle}</h1><p>{c.contactIntro}</p></header>
      <section className="contact-layout"><aside><p className="eyebrow">{c.direct}</p><a href="mailto:demmagence@gmail.com">demmagence@gmail.com</a><a href="https://github.com/demmagence" target="_blank" rel="noreferrer">github.com/demmagence</a><a href="https://www.instagram.com/demmagence" target="_blank" rel="noreferrer">instagram.com/demmagence</a></aside><ContactForm locale={locale} /></section>
    </main>
  );
}
