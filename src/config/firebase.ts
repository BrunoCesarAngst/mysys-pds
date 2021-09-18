import firebase from "firebase/app"

// Optionally import the services that you want to use
import "firebase/auth"
//import "firebase/database";
import "firebase/firestore"
//import "firebase/functions";
// import "firebase/storage"

import {
  APIKEY,
  AUTHDOMAIM,
  APPID,
  MEASUREMENTID,
  MESSAGINGSENDERID,
  PROJECTID,
  STORAGEBUCKET,
} from "@env"

// Initialize Firebase
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIM,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()

export { firebase }
