import styled from "styled-components"
import {layout, space} from "styled-system"
import React, {ReactNode} from "react"
import {Heading1, Heading2, Heading3, Heading4, Heading5} from "./styled"

export const Title = styled.h1`
  ${space}
  ${layout}
color: red;
`

export interface Props {
  readonly size?: "h1" | "h2" | "h3" | "h4" | "h5"
  readonly children: ReactNode
}

export const Heading = (props: Props) => {
  let HeadingComponent

  switch (props.size) {
    case "h1":
      HeadingComponent = Heading1
      break
    case "h2":
      HeadingComponent = Heading2
      break
    case "h3":
      HeadingComponent = Heading3
      break
    case "h4":
      HeadingComponent = Heading4
      break
    case "h5":
      HeadingComponent = Heading5
      break
    default:
      HeadingComponent = Heading1
  }
  return <HeadingComponent {...props} />
}

export default Heading
