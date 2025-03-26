import { atom, atomFamily, selector } from "recoil";

interface UserDetails {
  name: string;
  email: string;
  password: string;
  registrationNumber: string;
  degree: string;
  branch: string;
  yearOfPassingOut: number;
  linkedIn: string;
  xHandle: string;
}

export const userDetailsAtom = atom({
  key: "userAtom",
  default: {} as UserDetails,
  effects: [
    ({ setSelf }) => {
      const userData = JSON.parse(localStorage.getItem("userDetails") || "{}");
      if (userData) {
        setSelf(userData);
      }
    },
  ],
});

export const userAuthStateAtom = atom({
  key: "isUserLoggedInAtom",
  default: true,
});

interface Question {
  questionId: string;
  title: string;
  description: string;
  link?: string;
}

interface RoundDetails {
  roundId: string;
  roundName: string;
  roundType: string;
  note?: string;
  questionIds: string[];
}

export const interviewRoundsAtomFamily = atomFamily<RoundDetails, string>({
  key: "interviewRounds",
  default: (Id: string) =>
    ({
      roundId: Id,
      roundName: "",
      note: "",
      roundType: "",
      questionIds: [],
    } as RoundDetails),
});

export const roundQuestionsAtomFamily = atomFamily<Question, string>({
  key: "roundQuestions",
  default: (Id: string) =>
    ({
      questionId: Id,
      title: "",
      description: "",
      link: "",
    } as Question),
});

export const roundIdsAtom = atom<string[]>({
  key: "RoundIds",
  default: [],
});

interface InterviewDetailsForUpdation {
  companyName: string;
  compensation: number;
  createdAt: Date;
  email: string;
  experienceType: string;
  id: string;
  interviewStatus: string;
  registrationNumber: string;
  name: string;
  update: boolean;
  roundDetails: {
    id: string;
    interviewExperienceId: string;
    roundName: string;
    roundType: string;
    note?: string;
    questions: {
      id: string;
      roundDetailsId: string;
      title: string;
      description: string;
      link?: string;
    }[];
  }[];
}

export const isInterviewExperienceForUpdationAtom = atom<
  InterviewDetailsForUpdation | null
>({
  key: "isInterviewExperienceForUpdation",
  default: selector({
    key: "isInterviewExperienceForUpdationSelector",
    get: () => {
      try {
        return JSON.parse(localStorage.getItem("experienceDetails")!);
      } catch (err) {
        console.log("Missing Interview Details");
        return null;
      }
    },
  }),
});
