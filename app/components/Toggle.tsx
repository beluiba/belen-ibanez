'use client';
import React, { useState } from "react";

interface ToggleProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function Toggle({ title, children }: ToggleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-3">
      <button
        type="button"
        className="flex items-center gap-2 text-left w-full font-medium text-[var(--ink)]/90 hover:bg-[var(--bg)] px-2 py-1 rounded"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-lg select-none" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
        <span>{title}</span>
      </button>
      {open && (
        <div className="pl-7 pt-2">
          {children}
        </div>
      )}
    </div>
  );
}
