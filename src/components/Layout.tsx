"use client";
import { usePathname } from "next/navigation";
import Contact from "./Contact";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkPage = !!pathname && pathname.startsWith("/work");

  return (
    <>
      {/* header/nav */}
      {children}
      {/* only render contact form outside /work */}
      {!isWorkPage && <Contact />}
    </>
  );
}