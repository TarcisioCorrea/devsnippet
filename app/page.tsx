"use client";

import { useState } from "react";

import Header from "../components/Header";
import SnippetList from "../components/SnippetList";
import SnippetViewer from "../components/SnippetViewer";
import SnippetForm from "../components/SnippetForm";

import { useSnippets } from "../hooks/useSnippets";

import type { Snippet, SnippetFormData } from "../lib/types";

export default function Home() {
  const {
    snippets,
    filteredSnippets,
    selectedSnippet,
    setSelectedSnippet,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    availableLanguages,
    addSnippet,
    updateSnippet,
    deleteSnippet,
  } = useSnippets();

  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] =
    useState<Snippet | null>(null);

  const [mobileView, setMobileView] =
    useState<"list" | "viewer">("list");

  const handleNewSnippet = () => {
    setEditingSnippet(null);
    setShowForm(true);
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  const handleSaveSnippet = (
    data: SnippetFormData
  ) => {
    if (editingSnippet) {
      updateSnippet(editingSnippet.id, data);
    } else {
      addSnippet(data);
    }

    setShowForm(false);
    setEditingSnippet(null);
  };

  const handleSelectSnippet = (
    snippet: Snippet
  ) => {
    setSelectedSnippet(snippet);
    setMobileView("viewer");
  };

  const handleDeleteSnippet = (id: string) => {
    deleteSnippet(id);
    setMobileView("list");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        onNewSnippet={handleNewSnippet}
        snippetCount={snippets.length}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`w-full md:w-80 lg:w-96 border-r border-border overflow-hidden ${
            mobileView === "viewer"
              ? "hidden md:flex"
              : "flex"
          }`}
        >
          <SnippetList
            snippets={filteredSnippets}
            selectedSnippet={selectedSnippet}
            onSelect={handleSelectSnippet}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            availableLanguages={availableLanguages}
            onNewSnippet={handleNewSnippet}
          />
        </aside>

        <main
          className={`flex-1 overflow-hidden ${
            mobileView === "list"
              ? "hidden md:flex"
              : "flex"
          }`}
        >
          {selectedSnippet ? (
            <SnippetViewer
              snippet={selectedSnippet}
              onEdit={() =>
                handleEditSnippet(selectedSnippet)
              }
              onDelete={() =>
                handleDeleteSnippet(selectedSnippet.id)
              }
              onBack={() =>
                setMobileView("list")
              }
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-text-secondary">
              Select a snippet
            </div>
          )}
        </main>
      </div>

      {showForm && (
        <SnippetForm
          initialData={editingSnippet}
          onSave={handleSaveSnippet}
          onClose={() => {
            setShowForm(false);
            setEditingSnippet(null);
          }}
        />
      )}
    </div>
  );
}