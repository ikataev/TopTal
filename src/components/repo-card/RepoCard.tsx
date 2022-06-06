import * as React from "react";
import { FunctionComponent, memo } from "react";
import { RepositoriesResponse } from "../../utils/GitHubAPI";
import * as Style from "./RepoCard.less";

type IProps = {
  repo: RepositoriesResponse
}

const RepoCardComponent: FunctionComponent<IProps> = ({repo}) => {
  return (
    <div className={Style.repoCard}>
      <div>{repo.avatar}</div>

      <div className={Style.repoCardContent}>
        <div>{repo.name}</div>
        <div>{repo.description}</div>
        <div>{repo.stars}</div>
        <div>{repo.issues}</div>
      </div>
    </div>
  )
}

export const RepoCard = memo(RepoCardComponent)