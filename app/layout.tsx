import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Belén Ibáñez",
  description: "Design for decisions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="landing-header" role="banner">
          <span className="font-bold text-xl tracking-tight">Belén Ibáñez</span>
          <nav className="landing-nav" aria-label="Main navigation">
            <Link href="/case-studies" className="landing-nav-link">Case Studies</Link>
            <Link href="/other-works" className="landing-nav-link">Other Works</Link>
            <Link href="/contact" className="landing-nav-link">Contact</Link>
          </nav>
        </header>
        <main className="notion-main bg-transparent">
          {children}
        </main>
        <footer className="notion-footer">
          © {new Date().getFullYear()} Belén Ibáñez —{" "}
          <span className="italic">Design for decisions</span>
        </footer>
      </body>
    </html>
  );
}
