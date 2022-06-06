const SEARCH_API = 'https://api.github.com/search/users?q=[username]'
const REPOSITORIES_API = 'https://api.github.com/users/[username]/repos'

const request = async (url: string) => {
  return fetch(url).then(response => response.json())
}

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

//For this demo App we'll return no more, than one result
export const requestUsers = async (userName: string): Promise<UsersResponse> => {
  return request(SEARCH_API.replace('[username]', userName))
    .then((data: UsersAPIResponse) => {
      let name, avatar

      if (data && data.total_count > 0) {
        name = data.items[0].login
        avatar = data.items[0].avatar_url
      }

      return {name, avatar, email: ''}
    })
}

type RepositoriesAPIResponse = Array<{
  id: number
  name: string
  description: string | null
  stargazers_count: number
  open_issues_count: null
  avatar_url: string
  [x: string]: unknown
}>

export type RepositoriesResponse = {
  id: number
  name: string
  description: string
  stars: number
  issues: number
  avatar: string
}

export const requestRepositories = async (userName: string): Promise<RepositoriesResponse[]> => {
  return request(REPOSITORIES_API.replace('[username]', userName))
    .then((data: RepositoriesAPIResponse) => {
      let repositories: RepositoriesResponse[] = []

      if (data && data.length) {
        repositories = data.map<RepositoriesResponse>((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          stars: item.stargazers_count,
          issues: item.open_issues_count,
          avatar: item.avatar_url
        }))
      }

      return repositories
    })
}