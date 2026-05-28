"use client";

import { Snippet } from "../lib/types";
import { LANGUAGES } from "../lib/constants";
import { formatDistanceToNow } from "../lib/utils";

interface SnippetCardProps {
  snippet: Snippet;
  isSelected: boolean;
  onClick: () => void;
}

export default function SnippetCard({ snippet, isSelected, onClick }: SnippetCardProps) {
  const lang = LANGUAGES.find((l) => l.id === snippet.language);
  const preview = snippet.code.split("\n").slice(0, 2).join("\n");

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 group transition-all duration-150 border-l-2 hover:bg-bg-secondary/60 ${
        isSelected ? "border-l-accent-blue bg-bg-secondary/80" : "border-l-transparent hover:border-l-border"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-sm font-medium leading-tight line-clamp-1 flex-1 text-text-primary">
          {snippet.title}
        </span>
        <span
          className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
          style={{
            backgroundColor: `${lang?.color ?? "#7d8590"}22`,
            color: lang?.color ?? "#7d8590",
          }}
        >
          {lang?.label ?? snippet.language}
        </span>
      </div>
      <pre className="text-[11px] font-mono text-text-muted line-clamp-2 leading-relaxed overflow-hidden">
        {preview}
      </pre>
      <div className="flex items-center gap-2 mt-2">
        {snippet.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] text-accent-purple/70 bg-accent-purple/10 px-1.5 py-0.5 rounded">
            #{tag}
          </span>
        ))}
        <span className="ml-auto text-[10px] text-text-muted">
          {formatDistanceToNow(snippet.updatedAt)}
        </span>
      </div>
    </button>
  );
}