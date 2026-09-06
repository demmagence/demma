import Image from "next/image";
import Link from "next/link";
import { FooterProjectLinks } from "./footer-project-links";
import { copy, pagePaths, projects, type Locale, type PageKey } from "../data";

const pageKeys: PageKey[] = ["about", "projects", "team", "contact"];

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand"><Image src="/images/logo.png" alt="" width={78} height={78} /><p>{c.footer}</p></div>
        <div className="footer-columns">
          <div><h2>Demma</h2>{pageKeys.map((key) => <Link href={`/${pagePaths[key]}`} key={key}>{c.nav[key]}</Link>)}</div>
          <div>
            <h2>{c.nav.projects}</h2>
            <FooterProjectLinks projects={projects.slice(0, 4)} />
          </div>
          <div>
            <h2 className="footer-heading-spacer" aria-hidden="true">{c.nav.projects}</h2>
            <FooterProjectLinks projects={projects.slice(4)} />
          </div>
          <div><h2>{c.nav.contact}</h2><a href="mailto:demmagence@gmail.com">Email</a><a href="https://github.com/demmagence" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.instagram.com/demmagence" target="_blank" rel="noreferrer">Instagram</a></div>
        </div>
        <p className="copyright">© 2026 {c.rights}</p>
      </div>
    </footer>
  );
}
