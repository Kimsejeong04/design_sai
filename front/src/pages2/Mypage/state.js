import { atom } from "recoil";

export const portfolioState = atom({
  key: "portfolioState",
  default: {
    description: "",
    images: [],
  },
});
