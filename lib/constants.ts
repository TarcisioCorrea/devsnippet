import { Language } from "./types";

export const LANGUAGES: Language[] = [
  { id: "typescript", label: "TypeScript", color: "#3178c6" },
  { id: "javascript", label: "JavaScript", color: "#f7df1e" },
  { id: "python", label: "Python", color: "#3572A5" },
  { id: "rust", label: "Rust", color: "#dea584" },
  { id: "go", label: "Go", color: "#00ADD8" },
  { id: "java", label: "Java", color: "#b07219" },
  { id: "cpp", label: "C++", color: "#f34b7d" },
  { id: "css", label: "CSS", color: "#563d7c" },
  { id: "html", label: "HTML", color: "#e34c26" },
  { id: "bash", label: "Bash", color: "#89e051" },
  { id: "sql", label: "SQL", color: "#e38c00" },
  { id: "json", label: "JSON", color: "#7d8590" },
  { id: "markdown", label: "Markdown", color: "#083fa1" },
  { id: "yaml", label: "YAML", color: "#cb171e" },
  { id: "docker", label: "Dockerfile", color: "#384d54" },
];

export const LANGUAGE_MAP: Record<string, string> = {
  typescript: "typescript",
  javascript: "javascript",
  python: "python",
  rust: "rust",
  go: "go",
  java: "java",
  cpp: "cpp",
  css: "css",
  html: "xml",
  bash: "bash",
  sql: "sql",
  json: "json",
  markdown: "markdown",
  yaml: "yaml",
  docker: "dockerfile",
};

export const STORAGE_KEY = "devsnippet_snippets";

export const SAMPLE_SNIPPETS = [
  {
    id: "sample-1",
    title: "useLocalStorage Hook",
    description: "Generic hook to persist state in localStorage",
    language: "typescript",
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;`,
    tags: ["react", "hooks", "storage"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    title: "Fetch with Retry",
    description: "Fetch wrapper with automatic retry logic",
    language: "typescript",
    code: `async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok && attempt < retries - 1) {
        await new Promise(r => setTimeout(r, delay * (attempt + 1)));
        continue;
      }
      return response;
    } catch (error) {
      if (attempt === retries - 1) throw error;
      await new Promise(r => setTimeout(r, delay * (attempt + 1)));
    }
  }
  throw new Error('Max retries reached');
}`,
    tags: ["fetch", "async", "utils"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-3",
    title: "Docker Compose — Node + Postgres",
    description: "Basic docker-compose for Node.js app with PostgreSQL",
    language: "yaml",
    code: `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:`,
    tags: ["docker", "postgres", "devops"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];