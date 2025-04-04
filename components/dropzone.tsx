"use client";

import { useState, useRef } from "react";

export default function Dropzone({
  onFileContent,
}: {
  onFileContent: (text: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".md")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        onFileContent(text);
      }
    };
    reader.readAsText(file);
  };

  // Handle file input change when clicking
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.endsWith(".md")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        onFileContent(text);
      }
    };
    reader.readAsText(file);
  };

  // Trigger file input click when the image is clicked
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      onClick={handleClick}
      className="flex items-center justify-center cursor-pointer"
    >
      <input
        type="file"
        accept=".md"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img
        src="/transparent_icon_128.png"
        alt="Upload file"
        className="w-32 h-32"
      />
    </div>
  );
}