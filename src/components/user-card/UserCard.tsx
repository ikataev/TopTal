import * as React from "react";
import { FunctionComponent, memo } from "react";
import { UsersResponse } from "../../utils/GitHubAPI";
import * as Style from "./UserCard.less";

type IProps = {
  user: UsersResponse
}

const UserCardComponent: FunctionComponent<IProps> = ({user}) => {
  return (
    <div className={Style.userCard}>
      <div className={Style.userCardPicture}>
        <img src={user.avatar} alt="User's avatar"/>
      </div>

      <div className={Style.nameAndEmailContainer}>
        <div className={Style.userCardName}>{user.name}</div>
        <div>{user.email || `GitHub doesn't provide email`}</div>
      </div>
    </div>
  )
}

export const UserCard = memo(UserCardComponent)