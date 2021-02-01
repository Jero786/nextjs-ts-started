import React from "react"
import Link from "next/link"
import styled from "styled-components"
import {MAX_WIDTH_CONTENT, HEADER_HEIGHT} from "../../../constants"
import {Box} from "~/components/Box"

const Container = styled.div`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  padding: 1rem;
  width: ${MAX_WIDTH_CONTENT}px;
`

export const Header = () => {
  return (
    <Container>
      <Content>
        <Box>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Box>
      </Content>
    </Container>
  )
}

export default Header
