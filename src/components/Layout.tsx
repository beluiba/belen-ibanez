"use client";
// import { usePathname } from "next/navigation";
import Contact from "./Contact";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* header/nav */}
      {children}
      {/* always render contact form */}
      <Contact />
    </>
  );
}