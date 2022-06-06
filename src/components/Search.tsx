import * as React from "react";
import { ChangeEvent, memo } from "react";

type IProps = {
  onSearchChanged: (input: string) => void
}

const SearchComponent: React.FunctionComponent<IProps> = ({onSearchChanged}) => {
  const onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onSearchChanged(e.target.value)
  }, [])

  return (
    <input type="search" onChange={onChangeHandler}/>
  )
}

export const Search = memo(SearchComponent)