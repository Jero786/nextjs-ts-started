import React from "react"

import {render} from "../../utils/tests"
import {screen, fireEvent} from "@testing-library/react"
import {Wizard} from "."
import {WizardBinaryStep} from "./BinaryStep"
import {WizardSingleSelectionStep} from "./SingleSelectionStep"

describe("<Wizard/>", () => {
  describe("WizardBinaryStep", () => {
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

  describe("WizardSingleSelectionStep", () => {
    test("after click single steps multiple times, only should remains the last clicked by each step", async () => {
      const onSubmit = jest.fn()
      render(
        <Wizard onSubmit={onSubmit}>
          <WizardSingleSelectionStep
            question="which movie do you like it?"
            options={["movie 1", "movie 2", "movie 3"]}
          />
          <WizardSingleSelectionStep
            question="which color do you like it?"
            options={["red", "blue", "green"]}
          />
        </Wizard>
      )

      fireEvent(
        screen.getByTestId("option-0"),
        new MouseEvent("click", {bubbles: true, cancelable: true})
      )

      fireEvent(
        screen.getByTestId("option-1"),
        new MouseEvent("click", {bubbles: true, cancelable: true})
      )

      fireEvent(
        screen.getByTestId("cta-continue"),
        new MouseEvent("click", {bubbles: true, cancelable: true})
      )

      fireEvent(
        screen.getByTestId("option-2"),
        new MouseEvent("click", {bubbles: true, cancelable: true})
      )

      fireEvent(
        screen.getByTestId("cta-finish"),
        new MouseEvent("click", {bubbles: true, cancelable: true})
      )

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith({"0": 1, "1": 2})
    })
  })
})
