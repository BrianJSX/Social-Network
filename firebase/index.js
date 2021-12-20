import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-cyshdMIej2dU1QZTTcHClfGD8qgSn4o",
  authDomain: "socical-network.firebaseapp.com",
  projectId: "socical-network",
  storageBucket: "socical-network.appspot.com",
  messagingSenderId: "280075163603",
  appId: "1:280075163603:web:597297f2eb52e16dd5c126",
  measurementId: "G-J9KY7537KN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
