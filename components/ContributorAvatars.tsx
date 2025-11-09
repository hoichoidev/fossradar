"use client";

import { Users } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface ContributorAvatarsProps {
  contributors: Contributor[];
  totalContributors?: number;
}

export function ContributorAvatars({ contributors, totalContributors }: ContributorAvatarsProps) {
  if (contributors.length === 0) {
    return null;
  }

  const displayedCount = contributors.length;
  const remainingCount = totalContributors && totalContributors > displayedCount
    ? totalContributors - displayedCount
    : 0;

  return (
    <div className="mb-8">
      <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3 flex items-center gap-2">
        <Users className="h-4 w-4" />
        Contributors
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {contributors.map((contributor) => (
            <a
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              title={`${contributor.login} (${contributor.contributions} contributions)`}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 hover:scale-110 transition-transform hover:z-10"
              />
            </a>
          ))}
        </div>
        {remainingCount > 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
}
