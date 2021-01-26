export type QuestionType = "BINARY" | "SINGLE" | "MULTI"

export enum QuestionEnum {
  KIND_SKIN,
  IS_SKIN_SENSIBLE,
  DO_YOU_SKIN_CARE_ROUTINE,
  CONCERN_ABOUT_YOUR_SKIN,
  WHAT_IS_THE_COLOR_OF_YOUR_EYES,
  WHAT_SKINCARE_PRODUCTS_DO_YOU_USE,
  WHAT_CATEGORIES_DO_YOU_USE_TO_MAKE_UP,
  DO_YOU_USE_MAKEUP,
  WHAT_ARE_YOU_FAVORITE_BRANDS,
  WHICH_IS_YOUR_SKIN_COLOR,
  WHAT_DISEASES_DO_YOU_HAVE,
  WHAT_HAIR_COLOR_DO_YOU_HAVE
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
type SingleAnswer = string
type MultiAnswer = string[]
export type AnswerOption = SingleAnswer | MultiAnswer | BinaryAnswer

export class ASystem {
  private static quiz: Quiz

  private constructor() {}

  static buildQuiz(): Quiz {
    this.quiz = QuizBuilder()
      .addQuestion(
        Question.about(
          QuestionEnum.KIND_SKIN,
          "Que tipo de piel tenes?",
          ["Seca", "Normal", "Mixta", "Oleosa"],
          "SINGLE"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.IS_SKIN_SENSIBLE,
          "Tenes la piel sensible?",
          [true, false],
          "BINARY"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.DO_YOU_SKIN_CARE_ROUTINE,
          "Realizas una rutina de skin care?",
          [true, false],
          "BINARY"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.CONCERN_ABOUT_YOUR_SKIN,
          "Que es lo que más te preocupa de tu tipo de piel?",
          ["Arrugas", "Manchas", "Acne", "Líneas de expresión", "Flacidez"],
          "MULTI"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_DISEASES_DO_YOU_HAVE,
          "Tenés alguna de las siguientes afecciones de piel?",
          [
            "Eczema",
            "Psoriasis",
            "Acné",
            "Melasma",
            "Rosácea",
            "Dermatitis atópica",
            "Dermatitis seborreica",
            "Vitiligo",
            "Urticaria",
            "Hiperhidrosis",
            "Otras"
          ],
          "MULTI"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_SKINCARE_PRODUCTS_DO_YOU_USE,
          "Que productos usas en tu rutina de cuidado de la piel?",
          ["Limpieza", "Serum", "Hidratación", "Protección", "Otros"],
          "MULTI"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.DO_YOU_USE_MAKEUP,
          "Te soles maquillar?",
          ["Siempre", "a veces", "nunca"],
          "SINGLE"
        )
      )

      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_CATEGORIES_DO_YOU_USE_TO_MAKE_UP,
          "Que categorías utilizas de make up?",
          [
            "Máscaras",
            "Sombras",
            "Labiales",
            "Rubores",
            "Highlighter",
            "Bases",
            "Correctores",
            "Primers",
            "Todas"
          ],
          "SINGLE"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_ARE_YOU_FAVORITE_BRANDS,
          "Cuáles son tus marcas favoritas?",
          ["MAC", "ACME"],
          "MULTI"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_IS_THE_COLOR_OF_YOUR_EYES,
          "Que color de ojos tenes?",
          [
            "MARRON",
            "AVELLANA",
            "AZULES",
            "VERDES",
            "AMBAR",
            "GRISES",
            "VIOLETA",
            "OTROS"
          ],
          "SINGLE"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHICH_IS_YOUR_SKIN_COLOR,
          "Cuál es tu color de piel?",
          [
            "MUY CLARA",
            "CLARA",
            "MEDIA",
            "BRONCEADO OLIVA",
            "OSCURO",
            "MUY OSCURO"
          ],
          "SINGLE"
        )
      )
      .addQuestion(
        Question.about(
          QuestionEnum.WHAT_HAIR_COLOR_DO_YOU_HAVE,
          "Que color de pelo tenes?",
          [
            "NEGRO",
            "CASTAÑO OSCURO",
            "RUBIO",
            "COLORADO",
            "GRIS",
            "BLANCO",
            "OTRO"
          ],
          "SINGLE"
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
