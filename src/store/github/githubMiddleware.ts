import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchRepositories } from "./fetch/fetchRepositories"
import { fetchGithubUsers } from "./fetch/fetchUsers"
import { orderByStarsChanged, queryChanged } from "./githubSlice"

const actionsType = [queryChanged.type, orderByStarsChanged.type]

export const githubMiddleware: Middleware<{}, RootState> = store => next => action => {
  const { type, payload } = action

  if (actionsType.includes(type)) {
    store.dispatch<any>(fetchGithubUsers(payload))
    store.dispatch<any>(fetchRepositories(payload))
  }

  next(action)
}