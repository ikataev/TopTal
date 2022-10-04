import * as React from "react"
import { FunctionComponent, memo, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { orderByStarsChanged, queryChanged } from "../store/github/githubSlice"
import { RootState } from "../store/store"
import * as Style from "./App.less"
import { Checkbox } from "./checkbox/Checkbox"
import { RepoCard } from "./repo-card/RepoCard"
import { Search } from "./search/Search"
import { UserCard } from "./user-card/UserCard"

const AppComponent: FunctionComponent = () => {
  const dispatch = useDispatch()
  const query = useSelector((state: RootState) => state.github.query)
  const orderByStars = useSelector((state: RootState) => state.github.orderByStars)

  const user = useSelector((state: RootState) => state.github.user)
  const repositories = useSelector((state: RootState) => state.github.repositories)

  const onCheckboxChangedHandler = useCallback((checked: boolean) => {
    dispatch(orderByStarsChanged(checked))
  }, [])

  const onSearchChangedHandler = useCallback((input: string) => {
    dispatch(queryChanged(input))
  }, [])

  return (
    <div className={Style.layout}>
      <div className={Style.header}>
        <Checkbox checked={orderByStars} label="List most starred repos only" onChanged={onCheckboxChangedHandler} />
        <Search value={query} onSearchChanged={onSearchChangedHandler} />

        {user ? (
          <UserCard user={user} />
        ) : (
          <div>User idle...</div>
        )}
      </div>

      {repositories && repositories.length ? (
        <div className={Style.content}>
          <div className={Style.contentHeader}>Listing {repositories.length} repositories from {user.name}</div>

          <div className={Style.reposContainer}>
            {repositories.map(repo => <RepoCard repo={repo} key={repo.id} />)}
          </div>
        </div>
      ) : (
        <div>Repositories idle...</div>
      )}
    </div>
  )
}

export const App = memo(AppComponent)