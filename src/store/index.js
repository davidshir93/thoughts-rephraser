import { createStore } from "vuex";

export default createStore({
  state: {
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
  mutations: {},
  actions: {},
  modules: {},
});
