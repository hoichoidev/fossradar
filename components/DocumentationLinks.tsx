"use client";

import { Book, FileText, ExternalLink } from "lucide-react";

interface DocumentationLinksProps {
  repoUrl: string;
  documentation?: {
    docs_url?: string;
    changelog_url?: string;
  };
}

export function DocumentationLinks({ repoUrl, documentation }: DocumentationLinksProps) {
  const links = [
    {
      label: "Repository",
      url: repoUrl,
      icon: Book,
      alwaysShow: true,
    },
    {
      label: "Documentation",
      url: documentation?.docs_url,
      icon: Book,
      alwaysShow: false,
    },
    {
      label: "Changelog",
      url: documentation?.changelog_url,
      icon: FileText,
      alwaysShow: false,
    },
    {
      label: "Issues",
      url: `${repoUrl}/issues`,
      icon: ExternalLink,
      alwaysShow: true,
    },
  ];

  const visibleLinks = links.filter((link) => link.alwaysShow || link.url);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
        Resources
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
            >
              <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
