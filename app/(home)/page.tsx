import Link from "next/link";
import fs from "fs";
import path from "path";
import { MarkdownContent } from "./components/markdown-content";

export default function Home() {
  // Read the README.md file content
  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, "utf8");

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8 flex flex-col items-center justify-between border-b py-4 md:flex-row">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">
          Habyt Frontend Take-Home Assignment
        </h1>
        <Link
          href="/listings"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Go to Listings Page
        </Link>
      </header>

      <main>
        <MarkdownContent markdown={readmeContent} />
      </main>

      <footer className="mt-16 border-t pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Habyt. All rights reserved.</p>
      </footer>
    </div>
  );
}
