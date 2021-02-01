import styled from "styled-components"
import {space, layout} from "styled-system"

export const Wrapper = styled.div`
  ${space}
  ${layout}
background-color: #fff;
  padding: 1rem;
  margin-top: 1rem;
`

export const Container = styled.div`
  ${space}
  ${layout}
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
