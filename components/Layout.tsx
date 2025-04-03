"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import ThemeStylesheet from "@/components/ThemeStylesheet";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeStylesheet />
      <div className="flex min-h-screen flex-col">
        <header className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-semibold">Markdown Viewer</h1>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col p-4">{children}</main>
      </div>
    </ThemeProvider>
  );
}