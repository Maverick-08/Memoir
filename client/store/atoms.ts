import { atom } from "recoil";

export const userDetailsAtom = atom({
  key: "userAtom",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      const userDetails = localStorage.getItem("userDetails");

      if (userDetails) {
        setSelf(JSON.parse(userDetails));
      }

      onSet((newValue) => {
        setSelf(newValue);
        localStorage.setItem("userDetails", JSON.stringify(newValue));
      });
    },
  ],
});

export const userAuthStateAtom = atom({
  key:"isUserLoggedInAtom",
  default: true
})