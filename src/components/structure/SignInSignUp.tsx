import { useState } from "react";
import "./SignInSignUp.css";
import SignInSignUpForm from "./SignInSignUpForm";
import { signInWithGoogle } from "../../firebaseConfig";

interface Props {}

const SignInSignUp = () => {
  const [showForm, setShowForm] = useState(false);
  const [signIn, setSignIn] = useState(false);
  // const signInHandler = () => {
  //   setShowForm(true);
  //   setSignIn(true);
  // };
  // const signUpHandler = () => {
  //   setShowForm(true);
  //   setSignIn(false);
  // };
  return (
    <div className="SignInSignUp">
      {showForm ? (
        <SignInSignUpForm signIn={signIn} />
      ) : (
        <div>
          <button onClick={signInWithGoogle}>sign in with google</button>
          {/* <button onClick={signInHandler}>sign in</button> */}
          {/* <button onClick={signUpHandler}>sign up</button> */}
        </div>
      )}
    </div>
  );
};

export default SignInSignUp;
