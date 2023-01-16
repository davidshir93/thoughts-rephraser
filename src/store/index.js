import { createStore } from "vuex";

// firebase imports
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default createStore({
  state: {
    user: null,
    thoughts: [
      {
        id: 1,
        original:
          "I’m a total mess and I can’t focus at all, I’ll never succeed",
        rephrased:
          "I’m having a hard time focusing right now, but I’ve had and will have different experiences",
        distortions: {
          blackAndWhiteThinking: ["total", "at all", "never"],
          catastrophizing: ["mess", "I'll never"],
          overgeneralizing: ["at all", "never"],
        },
      },
      {
        id: 2,
        original:
          "I don’t know how to handle social situations and I doomed to be alone",
        rephrased:
          "I’m having a difficult time with some of my social interactions, but not all of them are bad",
        distortions: {
          blackAndWhiteThinking: ["I don’t know"],
          catastrophizing: ["doomed"],
        },
      },
    ],
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user);
    },
  },
  actions: {
    async signup(context, { email, password }) {
      console.log("signup action called");
      // setTimeout(() => {
      //   context.commit("setUser", {
      //     email,
      //     password,
      //   });
      // }, 2000);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("Could not complete signup");
      }
    },
  },
  modules: {},
});
