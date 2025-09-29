"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      <ol className="flex flex-wrap gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href || item.label} className="flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type Frontmatter = {
  title?: string;
  summary?: string;
  role?: string;
  year?: string | number;
  industry?: string;
  tags?: string[];
  [key: string]: unknown;
};

type LoadedModule = { default: React.ComponentType; frontmatter?: Frontmatter };

const pages: Record<string, () => Promise<LoadedModule>> = {
  adarma: () => import("@/content/work/adarma.mdx"),
  // later: silico, bank-of-america
};

export default function Page({ params }: { params?: { slug?: string } }) {
  const slug = params?.slug;
  const [mod, setMod] = React.useState<LoadedModule | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Tabs header
  const tabs = [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Other Works", href: "/other-works" },
    { label: "Contact", href: "/#contact" },
  ];
  // Determine active tab by current slug or location
  let activeTab = "Case Studies";
  if (slug === "other-works") activeTab = "Other Works";
  if (slug === "contact") activeTab = "Contact";

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        if (!slug) {
          setError("notfound");
          return;
        }
        const loader = pages[slug];
        if (!loader) {
          setError("notfound");
          return;
        }
        const m = await loader();
        if (mounted) setMod(m);
      } catch {
        setError("loadfail");
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (error === "notfound") return notFound();
  if (!mod) return <div className="container-page py-12">Loading…</div>;

  const MDXContent = mod.default;
  const fm = mod.frontmatter ?? {};
  const title =
    fm.title || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Work");

  return (
    <>
      <header className="tabs-header">
        <div className="tabs-title">Belén Ibáñez</div>
        <nav className="tabs-nav" aria-label="Main tabs">
          {tabs.map(tab => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`tabs-link${
                activeTab === tab.label ? " tabs-link-active" : ""
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </header>
      <section className="container-page prose mx-auto py-12">
        <Breadcrumbs items={[{ label: "Work", href: "/work" }, { label: title }]} />
        <h1 className="font-serif font-bold text-3xl mb-2">{title}</h1>
        {fm.summary && <p className="text-lg text-gray-500 mb-4">{fm.summary}</p>}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
          {fm.role && (
            <span>
              Role: <b>{fm.role}</b>
            </span>
          )}
          {fm.year && (
            <span>
              Year: <b>{fm.year}</b>
            </span>
          )}
          {fm.industry && (
            <span>
              Industry: <b>{fm.industry}</b>
            </span>
          )}
          {Array.isArray(fm.tags) &&
            fm.tags.map((tag: string) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
        </div>
        <article className="prose prose-lg">
          <MDXContent />
        </article>
      </section>
    </>
  );
}
