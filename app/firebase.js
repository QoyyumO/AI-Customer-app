// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDQyoZAJSJK0sr4hGIqLS5foe5DFGG71mc",
  authDomain: "ai-customer-app.firebaseapp.com",
  projectId: "ai-customer-app",
  storageBucket: "ai-customer-app.appspot.com",
  messagingSenderId: "163625103500",
  appId: "1:163625103500:web:f09f355f1f1fee77680ba9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
