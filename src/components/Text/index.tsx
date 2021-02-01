import React, {ReactNode} from "react"
import {Description, Terms, Label} from "./styled"

export interface Props {
  readonly size?: "description" | "terms" | "label"
  readonly children: ReactNode
  readonly htmlFor: string;
}

export const Text = (props: Props) => {
  switch (props.size) {
    case "description":
      return <Description {...props}/>
    case "terms":
      return <Terms {...props}/>
    case "label":
      return <Label {...props}/>
    default:
      return <Label {...props}/>
  }
}
