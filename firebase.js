import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-UMBDqL69XcrP61fJfy8wiQoXTnsjgus",
  authDomain: "appfruit-87168.firebaseapp.com",
  projectId: "appfruit-87168",
  storageBucket: "appfruit-87168.appspot.com",
  messagingSenderId: "988497960144",
  appId: "1:988497960144:web:39dc885bdfeaf8815152d5",
  measurementId: "G-SZVZ878HFR"
};

// Initialize Firebase
const Fapp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default Fapp;
