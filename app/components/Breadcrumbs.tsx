import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs flex items-center gap-1 text-gray-400 text-[0.98em]" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={item.label} className="flex items-center">
          {item.href && idx !== items.length - 1 ? (
            <a href={item.href} className="hover:underline text-gray-400">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-500 font-medium">{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </nav>
  );
}
