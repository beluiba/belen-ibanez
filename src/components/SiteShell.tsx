"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Contact from "./Contact";
import Footer from "./Footer";
import styles from "@/styles/components/SiteShell.module.scss";

type ContactWithOnCloseProps = {
  open?: boolean;
  onClose?: () => void;
};
const ContactWithOnClose = Contact as React.ComponentType<ContactWithOnCloseProps>;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openContact, setOpenContact] = useState(false);

  const handleOpenContact = () => {
    console.log("[SiteShell] handleOpenContact");
    setOpenContact(true);
    window.dispatchEvent(new Event("contact:open"));
  };

  const handleCloseContact = () => {
    console.log("[SiteShell] handleCloseContact");
    setOpenContact(false);
    window.dispatchEvent(new Event("contact:close"));
  };

  useEffect(() => {
    // open contact if landing on /#contact
    const checkHash = () => {
      if (window.location.pathname === "/" && window.location.hash === "#contact") {
        setOpenContact(true);
        window.dispatchEvent(new Event("contact:open"));
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className={styles.siteShell}>
      <Nav onOpenContact={handleOpenContact} />
      <main>{children}</main>
      {/* only render Contact component outside /work, controlled by openContact */}
      {pathname && !pathname.startsWith("/work") && (
        <ContactWithOnClose open={openContact} onClose={handleCloseContact} />
      )}
      {/* footer added */}
      <Footer />
    </div>
  );
}
