import type { Metadata } from "next";
import { AboutPage } from "../components/editorial-pages";
import { copy } from "../data";

export const metadata: Metadata = {
  title: `${copy.en.nav.about} · Demma Intelligence`,
  description: copy.en.aboutIntro,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage locale="en" />;
}
