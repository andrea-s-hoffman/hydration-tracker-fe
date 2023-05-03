import { useState } from "react";
import "./SignInSignUp.css";
import SignInSignUpForm from "./SignInSignUpForm";
import { signInWithGoogle } from "../../firebaseConfig";

const SignInSignUp = () => {
  const [showForm, setShowForm] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const signInHandler = () => {
    setShowForm(true);
    setSignIn(true);
  };
  const signUpHandler = () => {
    setShowForm(true);
    setSignIn(false);
  };
  return (
    <div className="SignInSignUp">
      {showForm ? (
        <SignInSignUpForm signIn={signIn} />
      ) : (
        <div className="buttons">
          <button className="sign-in" onClick={signInHandler}>
            sign in
          </button>
          <button className="sign-up" onClick={signUpHandler}>
            sign up
          </button>
          <p>OR:</p>
          <button className="google" onClick={signInWithGoogle}>
            sign in with google
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInSignUp;
