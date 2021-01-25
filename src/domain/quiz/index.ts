export type QuestionType = "BINARY" | "SINGLE" | "MULTI"

export enum QuestionEnum {
  KIND_SKIN,
  IS_SKIN_SENSIBLE,
  DO_YOU_SKIN_CARE_ROUTINE
}

export interface Quiz {
  readonly amountQuestion: () => number
  readonly questions: () => Question[]
}

interface QuizBuilderType {
  readonly addQuestion: (question: Question) => QuizBuilderType
  readonly build: () => Quiz
}

type BinaryAnswer = true | false
type SingleAnswer = number
type MultiAnswer = string[]
export type AnswerOption = SingleAnswer | MultiAnswer | BinaryAnswer

export class ASystem {
  private static quiz: Quiz

  private constructor() {}

  static buildQuiz(): Quiz {
    const QUESTION_SINGLE_TEXT = "Que tipo de piel tenes?"
    const QUESTION_MULTI_TEXT = "Tenes piel sensible?"

    this.quiz = QuizBuilder()
      .addQuestion(
        Question.about(
          QuestionEnum.IS_SKIN_SENSIBLE,
          QUESTION_MULTI_TEXT,
          ["aaa", "bbb", "ccc"],
          "SINGLE"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.KIND_SKIN,
          QUESTION_SINGLE_TEXT,
          [true, false],
          "BINARY"
        )
      )
      .build()

    return this.quiz
  }

  static buildQuizWith(questions: Question[]): Quiz {
    const builder = QuizBuilder()
    questions.forEach((question) => {
      builder.addQuestion(question)
    })
    return builder.build()
  }

  static registerCandidate(candidate: Candidate, answers: Answer[]): Member {
    // Generate Profile
    // Generate Member
    return Member.named(candidate, answers)
  }

  static getQuestions() {
    return this.quiz.questions()
  }
}

/**
 * Been in charge to generate in a secure and consistence way the Quiz object.
 * @constructor
 */
export const QuizBuilder = (): QuizBuilderType => {
  const answerOptions: Question[] = []

  return {
    build(): Quiz {
      return {
        amountQuestion() {
          return answerOptions.length
        },
        questions() {
          return [...answerOptions]
        }
      }
    },
    addQuestion(question: Question): QuizBuilderType {
      answerOptions.push(question)
      return this
    }
  }
}

export class Question {
  private constructor(
    readonly id: QuestionEnum,
    readonly questionText: string,
    readonly answerOptions: readonly AnswerOption[],
    readonly type: QuestionType
  ) {}

  static about(
    id: QuestionEnum,
    questionText: string,
    answerOptions: readonly AnswerOption[],
    type: QuestionType
  ): Question {
    return new this(id, questionText, answerOptions, type)
  }
}

export class Answer {
  private constructor(
    private readonly question: QuestionEnum,
    private readonly answerOption: AnswerOption
  ) {}

  static about(id: QuestionEnum, answerOption: AnswerOption): Answer {
    return new this(id, answerOption)
  }
}

export class Candidate {
  private constructor(readonly email, readonly password, readonly age) {}

  public static named(email: string, password: string, age: number): Candidate {
    return new this(email, password, age)
  }
}

export class Member {
  private constructor(
    private readonly email,
    private readonly password,
    private readonly age,
    private readonly answers: Answer[]
  ) {}

  public static named(candidate: Candidate, answers: Answer[]): Member {
    return new Member(
      candidate.email,
      candidate.password,
      candidate.age,
      answers
    )
  }
}

export default QuizBuilder
