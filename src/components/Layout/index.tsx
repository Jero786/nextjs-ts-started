import React, {FC} from "react"

import Body from "~/components/Layout/Body"
import Header from "~/components/Layout/Header"
import Footer from "~/components/Layout/Footer"

interface Props {
  children: JSX.Element
}

export const Layout: FC<Props> = ({children}: Props) => {
  return (
    <>
      <Header/>
      <Body>{children}</Body>
      <Footer/>
    </>
  )
}

Layout.displayName = "Layout Page"

export default Layout
