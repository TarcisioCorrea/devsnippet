import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSnippet — Your Code Library",
  description: "Save, organize and copy your code snippets instantly. No account needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}