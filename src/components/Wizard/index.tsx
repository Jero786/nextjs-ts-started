import React, {FC, useState} from "react"
import {AnswerOption} from "../../domain/quiz"

interface WizardProps {
  children: JSX.Element
  onSubmit: (all: StepsModel) => void
}

interface StepsModel {
  [key: string]: AnswerOption
}

type setStepIndexType = (
  value: ((prevState: number) => number) | number
) => void

export const Wizard: FC<WizardProps> = ({children, onSubmit}: WizardProps) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [stepsModel] = useState({} as StepsModel)
  const stepsEl = loadStepsModel(children, stepsModel)
  const hasFinalStep = stepIndex === stepsEl.length - 1

  return (
    <form>
      {stepsEl[stepIndex]}
      {!hasFinalStep && ButtonContinue(setStepIndex, stepIndex)}
      {hasFinalStep && ButtonBack(setStepIndex, stepIndex)}
      {hasFinalStep && ButtonSubmit(onSubmit, stepsModel)}
    </form>
  )
}

function loadStepsModel(children: JSX.Element, stepsModel: StepsModel) {
  return React.Children.map(children, (step, index) => {
    if (stepsModel[index] === undefined) {
      stepsModel[index] = step.props.defaultValue
    }
    return React.cloneElement(step, {
      ...step.props,
      id: index,
      key: `step-${index}-key`,
      value: stepsModel[index],
      onClick: (radioId: number, isChecked: boolean) => {
        stepsModel[radioId] = isChecked
      }
    })
  })
}

Wizard.displayName = "Wizard"

const ButtonContinue = (setStepIndex: setStepIndexType, stepIndex: number) => (
  <button
    data-testid="cta-continue"
    role="button"
    onClick={(evt) => {
      evt.preventDefault()
      setStepIndex(stepIndex + 1)
    }}
  >
    CONTINUE
  </button>
)

const ButtonBack = (setStepIndex: setStepIndexType, stepIndex: number) => (
  <button
    data-testid="cta-back"
    role="button"
    onClick={(evt) => {
      evt.preventDefault()
      setStepIndex(stepIndex - 1)
    }}
  >
    BACK
  </button>
)

const ButtonSubmit = (
  onSubmit: (all: StepsModel) => void,
  stepsModel: StepsModel
) => (
  <button
    data-testid="cta-finish"
    role="button"
    type="submit"
    onClick={(evt) => {
      evt.preventDefault()
      onSubmit(stepsModel)
    }}
  >
    FINISH
  </button>
)
