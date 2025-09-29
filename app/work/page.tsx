import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ProjectCard from "../components/ProjectCard";

interface Project {
  slug: string;
  href: string;
  title?: string;
  summary?: string;
  tags?: string[];
  cover?: string;
  [key: string]: unknown;
}

function getAllProjects(): Project[] {
  const dir = path.join(process.cwd(), "content/work");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
  return files.map(file => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(source) as { data: Partial<Project> };
    const slug = typeof data.slug === "string" ? data.slug : file.replace(/\.mdx$/, "");
    return {
      ...(data as Partial<Project>),
      slug,
      href: `/work/${slug}`,
    } as Project;
  });
}

export default function WorkPage() {
  const projects = getAllProjects();
  return (
    <section className="container-page mx-auto py-12">
      <h1 className="font-serif font-bold text-3xl mb-8">Selected Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(project => (
          <ProjectCard
            key={project.slug}
            href={project.href}
            title={project.title ?? project.slug}
            summary={project.summary ?? ""}
            tags={project.tags}
            image={project.cover}
          />
        ))}
      </div>
    </section>
  );
}
