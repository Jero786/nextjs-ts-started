import React from "react"
import Link from "next/link"
import styled from "styled-components"
import {MAX_WIDTH_CONTENT, FOOTER_HEIGHT} from "~/constants"

const Container = styled.div`
  height: ${FOOTER_HEIGHT}px;
  background-color: gray;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  background-color: yellow;
  padding: 1rem;
  width: ${MAX_WIDTH_CONTENT}px;
`

export const Footer = () => {
  return (
    <Container>
      <Content>
        <Link href="/">
          <a>Footer</a>
        </Link>
      </Content>
    </Container>
  )
}

export default Footer
