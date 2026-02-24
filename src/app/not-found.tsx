import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl md:text-8xl font-display font-bold bg-gradient-to-r from-sat-primary to-sat-crimson dark:from-sky-400 dark:to-sky-600 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <p className="text-sat-gray-600 dark:text-sky-200 text-lg mb-8 text-center max-w-md">
        This page doesn&apos;t exist. Head back to the dashboard or home to continue your SAT prep.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold bg-sat-primary text-white hover:bg-sat-primary-dark dark:bg-sky-500 dark:hover:bg-sky-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold border-2 border-sat-primary text-sat-primary hover:bg-sat-primary hover:text-white dark:border-sky-500 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      </div>
    </div>
  );
}
