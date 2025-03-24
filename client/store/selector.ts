import { selector } from "recoil";
import {
  interviewRoundsAtomFamily,
  roundIdsAtom,
  roundQuestionsAtomFamily,
} from "./atoms";

interface RoundDetails {
  roundName: string;
  roundType: string;
  note?: string;
  questions?: Questions[];
}

interface Questions {
  title: string;
  description: string;
  link?: string;
}


export const allInterviewRoundsDetails = selector({
  key: "allInterviewRoundsDetails",
  get: ({ get }) => {
    const allRoundDetails = <RoundDetails[]>[];
    const roundIds = get(roundIdsAtom);

    roundIds.map((id) => {
      const currentRound = get(interviewRoundsAtomFamily(id));

      const roundQuestion = <Questions[]>[];

      currentRound.questionIds.map((id) => {
        const questionObject = get(roundQuestionsAtomFamily(id));
        roundQuestion.push(questionObject);
      });
      allRoundDetails.push({roundName:currentRound.roundName,roundType:currentRound.roundType,note:currentRound.note,questions:roundQuestion});
    });

    return allRoundDetails;
  },
});
