import { useContext, useState } from "react";
import "./SignInSignUp.css";
import SignInSignUpForm from "./SignInSignUpForm";
import { signInWithGoogle } from "../../firebaseConfig";
import gif from "../../assets/fa08fe27fe040b3603ecd3ab0ac7f092.gif";
import AuthContext from "../../context/AuthContext";

const SignInSignUp = () => {
  const { pullTrigger } = useContext(AuthContext);
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
      <img src={gif} alt="water" className="bg-gif" />
      {showForm ? (
        <SignInSignUpForm signIn={signIn} goBack={() => setShowForm(false)} />
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
