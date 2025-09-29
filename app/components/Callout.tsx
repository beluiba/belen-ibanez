import React from "react";

interface CalloutProps {
  icon?: string;
  children: React.ReactNode;
}

export default function Callout({ icon = "💡", children }: CalloutProps) {
  return (
    <div className="callout flex items-start gap-3 text-[var(--ink)]/80">
      <span className="text-2xl select-none" aria-hidden="true">{icon}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
