import { createAsyncThunk } from "@reduxjs/toolkit"

type UsersAPIResponse = {
  total_count: number
  items: Array<{
    login: string
    id: number
    avatar_url: string
    [x: string]: unknown
  }>
}

export type UsersResponse = {
  name?: string
  avatar?: string
  email?: string
}

const SEARCH_API = "https://api.github.com/search/users?q=[username]"

//For this demo App we'll return no more, than one result
export const fetchGithubUsers = createAsyncThunk(
  "github/fetchUsers",
  (userName: string, thunkAPI) => {
    return fetch(SEARCH_API.replace("[username]", userName))
      .then(response => response.json())
      .then((data: UsersAPIResponse) => {
        let name, avatar

        if (data && data.total_count > 0) {
          name = data.items[0].login
          avatar = data.items[0].avatar_url
        }

        return { name, avatar, email: "" }
      })
  }
)