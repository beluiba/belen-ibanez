import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/src/components/Nav";
import "@/styles/global.scss"; // ensure global tokens/styles are imported

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "Belén Ibáñez",
  description: "Design for decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Nav />
        </header>

        {/* Modal root sits outside main so modals overlay header and any stacking contexts */}
        <div id="modal-root" />
        <main id="main-content">{children}</main>

        {/* ensure footer exists in layout (or page) */}
        {/* <Footer /> can live here or in app/page.tsx */}
      </body>
    </html>
  );
}
