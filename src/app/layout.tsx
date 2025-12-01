import React from "react";
import "./globals.css"; // optional — keep if your project uses a global stylesheet

export const metadata = { title: "Belen — Portfolio" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}