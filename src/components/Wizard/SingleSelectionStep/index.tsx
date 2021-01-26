import React, {FC, useState} from "react"
import {Heading} from "~/components/Heading"
import {Text} from "~/components/Text"
import {Box} from "~/components/Box"
import {Radio} from "~/components/Radio"

interface WizardSingleSelectionStepProps {
  readonly question: string
  readonly options: string
}

interface WizardBinaryStepInternal {
  readonly onClick?: (optionSelected: number) => void
  readonly value?: number
  readonly defaultValue?: boolean
  readonly id?: number
  readonly options: any
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
    <article>
      <Heading size="h1">{question}</Heading>
      {options.map((option: string, index: number) => {
        return (
          <Box py={1} key={`options-single-key-${id}-${index}`}>
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
    </article>
  )
}

WizardSingleSelectionStep.displayName = "SingleSelectionStep"
