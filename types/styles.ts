export type UIQuestion = {
  id: number;
  question: string;
  options: [string, string];
  answerIds: [number, number];
};

export type StylesQuestion = {
  questionId: number;
  text: string;

  answerAId: number;
  answerA: string;

  answerBId: number;
  answerB: string;
};

export type StylesQuestionList = StylesQuestion[];

export type StylesAnswerItem = {
  answerId: number;
};

export type StylesAnswer = {
  answers: StylesAnswerItem[];
};