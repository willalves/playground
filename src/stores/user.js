import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    const userToken = localStorage.getItem("user-token");
    const userInfo = localStorage.getItem("user");
    if (userToken) {
      return {
        currentUser: JSON.parse(userInfo),
        isLoggedIn: true,
      };
    } else {
      return {
        currentUser: null,
        isLoggedIn: false,
      };
    }
  },
  actions: {
    register(username, email, password) {
      const user = { username, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      this.currentUser = user;
    },

    login(email, password) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          this.currentUser = user;
          this.isLoggedIn = true;
          return true;
        }
      }
      return false;
    },

    logout() {
      this.currentUser = null;
      this.isLoggedIn = false;
    },
  },
});
