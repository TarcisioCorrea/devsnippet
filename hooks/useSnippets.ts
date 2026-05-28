"use client";

import { useMemo, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Snippet, SnippetFormData } from "../lib/types";
import { STORAGE_KEY, SAMPLE_SNIPPETS } from "../lib/constants";
import useLocalStorage from "./useLocalStorage";

export function useSnippets() {
  const [snippets, setSnippets] = useLocalStorage<Snippet[]>(
    STORAGE_KEY,
    SAMPLE_SNIPPETS
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("all");

  const [selectedSnippet, setSelectedSnippet] =
    useState<Snippet | null>(null);

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesSearch =
        searchQuery === "" ||
        snippet.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesLanguage =
        selectedLanguage === "all" ||
        snippet.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [snippets, searchQuery, selectedLanguage]);

  const addSnippet = useCallback(
    (data: SnippetFormData) => {
      const newSnippet: Snippet = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setSnippets((prev) => [newSnippet, ...prev]);
      setSelectedSnippet(newSnippet);
    },
    [setSnippets]
  );

  const updateSnippet = useCallback(
    (id: string, data: SnippetFormData) => {
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : s
        )
      );
    },
    [setSnippets]
  );

  const deleteSnippet = useCallback(
    (id: string) => {
      setSnippets((prev) =>
        prev.filter((s) => s.id !== id)
      );

      setSelectedSnippet((prev) =>
        prev?.id === id ? null : prev
      );
    },
    [setSnippets]
  );

  const availableLanguages = useMemo(() => {
    return Array.from(
      new Set(snippets.map((s) => s.language))
    );
  }, [snippets]);

  return {
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
  };
}