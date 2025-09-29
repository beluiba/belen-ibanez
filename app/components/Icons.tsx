import React from "react";

export function DotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="6" cy="14" r="2" fill="#222" />
      <circle cx="14" cy="14" r="2" fill="#222" />
      <circle cx="22" cy="14" r="2" fill="#222" />
    </svg>
  );
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="7" y1="7" x2="21" y2="21" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21" y1="7" x2="7" y2="21" stroke="#222" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
