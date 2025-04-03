"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export default function Dropzone({
  onFileContent,
}: {
  onFileContent: (text: string) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  // Handle file drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files[0] // Limit to one file
    if (!file) return

    // Validate file type (only .md allowed)
    if (!file.name.endsWith(".md")) {
      setError("Only .md files are allowed.")
      return
    }

    // File is valid: update state and read content
    setFileName(file.name)
    setError(null) // Clear any previous errors

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === "string") {
        onFileContent(text) // Pass content to parent
      }
    }
    reader.readAsText(file)
  }

  return (
    <Card
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true) // Highlight when dragging over
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDragging(false) // Remove highlight
      }}
      onDrop={handleDrop}
      className={cn(
        "flex items-center justify-center border-2 border-dashed transition-colors",
        fileName && !error ? "h-16" : "h-48", // Collapse to h-16 if file is dropped and no error
        isDragging ? "border-primary bg-muted" : "border-border bg-background"
      )}
    >
      <div className="text-center">
        {fileName ? (
          <p className="mb-2">File: <strong>{fileName}</strong></p>
        ) : (
          <p className="mb-2">Drag & drop a <strong>.md</strong> file here</p>
        )}
        {error && <p className="text-destructive">{error}</p>}
      </div>
    </Card>
  )
}