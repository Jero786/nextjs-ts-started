import styled from "styled-components"
import {variant} from "styled-system"

export const Input = styled("button")(
  {
    appearance: "none",
    border: "none",
    padding: "1rem 3rem",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: '1rem'
  },
  variant({
    variants: {
      primary: {
        color: "black",
        bg: "primary",
        "&:hover": {
          bg: "primaryDark"
        }
      },
      secondary: {
        color: "black",
        bg: "secondary",
        "&:hover": {
          bg: "secondaryDark"
        }
      }
    }
  })
)

export const Button = (props: any) => {
  return (
    <Input {...props}/>
  )
}
