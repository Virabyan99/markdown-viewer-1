import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";

// Custom plugin to add a default language class to code blocks
function rehypeDefaultLanguage() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "code" && node.properties) {
        const classes = node.properties.className || [];
        if (!classes.some((cls: string) => cls.startsWith("language-"))) {
          node.properties.className = [...classes, "language-plaintext"];
        }
      }
    });
  };
}

export async function parseMarkdownChunks(chunks: string[]): Promise<string[]> {
  const parsedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const result = await remark()
        .use(remarkGfm) // GitHub Flavored Markdown support
        .use(remarkRehype) // Convert Markdown to HTML AST
        .use(rehypeDefaultLanguage) // Add default language class
        .use(rehypeSanitize) // Sanitize HTML
        .use(rehypeHighlight) // Apply syntax highlighting
        .use(rehypeStringify) // Convert to HTML string
        .process(chunk);
      return result.toString();
    })
  );
  return parsedChunks;
}