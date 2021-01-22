import React from "react"

import {render} from "../../utils/tests"
import {screen, fireEvent} from "@testing-library/react"
import {Wizard} from "."
import {WizardBinaryStep} from "./BinaryStep"

describe("<Wizard/>", () => {
  test("should display with a simple binary step selected by default true as first question", async () => {
    render(
      <Wizard>
        <WizardBinaryStep
          defaultValue={true}
          question="Do you have a sensitive skin?"
        ></WizardBinaryStep>
        <WizardBinaryStep question="Do you like pizza?"></WizardBinaryStep>
      </Wizard>
    )

    expect(
      screen.getByText("Do you have a sensitive skin?")
    ).toBeInTheDocument()
    expect(screen.getByTestId("radio-yes")).toBeChecked()
    expect(screen.queryByText("Do you like pizza?")).not.toBeInTheDocument()
    expect(screen.getByTestId("cta-continue")).toBeInTheDocument()
  })

  test("should display with a simple binary step selected by default false as first question", async () => {
    render(
      <Wizard>
        <WizardBinaryStep question="Do you have a sensitive skin?"></WizardBinaryStep>
        <WizardBinaryStep question="Do you like pizza?"></WizardBinaryStep>
      </Wizard>
    )

    expect(
      screen.getByText("Do you have a sensitive skin?")
    ).toBeInTheDocument()
    expect(screen.getByTestId("radio-yes")).not.toBeChecked()
    expect(screen.queryByText("Do you like pizza?")).not.toBeInTheDocument()
    expect(screen.getByTestId("cta-continue")).toBeInTheDocument()
  })

  test("should display the second step after click continue", async () => {
    render(
      <Wizard>
        <WizardBinaryStep question="Do you have a sensitive skin?"></WizardBinaryStep>
        <WizardBinaryStep question="Do you like pizza?"></WizardBinaryStep>
      </Wizard>
    )

    fireEvent(
      screen.getByTestId("cta-continue"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    expect(
      screen.queryByText("Do you have a sensitive skin?")
    ).not.toBeInTheDocument()
    expect(screen.getByText("Do you like pizza?")).toBeInTheDocument()
    expect(screen.getByTestId("cta-finish")).toBeInTheDocument()
    expect(screen.getByTestId("cta-back")).toBeInTheDocument()
  })

  test("after click on yes in all steps should receive a list of answers after click submit", async () => {
    const onSubmit = jest.fn()
    render(
      <Wizard onSubmit={onSubmit}>
        <WizardBinaryStep
          type="binary"
          id="1"
          question="Do you have a sensitive skin?"
        ></WizardBinaryStep>
        <WizardBinaryStep
          type="binary"
          id="2"
          question="Do you like pizza?"
        ></WizardBinaryStep>
      </Wizard>
    )

    fireEvent(
      screen.getByTestId("radio-yes"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-continue"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("radio-yes"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-finish"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({"0": true, "1": true})
  })

  test("after click on yes first and then false should receive a list of answers after click submit", async () => {
    const onSubmit = jest.fn()
    render(
      <Wizard onSubmit={onSubmit}>
        <WizardBinaryStep
          type="binary"
          id="1"
          question="Do you have a sensitive skin?"
        ></WizardBinaryStep>
        <WizardBinaryStep
          type="binary"
          id="2"
          question="Do you like pizza?"
        ></WizardBinaryStep>
      </Wizard>
    )

    fireEvent(
      screen.getByTestId("radio-false"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-continue"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("radio-yes"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-finish"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({"0": false, "1": true})
  })

  test("after click on true and then false should receive a list of answers after click submit", async () => {
    const onSubmit = jest.fn()
    render(
      <Wizard onSubmit={onSubmit}>
        <WizardBinaryStep
          type="binary"
          id="1"
          question="Do you have a sensitive skin?"
        ></WizardBinaryStep>
        <WizardBinaryStep
          type="binary"
          id="2"
          question="Do you like pizza?"
        ></WizardBinaryStep>
      </Wizard>
    )

    fireEvent(
      screen.getByTestId("radio-yes"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-continue"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("radio-false"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    fireEvent(
      screen.getByTestId("cta-finish"),
      new MouseEvent("click", {bubbles: true, cancelable: true})
    )

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({"0": true, "1": false})
  })
})
