import React, {FC} from "react"

import Box from "~/components/Box"
import Link from "next/link"
import {ASystem, Question} from "../../domain/quiz"
import {Wizard} from "../../components/Wizard"
import {WizardBinaryStep} from "../../components/Wizard/BinaryStep"

const STEPS_MAPPING: {[key: string]: (question: Question) => JSX.Element} = {
  // eslint-disable-next-line react/display-name
  BINARY: (question) => (
    <WizardBinaryStep key={question.id} question={question.questionText} />
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
