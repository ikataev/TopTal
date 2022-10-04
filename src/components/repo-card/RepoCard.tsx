import * as React from "react"
import { FunctionComponent, memo } from "react"
import { RepositoriesResponse } from "../../utils/GitHubAPI"
import * as Style from "./RepoCard.less"

type IProps = {
  repo: RepositoriesResponse
}

const RepoCardComponent: FunctionComponent<IProps> = ({ repo }) => {
  return (
    <div className={Style.repoCard}>
      <div className={Style.repoCardContent}>
        <div className={Style.repoCardName}>{repo.name}</div>

        {repo.description && (
          <div>{repo.description}</div>
        )}

        <div className={Style.repoCardFooter}>
          <div>Stars: <b>{repo.stars}</b></div>
          <div>Issues: <b>{repo.issues}</b></div>
        </div>
      </div>
    </div>
  )
}

export const RepoCard = memo(RepoCardComponent)