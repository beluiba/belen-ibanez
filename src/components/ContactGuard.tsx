"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Contact from "./Contact";

export default function ContactGuard() {
  const pathname = usePathname();
  const isWorkPage = !!pathname && pathname.startsWith("/work");
  if (isWorkPage) return null;
  return <Contact />;
}