#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { loadAllProjects } from "../lib/projects";
import {
  getRepoMetadata,
  countGoodFirstIssues,
  hasFossradarTopic,
  hasVerifiedBadge,
  getContributors,
  detectInstallation,
  findDocumentation,
} from "../lib/github";

interface ProjectCache {
  slug: string;
  contributors: Array<{
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }>;
  installation?: {
    type: string;
    command: string;
  };
  documentation: {
    docs_url?: string;
    changelog_url?: string;
  };
  updated_at: string;
}

async function enrichProjects() {
  console.log("🔄 Enriching project data...\n");

  if (!process.env.GITHUB_TOKEN) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    process.exit(1);
  }

  try {
    const projects = loadAllProjects();
    console.log(`Loaded ${projects.length} projects\n`);

    // Ensure cache directory exists
    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    for (const project of projects) {
      console.log(`Enriching ${project.slug}...`);

      try {
        // Get repository metadata
        const metadata = await getRepoMetadata(project.repo);
        if (!metadata) {
          console.log(`  ⚠️  Could not fetch metadata`);
          continue;
        }

        // Count good first issues
        const goodFirstIssues = await countGoodFirstIssues(project.repo);

        // Check verification status
        const hasTopic = await hasFossradarTopic(project.repo);
        const hasBadge = await hasVerifiedBadge(project.repo);
        const verified = hasTopic && hasBadge;

        // Get contributors (filter out any with missing data)
        const contributorsRaw = await getContributors(project.repo, 10);
        const contributors = contributorsRaw.filter(
          (c) => c.avatar_url && c.html_url
        ) as Array<{
          login: string;
          avatar_url: string;
          html_url: string;
          contributions: number;
        }>;
        console.log(`  📊 Found ${contributors.length} contributors`);

        // Detect installation method
        const installation = await detectInstallation(project.repo);
        if (installation) {
          console.log(`  📦 Installation: ${installation.command}`);
        }

        // Find documentation
        const documentation = await findDocumentation(project.repo);
        if (documentation.docs_url || documentation.changelog_url) {
          console.log(`  📚 Found documentation links`);
        }

        // Update TOML file
        const filePath = path.join(process.cwd(), "data", "projects", `${project.slug}.toml`);
        let content = fs.readFileSync(filePath, "utf-8");

        // Update fields (simple regex replacement)
        content = content.replace(/^stars = \d+$/m, `stars = ${metadata.stars}`);
        content = content.replace(/^good_first_issues = \d+$/m, `good_first_issues = ${goodFirstIssues}`);
        content = content.replace(/^verified = (true|false)$/m, `verified = ${verified}`);

        // Update primary_lang if not set
        if (metadata.language && !content.includes("primary_lang")) {
          content = content.replace(/^added_at = /, `primary_lang = "${metadata.language}"\nadded_at = `);
        } else if (metadata.language) {
          content = content.replace(/^primary_lang = ".*"$/m, `primary_lang = "${metadata.language}"`);
        }

        fs.writeFileSync(filePath, content, "utf-8");

        // Create cache file with additional data
        const cache: ProjectCache = {
          slug: project.slug,
          contributors,
          installation: installation || undefined,
          documentation,
          updated_at: new Date().toISOString(),
        };

        const cachePath = path.join(cacheDir, `${project.slug}.json`);
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf-8");

        console.log(`  ✅ Updated: ${metadata.stars} stars, ${goodFirstIssues} good first issues, verified: ${verified}`);
      } catch (error) {
        console.log(`  ❌ Error: ${error}`);
      }

      // Rate limiting: wait a bit between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("\n✅ Enrichment complete!\n");
  } catch (error) {
    console.error("❌ Error enriching projects:", error);
    process.exit(1);
  }
}

enrichProjects();
