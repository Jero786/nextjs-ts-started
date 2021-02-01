import React, {FC} from "react"
import {Box} from "~/components/Box"
import {Radio} from "~/components/Radio"
import {Text} from "~/components/Text"
import {Heading} from "~/components/Heading"
import {AnswerOption, QuestionType} from "~/domain/quiz"

interface WizardBinaryStepProps {
  readonly type: QuestionType;
  readonly question: string;
  readonly defaultValue?: AnswerOption,
}

interface WizardBinaryStepInternal {
  readonly onClick?: (isChecked: boolean) => void
  readonly value?: boolean
  readonly id?: number
}

export const WizardBinaryStep: FC<WizardBinaryStepProps> = ({
                                                              question,
                                                              value,
                                                              onClick
                                                            }: WizardBinaryStepProps & WizardBinaryStepInternal) => {
  return (
    <Box flexDirection="column" alignItems="center">
      <Heading size="h1">{question}</Heading>
      <Box flexDirection="column" m="0 auto" alignItems="flex-end">
        <Box>
          <Text size="description" htmlFor="binary-yes">SI</Text>
          <Radio
            defaultChecked={value}
            onClick={() => onClick && onClick(true)}
            data-testid="radio-yes"
            id="binary-yes"
            type="radio"
            name="binary-group"
            value="true"
          />
        </Box>
        <Box>
          <Text size="description" htmlFor="binary-false">NO</Text>
          <input
            defaultChecked={!value}
            onClick={() => onClick && onClick(false)}
            data-testid="radio-false"
            id="binary-false"
            type="radio"
            name="binary-group"
            value="false"
          />
        </Box>
      </Box>
    </Box>
  )
}

WizardBinaryStep.displayName = "WizardStepBinary"
