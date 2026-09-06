import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RouteScrollReset } from "./components/route-scroll-reset";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://demma.vercel.app"),
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jakarta.variable}`}>
      <body>
        <RouteScrollReset />
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader locale="en" />
        <div id="content">{children}</div>
        <SiteFooter locale="en" />
      </body>
    </html>
  );
}
