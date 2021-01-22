import React, {FC} from "react"

interface WizardBinaryStepProps {
  readonly question: string
}

interface WizardBinaryStepInternal {
  readonly onClick?: (radioId: number, isChecked: boolean) => void
  readonly value?: boolean
  readonly defaultValue?: boolean
  readonly id?: number
}

export const WizardBinaryStep: FC<WizardBinaryStepProps> = ({
  question,
  value,
  onClick,
  id
}: WizardBinaryStepProps & WizardBinaryStepInternal) => {
  return (
    <div>
      <label>{question}</label>
      <br />

      <label htmlFor="binary-yes">Yes</label>
      <input
        defaultChecked={value}
        onClick={() => onClick && onClick(id, true)}
        data-testid="radio-yes"
        id="binary-yes"
        type="radio"
        name="binary-group"
        value="true"
      />
      <br />

      <label htmlFor="binary-false">False</label>
      <input
        defaultChecked={!value}
        onClick={() => onClick && onClick(id, false)}
        data-testid="radio-false"
        id="binary-false"
        type="radio"
        name="binary-group"
        value="false"
      />
      <br />
    </div>
  )
}

WizardBinaryStep.displayName = "WizardStepBinary"
