import React, {FC, useState} from "react"
import {Checkbox} from "~/components/Checkbox"
import {Heading} from "~/components/Heading"
import {Text} from "~/components/Text"
import {Box} from "~/components/Box"
import {AnswerOption, QuestionType} from "~/domain/quiz"

interface WizardSingleSelectionStepProps {
  readonly question: string
  readonly options: readonly AnswerOption[]
  readonly type: QuestionType;
  readonly defaultValue?: AnswerOption,
}

interface WizardBinaryStepInternal {
  readonly onClick?: (optionSelected: any) => void
  readonly value?: number[]
  readonly defaultValue?: AnswerOption
  readonly id?: number
  readonly options: readonly AnswerOption[]
}

export const WizardMultiSelectionStep: FC<WizardSingleSelectionStepProps & WizardBinaryStepInternal> = ({
  question,
  onClick,
  id,
  options,
  value
}: WizardSingleSelectionStepProps & WizardBinaryStepInternal) => {
  const [selectedValues, setSelectedValues] = useState(value || [])

  return (
    <Box flexDirection="column">
      <Heading size="h1">{question}</Heading>
      <Box flexDirection="column" m="0 auto" alignItems="flex-end">
        {options.map((option, index) => {
          return (
            <Box justifyContent="space-around" key={`options-single-key-${id}-${index}`}>
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
              <br/>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

WizardMultiSelectionStep.displayName = "MultiSelectionStep"
