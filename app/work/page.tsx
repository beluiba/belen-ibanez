import WorkGrid from "../../src/components/WorkGrid";

export const metadata = {
  title: "Work — Belén Ibáñez",
  description: "Portfolio work highlights and other projects by Belén Ibáñez.",
};

export default function WorkPage() {
  return (
    <main className="work-container" id="main-content">
      <h2>Work</h2>
      <WorkGrid mode="full" />
    </main>
  );
}