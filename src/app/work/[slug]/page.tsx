import React from "react";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default function WorkSlugPage({ params }: Props) {
  const { slug } = params;

  return (
    <main id="main-content" style={{ padding: 24 }}>
      <h1>Project: {slug}</h1>
      <p>This page renders the project for &quot;{slug}&quot;. Replace with your real UI/data fetching.</p>

      <p style={{ marginTop: 16 }}>
        <Link href="/work">← Back to Work list</Link>
      </p>
    </main>
  );
}