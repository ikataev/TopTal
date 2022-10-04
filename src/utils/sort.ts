import { RepositoriesResponse } from "./GitHubAPI"

export const sortRepositories = (repositories: RepositoriesResponse[], stars: boolean) => {
  if (!stars) {
    return repositories
  }

  return repositories.sort((repo1, repo2) => repo2.stars - repo1.stars)
}