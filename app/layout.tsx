import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Nav from "../src/components/Nav";
import Footer from "../src/components/Footer";
import Contact from "../src/components/Contact";
import Head from "../src/components/Head";
import "@/styles/global.scss";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Belén Ibáñez",
  description: "Design for decisions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
        <Head />
      <body className={inter.className}>
        <Nav />
        {children}
        <Contact />
        <Footer />
      </body>
    </html>
  );
}
