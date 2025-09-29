import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="mb-8 prose">
      <h1 className="mb-1 font-serif font-bold text-3xl leading-tight tracking-tight">{title}</h1>
      {subtitle && (
        <div className="text-lg text-gray-500 mt-1 font-normal leading-snug">{subtitle}</div>
      )}
    </div>
  );
}
