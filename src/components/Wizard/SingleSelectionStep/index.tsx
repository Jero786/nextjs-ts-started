import React, {FC, useState} from "react"
import {Heading} from "~/components/Heading"
import {Text} from "~/components/Text"
import {Box} from "~/components/Box"
import {Radio} from "~/components/Radio"
import {AnswerOption, QuestionType} from "~/domain/quiz"

interface WizardSingleSelectionStepProps {
  readonly question: string
  readonly options: readonly AnswerOption[]
  readonly type: QuestionType;
  readonly defaultValue?: AnswerOption,
}

interface WizardBinaryStepInternal {
  readonly onClick?: (optionSelected: number) => void
  readonly value?: number
  readonly id?: number
  readonly options: readonly AnswerOption[]
}

export const WizardSingleSelectionStep: FC<WizardSingleSelectionStepProps> = ({
                                                                                question,
                                                                                value,
                                                                                onClick,
                                                                                id,
                                                                                options
                                                                              }: WizardSingleSelectionStepProps & WizardBinaryStepInternal) => {
  const [radioSelectedIndex, setRadioSelectedIndex] = useState(value || 0)

  return (
    <Box flexDirection="column">
      <Heading size="h1">{question}</Heading>
      <Box flexDirection="column" m="0 auto" alignItems="flex-end">
        {options.map((option, index) => {
          return (
            <Box alignItems="center"py={1} key={`options-single-key-${id}-${index}`}>
              <Text size="description" htmlFor="binary-yes">
                {option}
              </Text>
              <Radio
                defaultChecked={radioSelectedIndex === index}
                onClick={() => {
                  setRadioSelectedIndex(index)
                  onClick && onClick(index)
                }}
                data-testid={`option-${index}`}
                id={`option-${index}`}
                type="radio"
                name="binary-group"
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

WizardSingleSelectionStep.displayName = "SingleSelectionStep"
