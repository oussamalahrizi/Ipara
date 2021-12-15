import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAM2W8S0qhzZRjMqvXbetZDGiGKR21MFiI",

  authDomain: "mypara-94a30.firebaseapp.com",

  projectId: "mypara-94a30",

  storageBucket: "mypara-94a30.appspot.com",

  messagingSenderId: "860996611009",

  appId: "1:860996611009:web:7d68fe99d385380dc35d40",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
