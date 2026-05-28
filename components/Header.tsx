"use client";

import { Plus, Code2 } from "lucide-react";

interface HeaderProps {
  onNewSnippet: () => void;
  snippetCount: number;
}

export default function Header({ onNewSnippet, snippetCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary/80 backdrop-blur-sm z-10 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-accent-blue/20 border border-accent-blue/30 flex items-center justify-center">
          <Code2 size={14} className="text-accent-blue" />
        </div>
        <span className="font-mono font-semibold text-text-primary tracking-tight">
          Dev<span className="text-accent-blue">Snippet</span>
        </span>
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono text-text-muted bg-bg-tertiary border border-border">
          {snippetCount} saved
        </span>
      </div>
      <button
        onClick={onNewSnippet}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-blue hover:bg-accent-blue/80 text-bg-primary rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent-blue/20 active:scale-95"
      >
        <Plus size={15} />
        <span>New Snippet</span>
      </button>
    </header>
  );
}