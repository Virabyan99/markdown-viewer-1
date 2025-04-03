import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function parseMarkdownChunks(chunks: string[]): Promise<string[]> {
  const parsedChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const result = await remark()
        .use(remarkGfm) // Enable GitHub Flavored Markdown features
        .use(remarkRehype) // Convert Markdown AST to HTML AST
        .use(rehypeSanitize) // Sanitize HTML for security
        .use(rehypeStringify) // Convert to HTML string
        .process(chunk);
      return result.toString();
    })
  );
  return parsedChunks;
}