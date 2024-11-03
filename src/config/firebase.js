import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKsriw0BvNB5uLU8M9W9bRXfvsLi4uCqs",
  authDomain: "firstproject-f81bf.firebaseapp.com",
  projectId: "firstproject-f81bf",
  storageBucket: "firstproject-f81bf.firebasestorage.app",
  messagingSenderId: "376913636896",
  appId: "1:376913636896:web:bf31e8aca97cd479eb9645",
  measurementId: "G-CKN1M9D6G1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, firestore, storage };
