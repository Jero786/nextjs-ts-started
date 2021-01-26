import React, {FC} from "react"
import Link from "next/link"

import Layout from "~/components/Layout"

export const Home: FC<JSX.Element> = () => {
  return (
    <Layout>
      <Link href="/quiz">
        <a>Go to Quiz</a>
      </Link>
    </Layout>
  )
}

Home.displayName = "HomePage"

export default Home
