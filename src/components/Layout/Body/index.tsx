import styled from "styled-components"
import {HEADER_HEIGHT, FOOTER_HEIGHT} from "~/constants"
import React, {FC} from "react"
import {MAX_WIDTH_CONTENT} from "~/constants"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
`

const Content = styled.div`
  padding: 1rem;
  width: ${MAX_WIDTH_CONTENT}px;
  height: inherit;
  padding: 0 1rem;
`

interface Props {
  children: JSX.Element
}

export const Body: FC<JSX.Element> = ({children}: Props) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  )
}

Body.displayName = "Body"

export default Body
