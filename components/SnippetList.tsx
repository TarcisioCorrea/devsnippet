"use client";

import { Search, Plus, Filter } from "lucide-react";
import { Snippet } from "../lib/types";
import { LANGUAGES } from "../lib/constants";
import SnippetCard from "./SnippetCard";

interface SnippetListProps {
  snippets: Snippet[];
  selectedSnippet: Snippet | null;
  onSelect: (snippet: Snippet) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  availableLanguages: string[];
  onNewSnippet: () => void;
}

export default function SnippetList({
  snippets, selectedSnippet, onSelect, searchQuery, onSearchChange,
  selectedLanguage, onLanguageChange, availableLanguages, onNewSnippet,
}: SnippetListProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-bg-primary">
      <div className="p-3 space-y-2 border-b border-border bg-bg-secondary/40">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-bg-tertiary border border-border text-text-primary placeholder:text-text-muted rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30 transition-all"
          />
        </div>
        {availableLanguages.length > 0 && (
          <div className="relative">
            <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full appearance-none bg-bg-tertiary border border-border text-text-secondary rounded-lg pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-accent-blue/60 transition-all cursor-pointer"
            >
              <option value="all">All languages</option>
              {availableLanguages.map((lang) => {
                const langDef = LANGUAGES.find((l) => l.id === lang);
                return <option key={lang} value={lang}>{langDef?.label ?? lang}</option>;
              })}
            </select>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 px-4 text-center animate-fade-in">
            <p className="text-sm text-text-secondary">No snippets found</p>
            <button
              onClick={onNewSnippet}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-accent-blue border border-accent-blue/30 rounded-lg hover:bg-accent-blue/10 transition-all"
            >
              <Plus size={12} />
              Create snippet
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {snippets.map((snippet, i) => (
              <div key={snippet.id} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}>
                <SnippetCard
                  snippet={snippet}
                  isSelected={selectedSnippet?.id === snippet.id}
                  onClick={() => onSelect(snippet)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}