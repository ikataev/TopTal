import * as React from "react";
import { FunctionComponent, memo, useCallback, useEffect, useState } from "react";
import { RepositoriesResponse, requestRepositories, requestUsers, UsersResponse } from "../utils/GitHubAPI";
import { sortRepositories } from "../utils/sort";
import * as Style from "./App.less";
import { Checkbox } from "./checkbox/Checkbox";
import { RepoCard } from "./repo-card/RepoCard";
import { Search } from "./search/Search";
import { UserCard } from "./user-card/UserCard";

const AppComponent: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('i')
  const [listMostStarred, setListMostStarred] = useState(false)
  const [user, setUser] = useState<UsersResponse>({})
  const [repositories, setRepositories] = useState<RepositoriesResponse[]>([])

  const onCheckboxChangedHandler = useCallback((checked: boolean) => {
    setListMostStarred(checked)
  }, [setListMostStarred])

  const onSearchChangedHandler = useCallback((input: string) => {
    setSearchValue(input)
  }, [setSearchValue])

  useEffect(() => {
    Promise.all([
      requestUsers(searchValue),
      requestRepositories(searchValue)
    ]).then(([user, repositories]) => {
      setUser(user)
      setRepositories(sortRepositories(repositories, listMostStarred))
    })
  }, [listMostStarred, searchValue])

  return (
    <div className={Style.layout}>
      <div className={Style.header}>
        <Checkbox checked={listMostStarred} label="List most starred repos only" onChanged={onCheckboxChangedHandler}/>
        <Search value={searchValue} onSearchChanged={onSearchChangedHandler}/>
        <UserCard user={user}/>
      </div>

      {repositories.length && (
        <div className={Style.content}>
          <div className={Style.contentHeader}>Listing {repositories.length} repositories from {user.name}</div>

          <div className={Style.reposContainer}>
            {repositories.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
          </div>
        </div>
      )}
    </div>
  );
};

export const App = memo(AppComponent)