import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./components/arrow-icon";

export default function NotFound() {
  return (
    <main className="not-found-page page-shell">
      <div className="not-found-copy">
        <p className="eyebrow">Error 404</p>
        <h1>This page wandered off.</h1>
        <p>The address may be incorrect, or the page may no longer exist. Let&apos;s get you back to something useful.</p>
        <div className="not-found-actions">
          <Link className="dark-button" href="/">Back home <ArrowIcon className="arrow-icon" /></Link>
        </div>
      </div>
      <div className="not-found-visual">
        <span aria-hidden="true">404</span>
        <Image src="/images/logo.png" alt="Demma Intelligence robot" width={440} height={440} priority sizes="(max-width: 700px) 75vw, 38vw" />
      </div>
    </main>
  );
}
