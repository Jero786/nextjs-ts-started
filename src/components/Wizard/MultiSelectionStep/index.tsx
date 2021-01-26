import React, {FC, useState} from "react"
import {Container} from "./styled"
import {Checkbox} from "~/components/Checkbox"
import {Heading} from "~/components/Heading"
import {Text} from "~/components/Text"
import {Box} from "~/components/Box"

interface WizardSingleSelectionStepProps {
  readonly question: string
  readonly options: string
}

interface WizardBinaryStepInternal {
  readonly onClick?: (optionSelected: number) => void
  readonly value?: number[]
  readonly defaultValue?: boolean
  readonly id?: number
  readonly options: string[]
}

export const WizardMultiSelectionStep: FC<WizardSingleSelectionStepProps> = ({
  question,
  onClick,
  id,
  options,
  value
}: WizardSingleSelectionStepProps & WizardBinaryStepInternal) => {
  const [selectedValues, setSelectedValues] = useState(value || [])

  return (
    <Container>
      <Heading size="h1">{question}</Heading>
      <br />
      {options.map((option, index) => {
        return (
          <Box key={`options-single-key-${id}-${index}`}>
            <Text size="description" htmlFor="binary-yes">
              {option}
            </Text>
            <Checkbox
              defaultChecked={selectedValues.indexOf(index) > -1}
              onClick={() => {
                const newSelectedValues =
                  selectedValues.indexOf(index) > -1
                    ? selectedValues.filter((number) => number !== index)
                    : [...selectedValues, index]

                setSelectedValues(newSelectedValues)
                onClick && onClick(newSelectedValues)
              }}
              data-testid={`option-${index}`}
              id={`option-${index}`}
              name="binary-group"
            />
            <br />
          </Box>
        )
      })}
    </Container>
  )
}

WizardMultiSelectionStep.displayName = "MultiSelectionStep"
