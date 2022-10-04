import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchRepositories, RepositoriesResponse } from "./fetch/fetchRepositories"
import { fetchGithubUsers, UsersResponse } from "./fetch/fetchUsers"

export interface GitHubState {
  query: string
  orderByStars: boolean

  repositories: any[]
  repositoriesState: "idle" | "pending" | "fulfilled"

  user?: {
    email: string
    name: string
    avatar: string
  }
}

const initialState: GitHubState = {
  query: "",
  orderByStars: false,
  repositories: [],
  repositoriesState: "idle"
}

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    queryChanged: (state, action: PayloadAction<string>) => {
      state.query = action.payload

      if (!action.payload) {
        state.repositoriesState = "idle"
      }
    },

    orderByStarsChanged: (state, action: PayloadAction<boolean>) => {
      state.orderByStars = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGithubUsers.pending, (state, action) => {
      console.info("fetchGithubUsers.pending")
    })

    builder.addCase(fetchGithubUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
      console.info("fetchGithubUsers.fulfilled")
      const { name, email, avatar } = action.payload
      state.user = { name, email, avatar }
    })

    builder.addCase(fetchRepositories.pending, (state, action) => {
      state.repositoriesState = "pending"
    })

    builder.addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<RepositoriesResponse[]>) => {
      state.repositories = action.payload
      state.repositoriesState = "fulfilled"
    })
  }
})

export const { queryChanged, orderByStarsChanged } = githubSlice.actions
export const githubReducer = githubSlice.reducer