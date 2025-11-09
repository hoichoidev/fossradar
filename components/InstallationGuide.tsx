"use client";

import { Terminal } from "lucide-react";
import { InlineCopy } from "./InlineCopy";

interface InstallationGuideProps {
  installation?: {
    type: string;
    command: string;
  };
  repoUrl: string;
}

export function InstallationGuide({ installation, repoUrl }: InstallationGuideProps) {
  // Fallback to git clone if no installation detected
  const installCommand = installation?.command || `git clone ${repoUrl}`;
  const installType = installation?.type || "git";

  const typeLabels: Record<string, string> = {
    npm: "npm",
    pip: "pip",
    cargo: "Cargo",
    go: "Go",
    git: "Git",
  };

  return (
    <div className="mb-8">
      <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3 flex items-center gap-2">
        <Terminal className="h-4 w-4" />
        Quick Start
      </h2>
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {typeLabels[installType] || "Installation"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
            {installCommand}
          </code>
          <InlineCopy text={installCommand} label="Copy" />
        </div>
      </div>
    </div>
  );
}
