import type { Metadata } from "next";
import { TeamPage } from "../components/editorial-pages";
import { copy } from "../data";

export const metadata: Metadata = {
  title: `${copy.en.nav.team} · Demma Intelligence`,
  description: copy.en.teamIntro,
  alternates: { canonical: "/team" },
};

export default function Page() {
  return <TeamPage locale="en" />;
}
