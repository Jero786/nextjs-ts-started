import React from "react"
import {ThemeProvider} from "styled-components"
import PropTypes from "prop-types"

import theme from "~/styles/theme"
import GlobalStyle from "~/styles/global"

interface Props {
  Component: any;
  pageProps: any;
}
const App = ({Component, pageProps}: Props): JSX.Element => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

App.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.any
}

export default App
