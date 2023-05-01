// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmroD-eLkT_xeNP5s7mt4UmSVZyGDZaFs",
  authDomain: "task-manager-682ce.firebaseapp.com",
  projectId: "task-manager-682ce",
  storageBucket: "task-manager-682ce.appspot.com",
  messagingSenderId: "10748754280",
  appId: "1:10748754280:web:530f7a46ce45a214747edd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
