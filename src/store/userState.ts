import { create } from "zustand";
import { getCookie } from "../util/cookie";
import { userStateInterface } from "../interface/authInterface";

const accessToken = getCookie("accesstoken");
const userName = getCookie("name");
const userId = getCookie("username");

export const userState = create<userStateInterface>(set => ({
  userId: userId || "",
  userName: userName || "",
  accessToken: accessToken || "",
  setUserId: (userId: string) => set({ userId }),
  setUserName: (userName: string) => set({ userName }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default userState;
