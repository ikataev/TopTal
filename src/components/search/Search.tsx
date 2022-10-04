import * as React from "react"
import { ChangeEvent, memo, useState } from "react"
import * as Style from "./Search.less"

type IProps = {
  value: string
  onSearchChanged: (input: string) => void
}

const SearchComponent: React.FunctionComponent<IProps> = ({ value, onSearchChanged }) => {
  const [timeoutId, setTimeoutId] = useState(0)

  const onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // clearTimeout(timeoutId)
    //
    // setTimeoutId(setTimeout(() => {
    //   onSearchChanged(e.target.value)
    // }, 300) as unknown as number)

    onSearchChanged(e.target.value)
  }, [])

  return (
    <div>
      <input type="search" placeholder="Search for a GitHub username" value={value} className={Style.search}
             onChange={onChangeHandler} />
    </div>
  )
}

export const Search = memo(SearchComponent)