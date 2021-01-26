import React, {FC, useState} from "react"
import {AnswerOption} from "~/domain/quiz"
import {Wrapper, Container} from "~/components/Wizard/styled"
import {Button} from "~/components/Button"

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
  const isFirstStep = stepIndex === 0

  return (
    <Container>
      <Wrapper>
        <form>
          {stepsEl[stepIndex]}
          {!isFirstStep && ButtonBack(setStepIndex, stepIndex)}
          {!hasFinalStep && ButtonContinue(setStepIndex, stepIndex)}
          {hasFinalStep && ButtonSubmit(onSubmit, stepsModel)}
        </form>
      </Wrapper>
    </Container>
  )
}

function loadStepsModel(children: JSX.Element, stepsModel: StepsModel) {
  return React.Children.map(children, (step, stepIndex) => {
    if (stepsModel[stepIndex] === undefined) {
      stepsModel[stepIndex] = step.props.defaultValue
    }

    return React.cloneElement(step, {
      ...step.props,
      id: stepIndex,
      key: `step-${stepIndex}-key`,
      value: stepsModel[stepIndex],
      onClick: (value: boolean | number) => {
        stepsModel[stepIndex] = value // could be boolean | number (single selection) | number[] (multi selection)
      }
    })
  })
}

Wizard.displayName = "Wizard"

const ButtonContinue = (setStepIndex: setStepIndexType, stepIndex: number) => (
  <Button
    variant="primary"
    data-testid="cta-continue"
    role="button"
    onClick={(evt) => {
      evt.preventDefault()
      setStepIndex(stepIndex + 1)
    }}
  >
    CONTINUE
  </Button>
)

const ButtonBack = (setStepIndex: setStepIndexType, stepIndex: number) => (
  <Button
    variant="secondary"
    data-testid="cta-back"
    role="button"
    onClick={(evt) => {
      evt.preventDefault()
      setStepIndex(stepIndex - 1)
    }}
  >
    BACK
  </Button>
)

const ButtonSubmit = (
  onSubmit: (all: StepsModel) => void,
  stepsModel: StepsModel
) => (
  <Button
    variant="primary"
    data-testid="cta-finish"
    role="button"
    type="submit"
    onClick={(evt) => {
      evt.preventDefault()
      onSubmit(stepsModel)
    }}
  >
    FINISH
  </Button>
)
