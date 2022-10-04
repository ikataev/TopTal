import { createAsyncThunk } from "@reduxjs/toolkit"

const REPOSITORIES_API = "https://api.github.com/users/[username]/repos"

type RepositoriesAPIResponse = Array<{
  id: number
  name: string
  description: string | null
  stargazers_count: number
  open_issues_count: null
  avatar_url: string
  [x: string]: unknown
}>

export type RepositoriesResponse = {
  id: number
  name: string
  description: string
  stars: number
  issues: number
  avatar: string
}

export const fetchRepositories = createAsyncThunk(
  "github/fetchRepositories",
  (userName: string, thunkAPI) => {
    return fetch(REPOSITORIES_API.replace("[username]", userName))
      .then(response => response.json())
      .then((data: RepositoriesAPIResponse) => {
        let repositories: RepositoriesResponse[] = []

        if (data && data.length) {
          repositories = data.map<RepositoriesResponse>((item) => ({
            id: item.id,
            name: item.name,
            description: item.description || "",
            stars: item.stargazers_count,
            issues: item.open_issues_count,
            avatar: item.avatar_url
          }))
        }

        return repositories
      })
  }
)