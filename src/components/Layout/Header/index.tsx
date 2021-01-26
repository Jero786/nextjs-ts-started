import React from "react"
import Link from "next/link"
import styled from "styled-components"
import {MAX_WIDTH_CONTENT, HEADER_HEIGHT} from "~/constants"

const Container = styled.div`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  background-color: gray;
`

const Content = styled.div`
  padding: 1rem;
  width: ${MAX_WIDTH_CONTENT}px;
  background: yellow;
`

export const Header = () => {
  return (
    <Container>
      <Content>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/quiz">
          <a>Quiz</a>
        </Link>
      </Content>
    </Container>
  )
}

export default Header
