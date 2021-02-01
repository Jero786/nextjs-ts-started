import React, {FC} from "react"
import Link from "next/link"

import Layout from "~/components/Layout"
import {Box} from "~/components/Box"
import {Button} from "~/components/Button"

export const Home: FC = () => {
  return (
    <Layout>
      <Box mt="2rem" justifyContent="center">
        <Link href="/quiz">
          <a><Button data-testid="cta-start" variant="primary">Comenzar</Button></a>
        </Link>
      </Box>
    </Layout>
  )
}

Home.displayName = "HomePage"

export default Home
