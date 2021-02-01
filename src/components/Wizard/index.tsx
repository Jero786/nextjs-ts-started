import React, {FC, useState} from "react"
import {AnswerOption} from "~/domain/quiz"
import {Wrapper, Container} from "~/components/Wizard/styled"
import {Button} from "~/components/Button"
import {Box} from "~/components/Box"

interface WizardProps {
  children: JSX.Element[]
  onSubmit: (all: StepsModel) => void
}

interface StepsModel {
  [key: string]: string | number | AnswerOption
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
          <Box style={{color: 'gray'}}>
            Pasos {stepIndex + 1} / {children.length}
          </Box>
          {stepsEl[stepIndex]}
          <Box justifyContent="center" mt="1rem">
            {!isFirstStep && ButtonBack(setStepIndex, stepIndex)}
            {!hasFinalStep && ButtonContinue(setStepIndex, stepIndex)}
            {hasFinalStep && ButtonSubmit(onSubmit, stepsModel)}
          </Box>
        </form>
      </Wrapper>
    </Container>
  )
}

function loadStepsModel(children: JSX.Element[], stepsModel: StepsModel) {
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
  <Box>
    <Button
      variant="primary"
      data-testid="cta-continue"
      role="button"
      onClick={(evt: Event) => {
        evt.preventDefault()
        setStepIndex(stepIndex + 1)
      }}
    >
      Continuar
    </Button>
  </Box>
)

const ButtonBack = (setStepIndex: setStepIndexType, stepIndex: number) => (
  <Box mr={"1rem"}>
    <Button
      variant="secondary"
      data-testid="cta-back"
      role="button"
      onClick={(evt: Event) => {
        evt.preventDefault()
        setStepIndex(stepIndex - 1)
      }}
    >
      Atras
    </Button>
  </Box>
)

const ButtonSubmit = (
  onSubmit: (all: StepsModel) => void,
  stepsModel: StepsModel
) => (
  <Box mr={"1rem"}>
    <Button
      variant="primary"
      data-testid="cta-finish"
      role="button"
      type="submit"
      onClick={(evt: Event) => {
        evt.preventDefault()
        onSubmit(stepsModel)
      }}
    >
      Terminar
    </Button>
  </Box>
)
