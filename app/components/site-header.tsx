"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { copy, type Locale, pagePaths, type PageKey } from "../data";

const keys: PageKey[] = ["home", "about", "projects", "team", "contact"];

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const c = copy[locale];

  return (
    <>
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Demma Intelligence">
          <Image src="/images/logo.png" alt="" width={42} height={42} priority />
          <span>Demma<br />Intelligence</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {keys.map((key) => {
            const href = pagePaths[key] ? `/${pagePaths[key]}` : "/";
            const active = pathname === href;
            return <Link key={key} href={href} aria-current={active ? "page" : undefined}>{c.nav[key]}</Link>;
          })}
        </nav>
        <div className="header-actions">
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? c.close : c.menu}>
            <span /><span />
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        {keys.map((key, index) => {
          const href = pagePaths[key] ? `/${pagePaths[key]}` : "/";
          const active = pathname === href;
          return <Link key={key} href={href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span>{c.nav[key]}</Link>;
        })}
      </nav>
    </header>
    {open ? <button className="mobile-nav-backdrop" type="button" onClick={() => setOpen(false)} aria-label={c.close} /> : null}
    </>
  );
}
