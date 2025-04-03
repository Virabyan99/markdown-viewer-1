"use client";

import { useState, useEffect } from "react";
import Dropzone from "@/components/dropzone";
import { parseMarkdownChunks } from "@/lib/markdown";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlPages, setHtmlPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileContent = async (text: string) => {
    setMarkdownContent(text);

    const PAGE_SIZE = 3000;
    const chunks = [];
    for (let i = 0; i < text.length; i += PAGE_SIZE) {
      chunks.push(text.slice(i, i + PAGE_SIZE));
    }

    const parsedPages = await parseMarkdownChunks(chunks);
    setHtmlPages(parsedPages);
    setCurrentPage(0);
  };

  if (!mounted) {
    return (
      <main className="flex flex-col items-center gap-6 p-6">
        <h1 className="text-2xl font-bold">Markdown Viewer</h1>
        <Dropzone onFileContent={handleFileContent} />
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Markdown Viewer</h1>

      <Dropzone onFileContent={handleFileContent} />

      {htmlPages.length > 0 && (
        <>
          <div className="w-full max-w-3xl p-4 border rounded">
            <h2 className="mb-4 font-semibold">Markdown Preview:</h2>
            <article
              className="markdown-body rounded-md p-2"
              dangerouslySetInnerHTML={{ __html: htmlPages[currentPage] }}
            />
          </div>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              <PaginationItem className="px-4 text-sm text-muted-foreground">
                Page {currentPage + 1} of {htmlPages.length}
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(htmlPages.length - 1, p + 1))
                  }
                  className={
                    currentPage === htmlPages.length - 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </main>
  );
}