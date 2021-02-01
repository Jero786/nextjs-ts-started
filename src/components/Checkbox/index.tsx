import React, {FC} from "react"

import styled from "styled-components"
import {space, layout} from "styled-system"
import {Box} from "~/components/Box"

export interface Props {
  readonly defaultChecked?: boolean;
  readonly onClick?: () => void;
  readonly id: string | number;
  readonly name: string;
}

const Input = styled.input.attrs<any>({type: "checkbox"})`
  ${space};
  ${layout};
  padding: 1rem;
  
  &:hover {
    cursor: pointer;
  }
`
export const Checkbox: FC<Props> = (props: any) => {
  return (
    <Box px=".5rem">
      <Input {...props}/>
    </Box>
  )
}
