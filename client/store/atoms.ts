import { atom, atomFamily } from "recoil";

interface UserDetails{
  name:string,
  email:string,
  password:string,
  registrationNumber:string,
  degree:string,
  branch:string,
  yearOfPassingOut:number
  linkedIn:string,
  xHandle:string
}

export const userDetailsAtom = atom({
  key: "userAtom",
  default: {} as UserDetails,
  effects:[
    ({setSelf})=>{
      const userData = JSON.parse(localStorage.getItem("userDetails") || "{}")
      if(userData){
        setSelf(userData)
      }
    }
  ]
});

export const userAuthStateAtom = atom({
  key:"isUserLoggedInAtom",
  default: true
})

interface Question{
  questionId: string,
  title: string,
  description: string,
  link?: string
}

interface RoundDetails{
  roundId: string,
  roundName: string,
  roundType: string,
  note?:string,
  questionIds: string[]
}

export const interviewRoundsAtomFamily = atomFamily<RoundDetails,string>({
  key:"interviewRounds",
  default: (Id:string) => ({
    roundId:Id,
    roundName:"",
    note:"",
    roundType:"",
    questionIds:[]
  } as RoundDetails)
})


export const roundQuestionsAtomFamily = atomFamily<Question,string>({
  key: "roundQuestions",
  default: (Id:string) => ({
    questionId:Id,
    title:"",
    description:"",
    link:""
  } as Question)
})

export const roundIdsAtom = atom<string[]>({
  key:"RoundIds",
  default: []
})
