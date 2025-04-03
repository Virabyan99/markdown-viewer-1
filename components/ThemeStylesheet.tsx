"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeStylesheet() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const linkId = "github-markdown-css";
    let link = document.getElementById(linkId) as HTMLLinkElement;

    // Create the link element if it doesn’t exist
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Set the href based on the current theme
    const cssFile =
      resolvedTheme === "dark"
        ? "/css/github-markdown-dark.css"
        : "/css/github-markdown-light.css";
    link.href = cssFile;
  }, [resolvedTheme]); // Re-run when the theme changes

  return null; // This component doesn’t render anything
}