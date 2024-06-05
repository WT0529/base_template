import { defineStore } from "pinia";
import type { User } from "./types";

// 必要的状态类型注解
// interface State {
//   users: User[]
// }
export const useUserStore = defineStore({
  id: "userState",
  state: (): User => ({
    userName: "haha",
    age: 0,
    role: "",
  }),
  getters: {
    getUserName(state: User) {
      return state.userName;
    },
  },
  actions: {
    setUserName(state: User, name: string) {
      state.userName = name;
    },
    // async loadAllUsers(state: User) {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/users')
    //   const data = await response.json()
    //   state = data
    // }
  },
});
