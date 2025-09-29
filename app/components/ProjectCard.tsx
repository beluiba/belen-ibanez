import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  href: string;
  title: string;
  summary: string;
  tags?: string[];
  image?: string;
}

export default function ProjectCard({ href, title, summary, tags, image }: ProjectCardProps) {
  return (
    <a href={href} className="card">
      {image && (
        <div className="relative w-full h-48 mb-3 overflow-hidden rounded-t-[var(--radius)]">
          <Image
            src={image}
            alt={title + ' cover'}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="px-1">
        <h2 className="font-bold text-lg mb-1 leading-tight">{title}</h2>
        <p className="text-gray-500 mb-2 text-[1.05em]">{summary}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
