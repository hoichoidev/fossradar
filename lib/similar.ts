import { Project } from "./schema";

/**
 * Calculate similarity score between two projects
 */
function calculateSimilarity(projectA: Project, projectB: Project): number {
  let score = 0;

  // Shared tags (high weight)
  const sharedTags = projectA.tags.filter((tag) => projectB.tags.includes(tag));
  score += sharedTags.length * 3;

  // Same primary language
  if (projectA.primary_lang === projectB.primary_lang) {
    score += 2;
  }

  // Same state (location proximity)
  if (projectA.location_indian_state === projectB.location_indian_state) {
    score += 1;
  }

  // Same city (even closer)
  if (projectA.location_city === projectB.location_city) {
    score += 1;
  }

  return score;
}

/**
 * Find similar projects based on tags, tech stack, and location
 */
export function findSimilarProjects(
  currentProject: Project,
  allProjects: Project[],
  limit: number = 4
): Project[] {
  const scored = allProjects
    .filter((p) => p.slug !== currentProject.slug) // Exclude current project
    .map((project) => ({
      project,
      score: calculateSimilarity(currentProject, project),
    }))
    .filter((item) => item.score > 0) // Only include projects with some similarity
    .sort((a, b) => {
      // Sort by score (descending), then by stars (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (b.project.stars || 0) - (a.project.stars || 0);
    })
    .slice(0, limit);

  return scored.map((item) => item.project);
}
