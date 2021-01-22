import {
  QuizBuilder,
  Question,
  Answer,
  Candidate,
  ASystem,
  QuestionEnum
} from "."

describe("Quiz", () => {
  describe("should initialize", () => {
    it("with a single question", () => {
      const ANSWER_OPTIONS = ["seca", "normal", "mixta", "oleosa"]
      const QUESTION_SINGLE_TEXT = "Which kind of skin do you have?"
      const quiz = QuizBuilder()
        .addQuestion(
          Question.about(
            QuestionEnum.KIND_SKIN,
            QUESTION_SINGLE_TEXT,
            ANSWER_OPTIONS
          )
        )
        .build()

      expect(quiz).toBeDefined()
      expect(quiz.amountQuestion()).toEqual(1)
    })

    it("with several questions", () => {
      const QUESTION_SINGLE_TEXT = "Which kind of skin do you have?"
      const QUESTION_MULTI_TEXT = "Do you have a sensitive skin?"

      const quiz = QuizBuilder()
        .addQuestion(
          Question.about(QuestionEnum.KIND_SKIN, QUESTION_SINGLE_TEXT, [
            "seca",
            "normal",
            "mixta",
            "oleosa"
          ])
        )
        .addQuestion(
          Question.about(QuestionEnum.IS_SKIN_SENSIBLE, QUESTION_MULTI_TEXT, [
            true,
            false
          ])
        )
        .build()

      expect(quiz).toBeDefined()
      expect(quiz.amountQuestion()).toEqual(2)
    })
  })
})

describe("candidate", () => {
  // Make validaciones de generacion correcta candidate, regrex email, password vacia, edad valida.
})

describe("member", () => {
  // Hacer validaciones de creacion de miembro valido, preguntas no vacias, preguntas correctas,
  it("should create with two answers", () => {
    const answers = [
      Answer.about(QuestionEnum.KIND_SKIN, "LIGHT"),
      Answer.about(QuestionEnum.IS_SKIN_SENSIBLE, true)
    ]
    const candidate = Candidate.named("elmaiten2@gmail.com", "123qwe", 35)

    const member = ASystem.registerCandidate(candidate, answers)

    expect(member).toBeDefined()
  })
})

describe("The system", () => {
  it("should answer amount of questions", () => {
    const quiz = ASystem.buildQuiz()

    expect(quiz.amountQuestion()).toEqual(2)
  })

  it("should answer the list of questions", () => {
    const quiz = ASystem.buildQuiz()

    expect(quiz.questions().length).toEqual(2)
  })
})
