import React from "react"
import {screen} from "@testing-library/react"

import Home from "."
import {render} from "../utils/tests"

describe("<Home/>", () => {
  test("Should display text of the home properly", async () => {
    render(<Home />)

    const items = await screen.findAllByText(/Go to Quiz/i)

    expect(items).toHaveLength(1)
  })
})
