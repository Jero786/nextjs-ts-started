import styled from "styled-components"
import {color} from "styled-system"

const Box = styled.div`
  ${color}
  font-size: 50px;
  color: ${({theme}) => theme.colors.black};
`
export default Box
