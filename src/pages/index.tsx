import React, {FC} from "react"
import Link from "next/link"

import Box from "~/components/Box"

export const Home: FC<JSX.Element> = () => {
  return (
    <Box color="black" bg="blue">
      <Link href="/quiz">
        <a>Go to Quiz</a>
      </Link>
    </Box>
  )
}

Home.displayName = "HomePage"

export default Home
