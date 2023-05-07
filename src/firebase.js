import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyCZ7I6fd9qGJaXFJ7BFV6O8kVavsuCdWUw",

  authDomain: "todo-app-a852c.firebaseapp.com",

  projectId: "todo-app-a852c",

  storageBucket: "todo-app-a852c.appspot.com",

  messagingSenderId: "84597834555",

  appId: "1:84597834555:web:2f67430bf52b6474e4ad1e",

  measurementId: "G-XCFXBDL362",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
