import PageTitle from "../components/PageTitle";

export default function AboutPage() {
  return (
    <section className="container-page mx-auto py-12 prose">
      <PageTitle title="I design clarity for complex products." />
      <p>
        My journey: graphic design → SaaS UX → design leadership. I help teams turn ambiguity into actionable solutions and beautiful interfaces.
      </p>
      <h2>Superpowers</h2>
      <ul>
        <li>Data visualization & storytelling</li>
        <li>Design systems & scalable UI</li>
        <li>Facilitation & cross-functional workshops</li>
        <li>Crisp, accessible product interfaces</li>
      </ul>
      <h2>Toolkit</h2>
      <ul>
        <li>Figma & prototyping</li>
        <li>SCSS/tokens for design consistency</li>
        <li>React mindset & component thinking</li>
        <li>Analytics & product metrics</li>
      </ul>
      <p>
        London → Barcelona. Multilingual. Always learning.
      </p>
      <a
        href="/cv.pdf"
        className="pill inline-block mt-4 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-colors"
        download
      >
        Download CV
      </a>
    </section>
  );
}
