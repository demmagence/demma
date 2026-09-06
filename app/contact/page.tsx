import type { Metadata } from "next";
import { ContactPage } from "../components/editorial-pages";
import { copy } from "../data";

export const metadata: Metadata = {
  title: `${copy.en.nav.contact} · Demma Intelligence`,
  description: copy.en.contactIntro,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage locale="en" />;
}
