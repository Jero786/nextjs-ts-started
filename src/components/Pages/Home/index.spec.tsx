import React from "react"

import {screen} from "@testing-library/react"
import {describe, expect, test} from  '@jest/globals'

import Home from "../../../pages"
import {render} from "../../../utils/tests"

describe("<Home/>", () => {
  test("Should display text of the home properly", async () => {
    // @ts-ignore
    render(<Home />)

    const item = await screen.getByTestId('cta-start')

    expect(item).toBeInTheDocument();
  })
})
