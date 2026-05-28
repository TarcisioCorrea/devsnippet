"use client";

import { useState, useEffect, useRef } from "react";
import { X, Save } from "lucide-react";
import { Snippet, SnippetFormData } from "../lib/types";
import { LANGUAGES } from "../lib/constants";

interface SnippetFormProps {
  initialData: Snippet | null;
  onSave: (data: SnippetFormData) => void;
  onClose: () => void;
}

export default function SnippetForm({ initialData, onSave, onClose }: SnippetFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [language, setLanguage] = useState(initialData?.language ?? "typescript");
  const [code, setCode] = useState(initialData?.code ?? "");
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(", ") ?? "");
  const [errors, setErrors] = useState<{ title?: string; code?: string }>({});

  useEffect(() => { titleRef.current?.focus(); }, []);

  const validate = () => {
    const newErrors: { title?: string; code?: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!code.trim()) newErrors.code = "Code cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const tags = tagsInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    onSave({ title: title.trim(), description, language, code, tags });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); handleSave(); }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onKeyDown={handleKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-bg-secondary border border-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary">
            {initialData ? "Edit Snippet" : "New Snippet"}
          </h2>
          <div className="flex items-center gap-3">
            <kbd className="hidden sm:inline-block text-[10px] text-text-muted bg-bg-tertiary border border-border px-1.5 py-0.5 rounded font-mono">
              ⌘S to save
            </kbd>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Title <span className="text-accent-red">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: undefined })); }}
              placeholder="e.g. useDebounce hook"
              className={`w-full bg-bg-tertiary border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-all ${errors.title ? "border-accent-red/50" : "border-border focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30"}`}
            />
            {errors.title && <p className="text-xs text-accent-red">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/60 transition-all cursor-pointer"
              >
                {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Tags</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="react, hooks, utils"
                className="w-full bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue/60 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Description <span className="text-text-muted normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this snippet does"
              className="w-full bg-bg-tertiary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue/60 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Code <span className="text-accent-red">*</span>
            </label>
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); if (errors.code) setErrors((p) => ({ ...p, code: undefined })); }}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end = e.currentTarget.selectionEnd;
                  const newCode = code.substring(0, start) + "  " + code.substring(end);
                  setCode(newCode);
                  setTimeout(() => { e.currentTarget.selectionStart = start + 2; e.currentTarget.selectionEnd = start + 2; }, 0);
                }
              }}
              placeholder="// Paste your code here..."
              rows={12}
              className={`w-full bg-bg-primary border rounded-lg px-3 py-2.5 text-sm text-text-primary font-mono placeholder:text-text-muted focus:outline-none transition-all resize-none ${errors.code ? "border-accent-red/50" : "border-border focus:border-accent-blue/60 focus:ring-1 focus:ring-accent-blue/30"}`}
              style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
            />
            {errors.code && <p className="text-xs text-accent-red">{errors.code}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border bg-bg-primary/40">
          <button onClick={onClose} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-bg-secondary border border-border rounded-lg transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent-blue hover:bg-accent-blue/80 text-bg-primary rounded-lg transition-all active:scale-95">
            <Save size={14} />
            {initialData ? "Save changes" : "Save snippet"}
          </button>
        </div>
      </div>
    </div>
  );
}