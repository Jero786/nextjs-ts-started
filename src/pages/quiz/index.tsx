import React, {FC} from "react"

import Box from "~/components/Box"
import Link from "next/link"
import {ASystem, Question} from "~/domain/quiz"
import {Wizard} from "~/components/Wizard"
import {WizardBinaryStep} from "~/components/Wizard/BinaryStep"
import {WizardSingleSelectionStep} from "~/components/Wizard/SingleSelectionStep"

const STEPS_MAPPING: {[key: string]: (question: Question) => JSX.Element} = {
  // eslint-disable-next-line react/display-name
  BINARY: (question) => (
    <WizardBinaryStep
      type="BINARY"
      key={question.id}
      question={question.questionText}
    />
  ),
  // eslint-disable-next-line react/display-name
  SINGLE: (question) => (
    <WizardSingleSelectionStep
      type="SINGLE"
      key={question.id}
      question={question.questionText}
      options={question.answerOptions}
    />
  )
}

export const QuizPage: FC<JSX.Element> = () => {
  const quizModel = ASystem.buildQuiz()

  return (
    <Box color="black">
      <Link href="/">
        <a>Close</a>
      </Link>

      <Wizard>
        {quizModel
          .questions()
          .map((question) => STEPS_MAPPING[question.type](question))}
      </Wizard>
    </Box>
  )
}

QuizPage.displayName = "QuizPage"

export default QuizPage
