import firebase from "firebase/app"

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
// import "firebase/storage"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1EYzj4lzIkP6nwDcXH6kqbN5Wxzy_OjQ",
  authDomain: "mysys-pds.firebaseapp.com",
  projectId: "mysys-pds",
  storageBucket: "mysys-pds.appspot.com",
  messagingSenderId: "738836908485",
  appId: "1:738836908485:web:e2a6898cfb6b10f65163ac",
  measurementId: "G-ZDVE8MMCLK",
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore()

export { firebase };
