import styled from "styled-components"
import {variant} from "styled-system"

export const Button = styled("button")(
  {
    appearance: "none",
    fontFamily: "inherit"
  },
  variant({
    variants: {
      primary: {
        color: "white",
        bg: "primary"
      },
      secondary: {
        color: "white",
        bg: "secondary"
      }
    }
  })
)
