// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ArwESNU4CtmVd_pnhivfNGv0MuES6Do",
  authDomain: "hydrate-r-dye.firebaseapp.com",
  projectId: "hydrate-r-dye",
  storageBucket: "hydrate-r-dye.appspot.com",
  messagingSenderId: "735070549546",
  appId: "1:735070549546:web:893bf42f433184bf073553",
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
