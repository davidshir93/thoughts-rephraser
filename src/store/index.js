import { createStore } from "vuex";

// firebase imports
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
// import firebase from "firebase/compat/app";
import db from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    isLoading: false,
    // thoughts: [
    //   {
    //     id: 1,
    //     original:
    //       "I’m a total mess and I can’t focus at all, I’ll never succeed",
    //     rephrased:
    //       "I’m having a hard time focusing right now, but I’ve had and will have different experiences",
    //     distortions: {
    //       blackAndWhiteThinking: ["total", "at all", "never"],
    //       catastrophizing: ["mess", "I'll never"],
    //       overgeneralizing: ["at all", "never"],
    //     },
    //   },
    //   {
    //     id: 2,
    //     original:
    //       "I don’t know how to handle social situations and I doomed to be alone",
    //     rephrased:
    //       "I’m having a difficult time with some of my social interactions, but not all of them are bad",
    //     distortions: {
    //       blackAndWhiteThinking: ["I don’t know"],
    //       catastrophizing: ["doomed"],
    //     },
    //   },
    // ],
    thoughts: [],
    thoughtsLoaded: false,
    currentThought: null,
  },
  getters: {},
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    enrichUserData(state, payload) {
      state.user = {
        ...state.user,
        ...payload,
      };
    },
    addThought(state, payload) {
      state.thoughts.unshift(payload);
    },
    setThoughts(state, payload) {
      state.thoughts = payload;
    },
    setThoughtsLoaded(state, payload) {
      state.thoughtsLoaded = payload;
    },
    deleteThoughtById(state, payload) {
      state.thoughts = state.thoughts.filter(
        (thoguht) => thoguht.id !== payload
      );
    },
  },
  actions: {
    async signup(context, { firstName, lastName, email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const dataBase = db.collection("users").doc(res.user.uid);
      await dataBase.set({
        firstName,
        lastName,
        email,
      });
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("Could not complete signup");
      }
    },
    async login(context, { email, password }) {
      context.commit("setIsLoading", true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
        await context.dispatch("getUserData");
      } else {
        throw new Error("Could not complete login");
      }
      context.commit("setIsLoading", false);
    },
    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
    async resetPassword(context, { email }) {
      await sendPasswordResetEmail(auth, email);
    },
    async getUserData(context) {
      context.commit("setIsLoading", true);
      const currentUser = context.state.user
        ? context.state.user.uid
        : auth.currentUser.uid;
      const dataBase = await db.collection("users").doc(currentUser);
      const dbResults = await dataBase.get();
      context.commit("enrichUserData", dbResults.data());
      context.commit("setIsLoading", false);
    },
    async addThought(context, { original, rephrased, distortions }) {
      const newThoguht = {
        timestamp: new Date(),
        original: original,
        rephrased: rephrased,
        distortions: distortions,
        createdBy: context.state.user.uid,
        firstName: context.state.user.firstName,
        lastName: context.state.user.lastName,
      };
      try {
        context.commit("setIsLoading", true);
        const dataBase = db.collection("thoughts").doc();
        await dataBase.set({
          thoughtId: dataBase.id,
          createdBy: context.state.user.uid,
          ...newThoguht,
        });
        context.commit("setIsLoading", false);
        context.commit("addThought", newThoguht);
      } catch (err) {
        context.commit("setIsLoading", false);
        console.log(err.message);
        throw new Error("Could not add thought");
      }
    },
    async getThoughts(context) {
      context.commit("setThoughtsLoaded", false);

      const querySnapshot = await getDocs(collection(db, "thoughts"));
      await querySnapshot.forEach(async (doc) => {
        const userInfo = await getUserById(doc.data().createdBy);
        context.state.thoughts.push({
          id: doc.data().thoughtId,
          createdBy: doc.data().createdBy,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          timestamp: doc.data().timestamp,
          original: doc.data().original,
          rephrased: doc.data().rephrased,
          distortions: doc.data().distortions,
        });
      });
      context.commit("setThoughtsLoaded", true);
    },
    async deleteThoguht(context, thoughtId) {
      try {
        await deleteDoc(doc(db, "thoughts", thoughtId));
        context.commit("deleteThoughtById", thoughtId);
      } catch (error) {
        console.error(error);
        console.error("could not delete thought ", thoughtId);
      }
    },
    editThoguht(context, thoughtId) {
      const thoughtRef = context.state.thoughts.find(
        (thought) => thought.id === thoughtId
      );
      context.state.currentThought = JSON.parse(JSON.stringify(thoughtRef));
    },
  },
  modules: {},
});
const getUserById = async (id) => {
  try {
    const dataBase = db.collection("users").doc(id);
    const dbResults = await dataBase.get();
    return dbResults.data();
  } catch (error) {
    console.error(error);
  }
};
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setIsLoading", true);
  store.commit("setUser", user);
  if (user) {
    store.dispatch("getUserData").then(() => {
      store.commit("setAuthIsReady", true);
    });
  }
  store.dispatch("getThoughts");
  store.commit("setAuthIsReady", true);
  store.commit("setIsLoading", false);
  unsub();
});

export default store;
