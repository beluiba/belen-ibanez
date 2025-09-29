import PageTitle from "../components/PageTitle";

const colors = [
  { name: "Brand", var: "#222" },
  { name: "Background", var: "var(--bg)" },
  { name: "Ink", var: "var(--ink)" },
  { name: "Border", var: "var(--border)" },
  { name: "Card", var: "var(--card)" },
];

export default function DesignSystemPage() {
  return (
    <section className="container-page mx-auto py-12 prose">
      <PageTitle title="Design System" subtitle="Foundations & components" />
      <h2>Typography Scale</h2>
      <div>
        <h1 className="font-serif text-4xl mb-2">Playfair Display h1</h1>
        <h2 className="font-serif text-2xl mb-2">Playfair Display h2</h2>
        <h3 className="font-serif text-lg mb-2">Playfair Display h3</h3>
        <p className="font-sans text-lg mb-2">Inter paragraph text</p>
        <p className="font-sans text-sm">Inter small text</p>
      </div>
      <h2>Color Palette</h2>
      <div className="flex gap-4 mb-6">
        {colors.map(c => (
          <div key={c.name} className="flex flex-col items-center">
            <div style={{ background: c.var, width: 48, height: 48, borderRadius: 8, border: "1px solid var(--border)" }} />
            <span className="text-xs mt-2">{c.name}</span>
          </div>
        ))}
      </div>
      <h2>Components</h2>
      <div className="flex flex-wrap gap-6 items-center mb-8">
        <button className="pill bg-black text-white">Button</button>
        <div className="card w-48">Card</div>
        <div className="pill">Pill</div>
        <table className="border border-[var(--border)] rounded w-auto">
          <tbody>
            <tr className="border-b border-[var(--border)]">
              <td className="px-4 py-2">Table row</td>
              <td className="px-4 py-2">Value</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Code Snippet</h2>
      <pre className="prose"><code>{`button.pill {
  background: #222;
  color: #fff;
  border-radius: 999px;
  padding: 0.3em 1em;
}`}</code></pre>
    </section>
  );
}
