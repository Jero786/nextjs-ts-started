import {ThemeProvider} from "styled-components"
import {render as renderLib, queries} from "@testing-library/react"

const customRender = (component, options) => {
  const ui = <ThemeProvider theme={{colors: {}}}>{component}</ThemeProvider>
  return renderLib(ui, {queries: {...queries}, ...options})
}

export * from "@testing-library/react"
export {customRender as render}
