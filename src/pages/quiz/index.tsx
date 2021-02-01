import React, {FC} from "react"
import {ASystem, Question} from "~/domain/quiz"
import {Wizard} from "~/components/Wizard"
import {WizardBinaryStep} from "~/components/Wizard/BinaryStep"
import {WizardSingleSelectionStep} from "~/components/Wizard/SingleSelectionStep"
import {WizardMultiSelectionStep} from "~/components/Wizard/MultiSelectionStep"
import Layout from "~/components/Layout"

const STEPS_MAPPING: {[key: string]: (question: Question) => JSX.Element} = {
  // eslint-disable-next-line react/display-name
  BINARY: (question) => (
    <WizardBinaryStep
      type="BINARY"
      key={question.id}
      question={question.questionText}
      defaultValue={question.defaultAnswer}
    />
  ),
  // eslint-disable-next-line react/display-name
  SINGLE: (question) => (
    <WizardSingleSelectionStep
      type="SINGLE"
      key={question.id}
      question={question.questionText}
      options={question.answerOptions}
      defaultValue={question.defaultAnswer}
    />
  ),
  // eslint-disable-next-line react/display-name
  MULTI: (question) => (
    <WizardMultiSelectionStep
      type="SINGLE"
      key={question.id}
      question={question.questionText}
      options={question.answerOptions}
      defaultValue={question.defaultAnswer}
    />
  )
}

export const QuizPage: FC<JSX.Element> = () => {
  const quizModel = ASystem.buildQuiz()

  return (
    <Layout>
      <Wizard onSubmit={onSubmit}>
        {quizModel
          .questions()
          .map((question: Question) => STEPS_MAPPING[question.type](question))}
      </Wizard>
    </Layout>
  )
}

QuizPage.displayName = "QuizPage"

function onSubmit() {
  alert('*** PERFIL CREADO EXITOSAMENTE ***')
}

export default QuizPage
