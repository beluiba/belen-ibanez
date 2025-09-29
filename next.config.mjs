import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // IMPORTANT: do NOT set providerImportSource here
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: { mdxRs: true },
};

export default withMDX(nextConfig);
export { withMDX };