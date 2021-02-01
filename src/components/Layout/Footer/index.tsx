import React from "react"
import styled from "styled-components"
import {MAX_WIDTH_CONTENT, FOOTER_HEIGHT} from "../../../constants"

const Container = styled.div`
  height: ${FOOTER_HEIGHT}px;
  background-color: ${({theme}) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  padding: 1rem;
  width: ${MAX_WIDTH_CONTENT}px;
`

export const Footer = () => {
  return (
    <Container>
      <Content>
        Beauty Bag
      </Content>
    </Container>
  )
}

export default Footer
