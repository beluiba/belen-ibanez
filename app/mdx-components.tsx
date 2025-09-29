// DO NOT import '@mdx-js/react' here.
// Keep this minimal so it stays server-safe.
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
