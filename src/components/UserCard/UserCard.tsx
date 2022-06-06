import * as React from "react";
import { FunctionComponent } from "react";
import { UsersResponse } from "../../utils/GitHubAPI";
import * as Style from "./UserCard.less";

type IProps = {
  user: UsersResponse
}

export const UserCard: FunctionComponent<IProps> = ({user}) => {
  return (
    <div className={Style.userCard}>
      <div className={Style.userCardPicture}>
        <img src={user.avatar} alt="User's avatar"/>
      </div>

      <div className={Style.nameAndEmailContainer}>
        <div className={Style.userCardName}>{user.name}</div>
        <div className={Style.userCardEmail}>{user.email || `GitHub doesn't provide email`}</div>
      </div>
    </div>
  )
}