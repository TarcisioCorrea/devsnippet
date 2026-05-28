export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type SnippetFormData = Omit<Snippet, "id" | "createdAt" | "updatedAt">;

export type Language = {
  id: string;
  label: string;
  color: string;
};