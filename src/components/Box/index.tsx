import styled from "styled-components"
import {
  space,
  layout,
  flexbox,
  typography,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  TypographyProps
} from "styled-system"

export const Box = styled.div<SpaceProps & FlexboxProps & LayoutProps & TypographyProps>`
  ${space};
  ${layout};
  ${flexbox};
  ${typography};
display: flex;
`
