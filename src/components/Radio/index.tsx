import styled from "styled-components"
import {space, layout, SpaceProps, LayoutProps} from "styled-system"

export const Radio = styled.input.attrs<SpaceProps & LayoutProps>({type: "radio"})`
  ${space};
  ${layout};
  padding-left: 1rem;
  &:hover {
    cursor: pointer;
  }
`
