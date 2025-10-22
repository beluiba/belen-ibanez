import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import SiteShell from "@/src/components/SiteShell";
import "@/styles/global.scss";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Belén Ibáñez",
  description: "Design for decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
