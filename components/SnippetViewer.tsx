"use client";

import { useState } from "react";
import { Copy, Check, Pencil, Trash2, ArrowLeft, Clock } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Snippet } from "../lib/types";
import { LANGUAGES, LANGUAGE_MAP } from "../lib/constants";
import { formatDistanceToNow } from "../lib/utils";

interface SnippetViewerProps {
  snippet: Snippet;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export default function SnippetViewer({ snippet, onEdit, onDelete, onBack }: SnippetViewerProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const lang = LANGUAGES.find((l) => l.id === snippet.language);
  const highlightLang = LANGUAGE_MAP[snippet.language] ?? "plaintext";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = snippet.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary/40 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onBack} className="md:hidden p-1.5 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-base font-semibold text-text-primary truncate">{snippet.title}</h1>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={onEdit} className="p-2 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors">
            <Pencil size={15} />
          </button>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition-all duration-200 ${
              showDeleteConfirm
                ? "bg-accent-red/20 text-accent-red border border-accent-red/30"
                : "hover:bg-bg-tertiary text-text-secondary hover:text-accent-red"
            }`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border/50 bg-bg-primary flex-shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono font-semibold"
            style={{ backgroundColor: `${lang?.color ?? "#7d8590"}22`, color: lang?.color ?? "#7d8590", border: `1px solid ${lang?.color ?? "#7d8590"}44` }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang?.color ?? "#7d8590" }} />
            {lang?.label ?? snippet.language}
          </span>
          {snippet.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-md text-xs text-accent-purple/80 bg-accent-purple/10 border border-accent-purple/20 font-mono">
              #{tag}
            </span>
          ))}
          <div className="ml-auto flex items-center gap-1 text-xs text-text-muted">
            <Clock size={11} />
            {formatDistanceToNow(snippet.updatedAt)}
          </div>
        </div>
        {snippet.description && (
          <p className="mt-2 text-sm text-text-secondary">{snippet.description}</p>
        )}
      </div>

      <div className="flex-1 overflow-auto relative">
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
            isCopied
              ? "bg-accent-green/20 text-accent-green border-accent-green/40"
              : "bg-bg-secondary/80 text-text-secondary border-border hover:text-text-primary hover:bg-bg-tertiary"
          }`}
        >
          {isCopied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
        </button>
        <SyntaxHighlighter
          language={highlightLang}
          style={atomOneDark}
          showLineNumbers
          lineNumberStyle={{ color: "#484f58", fontSize: "12px", paddingRight: "16px", minWidth: "44px", userSelect: "none" }}
          customStyle={{ margin: 0, padding: "16px", background: "transparent", fontSize: "13px", lineHeight: "1.6", height: "100%", overflowX: "auto" }}
          codeTagProps={{ style: { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" } }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}