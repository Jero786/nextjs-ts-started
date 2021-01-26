import React, {ReactNode} from "react"
import {Description, Terms, Label} from "./styled"

export interface Props {
  readonly size?: "description" | "terms" | "label"
  readonly children: ReactNode
}

export const Text = (props: Props) => {
  let HeadingComponent

  switch (props.size) {
    case "description":
      HeadingComponent = Description
      break
    case "terms":
      HeadingComponent = Terms
      break
    case "label":
      HeadingComponent = Label
      break
    default:
      HeadingComponent = Label
  }

  return <HeadingComponent {...props} />
}
