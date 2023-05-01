import { FormEvent, useContext, useState } from "react";
import { signInWithGoogle } from "../../firebaseConfig";
import "./SignInSignUpForm.css";
import { addAccount, signInWithCreds } from "../../services/accountInfoApi";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthContext";
import LogInCreds from "../../models/LogInCreds";

interface Props {
  signIn: boolean;
}

const SignInSignUpForm = ({ signIn }: Props) => {
  const { setAccount } = useContext(AuthContext);
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    if (!signIn) {
      addAccount({
        uid: uuidv4(),
        email: emailUsername,
        password,
        initialSetUp: false,
        avatar: "",
        lastCheckIn: null,
        userName: "",
        accountCreated: new Date(),
        streakCount: 0,
        dailyGoalOz: 0,
        dailyReports: [],
      }).then((res) => setAccount(res));
    } else {
      const creds: LogInCreds = { password };
      if (emailUsername.includes("@")) {
        creds.email = emailUsername;
      } else {
        creds.userName = emailUsername;
      }
      signInWithCreds(creds).then((res) => {
        if (res?.uid) {
          setAccount(res);
        } else {
          console.log("nope");
          alert("not the right credentials");
        }
      });
    }
    setEmailUsername("");
    setPassword("");
  };
  return (
    <section className="SignInSignUpForm" onSubmit={submitHandler}>
      {/* <form>
        <label htmlFor="email">email{signIn ? " or username" : ""}:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={emailUsername}
          onChange={(e) => setEmailUsername(e.target.value)}
        />
        <label htmlFor="password">
          {signIn ? "enter your" : "create a"} password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>sign {signIn ? "in" : "up"}</button>
      </form> */}
      <button onClick={signInWithGoogle}>
        sign {signIn ? "in" : "up"} with Google
      </button>
    </section>
  );
};

export default SignInSignUpForm;
