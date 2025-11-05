import React from "react";
import WorkGrid from "../../src/components/WorkGrid";
import Footer from "@/src/components/Footer";

export const metadata = {
  title: "Work — Belén Ibáñez",
  description: "Portfolio work highlights and other projects by Belén Ibáñez.",
};

export default function WorkPage() {
  return (
    <div className="work-page">
      <h2>Work</h2>
      <WorkGrid mode="full" />

      {/* show footer on work page */}
      <Footer />
    </div>
  );
}