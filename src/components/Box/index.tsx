import styled from "styled-components"
import {color} from "styled-system"

const Box = styled.div`
  ${color}
  font-size: 50px;
  background-color: ${({theme}) => theme.colors.blue};
`
export default Box
