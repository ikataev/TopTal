import * as React from "react"
import { ChangeEvent, FunctionComponent, memo, useCallback } from "react"
import * as Style from "./Checkbox.less"

type IProps = {
  label: string
  checked: boolean
  onChanged: (checked: boolean) => void
}

const CheckboxComponent: FunctionComponent<IProps> = ({ checked, label, onChanged }) => {
  const rnd = Date.now().toString()

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.checked, e.target.value)
    onChanged(e.target.checked)
  }, [onChanged])

  // console.log('CheckboxComponent', checked, label)

  return (
    <div className={Style.checkbox}>
      <input type="checkbox" id={rnd} checked={checked} onChange={onChangeHandler} />
      <label htmlFor={rnd}>{label}</label>
    </div>
  )
}

export const Checkbox = memo(CheckboxComponent)