import type { Metadata } from "next";
import { HomePage } from "./components/editorial-pages";
import { copy } from "./data";

const c = copy.en;

export const metadata: Metadata = {
  title: `Demma Intelligence · ${c.heroTitleA} ${c.heroTitleB}`,
  description: c.heroBody,
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage locale="en" />;
}
