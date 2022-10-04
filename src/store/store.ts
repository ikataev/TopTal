import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { githubMiddleware } from "./github/githubMiddleware"
import { githubReducer } from "./github/githubSlice"

const rootReducer = combineReducers({ github: githubReducer })

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch