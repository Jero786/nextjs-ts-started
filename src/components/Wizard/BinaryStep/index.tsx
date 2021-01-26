import React, {FC} from "react"
import {Box} from "~/components/Box"
import {Radio} from "~/components/Radio"
import {Heading} from "~/components/Heading"

interface WizardBinaryStepProps {
  readonly question: string
}

interface WizardBinaryStepInternal {
  readonly onClick?: (isChecked: boolean) => void
  readonly value?: boolean
  readonly defaultValue?: boolean
  readonly id?: number
}

export const WizardBinaryStep: FC<WizardBinaryStepProps> = ({
  question,
  value,
  onClick
}: WizardBinaryStepProps & WizardBinaryStepInternal) => {
  return (
    <div>
      <Heading size="h1">{question}</Heading>
      <br />
      <Box py={1}>
        <label htmlFor="binary-yes">Yes</label>
        <Radio
          defaultChecked={value}
          onClick={() => onClick && onClick(true)}
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
          onClick={() => onClick && onClick(false)}
          data-testid="radio-false"
          id="binary-false"
          type="radio"
          name="binary-group"
          value="false"
        />
        <br />
      </Box>
    </div>
  )
}

WizardBinaryStep.displayName = "WizardStepBinary"
