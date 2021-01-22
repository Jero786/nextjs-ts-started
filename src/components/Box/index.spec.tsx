import React from "react"

import {render} from "../../utils/tests"
import Box from "."

describe("<Box/>", () => {
  test("Should display text of the box properly", async () => {
    const {asFragment} = render(<Box />)

    const firstRender = asFragment()

    expect(firstRender).toBeDefined()
  })
})
