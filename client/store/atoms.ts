import { atom } from "recoil";

interface UserDetails{
  name:string,
  email:string,
  password:string,
  registrationNumber:number,
  degree:string,
  branch:string,
  yearOfPassingOut:number
}

export const userDetailsAtom = atom({
  key: "userAtom",
  default: {} as UserDetails,
});

export const userAuthStateAtom = atom({
  key:"isUserLoggedInAtom",
  default: true
})