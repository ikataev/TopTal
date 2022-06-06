import * as React from "react";
import { FunctionComponent, memo, useCallback, useEffect, useState } from "react";
import { RepositoriesResponse, requestRepositories, requestUsers, UsersResponse } from "../utils/GitHubAPI";
import * as Style from "./App.less";
import { RepoCard } from "./RepoCard/RepoCard";
import { Search } from "./Search";
import { UserCard } from "./UserCard/UserCard";

const AppComponent: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('i')
  const [user, setUser] = useState<UsersResponse>({})
  const [repositories, setRepositories] = useState<RepositoriesResponse[]>([])

  useEffect(() => {
    Promise.all([
      requestUsers(searchValue),
      requestRepositories(searchValue)
    ]).then(([user, repositories]) => {
      console.log(user, repositories)

      setUser(user)
      setRepositories(repositories)
    })
  }, [searchValue])

  const onSearchChangedHandler = useCallback((input: string) => {
    setSearchValue(input)
  }, [])

  return (
    <div className={Style.layout}>
      <div className={Style.header}>
        <Search onSearchChanged={onSearchChangedHandler}/>

        <UserCard user={user}/>
      </div>

      {repositories.length && (
        <div className={Style.content}>
          <div>Listing {repositories.length} repositories from {user.name}</div>

          <div className={Style.reposContainer}>
            {repositories.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
          </div>
        </div>
      )}
    </div>
  );
};

export const App = memo(AppComponent)