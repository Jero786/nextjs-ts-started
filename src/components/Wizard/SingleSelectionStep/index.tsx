import React, {FC, useState} from "react"

interface WizardSingleSelectionStepProps {
  readonly question: string
  readonly options: string
}

interface WizardBinaryStepInternal {
  readonly onClick?: (optionSelected: number) => void
  readonly value?: number
  readonly defaultValue?: boolean
  readonly id?: number
  readonly options: string[]
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
    <div>
      <label>{question}</label>
      <br />
      {options.map((option, index) => {
        return (
          <div key={`options-single-key-${id}-${index}`}>
            <label htmlFor="binary-yes">{option}</label>
            <input
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
            <br />
          </div>
        )
      })}
    </div>
  )
}

WizardSingleSelectionStep.displayName = "SingleSelectionStep"
