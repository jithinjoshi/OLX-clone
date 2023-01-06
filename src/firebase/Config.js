import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwk9hadVeowQcy6HaUSBBqDncKEX2i1iI",
  authDomain: "olx-clone-96162.firebaseapp.com",
  projectId: "olx-clone-96162",
  storageBucket: "olx-clone-96162.appspot.com",
  messagingSenderId: "105374920957",
  appId: "1:105374920957:web:d9d7b5aec25dcf060e0e94",
  measurementId: "G-8TVNKSYPW3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
//export const firebaseConfig;
//export default db;

