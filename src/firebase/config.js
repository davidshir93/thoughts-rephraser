// import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/firestore";

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAqpGeNtZ3nLtfHwWkNpO4ijWe6mtep14",
  authDomain: "thoughts-rephraser.firebaseapp.com",
  projectId: "thoughts-rephraser",
  storageBucket: "thoughts-rephraser.appspot.com",
  messagingSenderId: "814246135597",
  appId: "1:814246135597:web:8a5f058427e85bd2fc75a4",
  measurementId: "G-09G13KERG7",
};

// init firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// init firebase auth
const auth = getAuth();

export { auth, timestamp };
export default firebaseApp.firestore();
