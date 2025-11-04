import type { Metadata } from "next";
import Nav from "@/src/components/Nav";
import "@/styles/global.scss"; // ensure global tokens/styles are imported
import "@/styles/tokens/buttons.scss";

export const metadata: Metadata = {
  title: "Belén Ibáñez",
  description: "Design for decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* tokens/buttons.scss imported at top-level of this module */}
        <header>
          <Nav />
        </header>

        {/* Modal root sits outside main so modals overlay header and any stacking contexts */}
        <div id="modal-root" />
        {children}

        {/* ensure footer exists in layout (or page) */}
        {/* <Footer /> can live here or in app/page.tsx */}
      </body>
    </html>
  );
}
