import { createStore } from "vuex";
import router from "../router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    email: (state) => {
      if (state.user) return state.user.email;
      else return null;
    },
  },
  mutations: {
    setAuth(state, payload) {
      state.isAuthenticated = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    checkAuth(context) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          context.commit("setAuth", true);
          context.commit("setUser", user);
        } else {
          context.commit("setAuth", false);
          context.commit("setUser", null);
        }
      });
    },

    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          router.replace("/signin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
